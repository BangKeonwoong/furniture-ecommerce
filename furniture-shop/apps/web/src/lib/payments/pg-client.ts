import crypto from "node:crypto";

import { iamportCancelPayment, iamportCreatePayment, iamportGetPaymentStatus } from "./providers/iamport";
import type { CreatePgPaymentInput, PgApprovalResult, PgPaymentResult } from "./types";
export type { PgApprovalResult, PgPaymentResult } from "./types";

type PgCredentials = {
  provider: string;
  env: "sandbox" | "production";
  apiKey?: string;
  apiSecret?: string;
  merchantId?: string;
  jsClientKey?: string;
  webhookSecret?: string;
};

function getPgCredentials(): PgCredentials {
  const provider = (process.env.PG_PROVIDER ?? "iamport").toLowerCase();
  const env = (process.env.PG_ENV ?? "sandbox") as "sandbox" | "production";

  return {
    provider,
    env,
    apiKey: process.env.PG_API_KEY,
    apiSecret: process.env.PG_API_SECRET,
    merchantId: process.env.PG_MERCHANT_ID,
    jsClientKey: process.env.PG_JS_SDK_CLIENT_KEY,
    webhookSecret: process.env.PG_WEBHOOK_SECRET
  };
}

function hasAllCredentials(creds: PgCredentials) {
  return Boolean(creds.apiKey && creds.apiSecret && creds.merchantId);
}

function buildMockResponse(
  creds: PgCredentials,
  input: CreatePgPaymentInput,
  reason: string
): PgPaymentResult {
  const mockId = `mock-${input.orderId}-${crypto.randomUUID()}`;
  const mockRedirectUrl =
    input.returnUrl ?? `https://example.com/mock-checkout?order=${encodeURIComponent(input.orderId)}`;

  console.log("[Checkout] Using mock PG response", {
    provider: creds.provider,
    env: creds.env,
    reason,
    orderId: input.orderId
  });

  return {
    status: "mock",
    provider: creds.provider,
    amount: input.amount,
    currency: input.currency,
    orderId: input.orderId,
    paymentRequestId: mockId,
    redirectUrl: mockRedirectUrl,
    debug: { reason }
  };
}

export async function createPgPayment(input: CreatePgPaymentInput): Promise<PgPaymentResult> {
  const creds = getPgCredentials();

  if (!hasAllCredentials(creds)) {
    return buildMockResponse(
      creds,
      input,
      "PG 자격 증명(PG_API_KEY, PG_API_SECRET, PG_MERCHANT_ID)이 설정되지 않았습니다."
    );
  }

  switch (creds.provider) {
    case "iamport":
      if (!creds.jsClientKey) {
        return buildMockResponse(creds, input, "아임포트 JS SDK 키가 설정되지 않아 모의 응답을 반환합니다.");
      }
      try {
        const { paymentRequestId, tokenInfo } = await iamportCreatePayment(
          {
            apiKey: creds.apiKey!,
            apiSecret: creds.apiSecret!,
            merchantId: creds.merchantId!,
            jsClientKey: creds.jsClientKey
          },
          input
        );

        return {
          status: "ready",
          provider: creds.provider,
          amount: input.amount,
          currency: input.currency,
          orderId: input.orderId,
          paymentRequestId,
          payload: {
            provider: creds.provider,
            merchantUid: paymentRequestId,
            jsClientKey: creds.jsClientKey,
            tokenExpiresAt: tokenInfo.expired_at,
            buyer: input.buyer
          }
        };
      } catch (error) {
        console.error("[Checkout] Iamport createPayment failed", error);
        return buildMockResponse(creds, input, "아임포트 API 호출 중 오류가 발생하여 모의 응답으로 대체합니다.");
      }
    case "tosspayments":
      return buildMockResponse(
        creds,
        input,
        "토스페이먼츠 실 연동 로직이 아직 구현되지 않았습니다. docs/pg-provider-expansion.md 참고"
      );
    case "inicis":
    case "kginicis":
      return buildMockResponse(
        creds,
        input,
        "KG이니시스 실 연동 로직이 아직 구현되지 않았습니다. docs/pg-provider-expansion.md 참고"
      );
    default:
      return buildMockResponse(creds, input, `지원되지 않는 PG_PROVIDER 값: ${creds.provider}`);
  }
}

type ApprovalInput = {
  orderId: string;
  paymentRequestId: string;
  pgTransactionId?: string;
  amount?: number;
  currency?: string;
  reason?: string;
};

function buildMockApproval(
  creds: PgCredentials,
  input: ApprovalInput,
  status: "approved" | "cancelled",
  reason: string
): PgApprovalResult {
  const timestamp = new Date().toISOString();

  console.log("[Checkout] Using mock PG approval", {
    provider: creds.provider,
    env: creds.env,
    status,
    orderId: input.orderId
  });

  return {
    status,
    provider: creds.provider,
    orderId: input.orderId,
    paymentRequestId: input.paymentRequestId,
    amount: input.amount,
    currency: input.currency,
    approvedAt: status === "approved" ? timestamp : undefined,
    cancelledAt: status === "cancelled" ? timestamp : undefined,
    debug: { reason }
  };
}

export async function approvePgPayment(input: ApprovalInput): Promise<PgApprovalResult> {
  const creds = getPgCredentials();

  if (!hasAllCredentials(creds)) {
    return buildMockApproval(
      creds,
      input,
      "approved",
      "PG 자격 증명이 없어 모의 승인으로 대체합니다."
    );
  }

  switch (creds.provider) {
    case "iamport":
      if (!input.pgTransactionId) {
        return buildMockApproval(
          creds,
          input,
          "approved",
          "아임포트 승인에는 imp_uid가 필요하여 모의 승인으로 대체합니다."
        );
      }
      try {
        const payment = await iamportGetPaymentStatus(
          {
            apiKey: creds.apiKey!,
            apiSecret: creds.apiSecret!,
            merchantId: creds.merchantId!
          },
          input.pgTransactionId
        );

        if (payment.merchant_uid !== input.paymentRequestId) {
          throw new Error("merchant_uid가 일치하지 않습니다.");
        }

        if (typeof input.amount === "number" && payment.amount !== input.amount) {
          throw new Error("결제 금액이 요청과 일치하지 않습니다.");
        }

        return {
          status: "approved",
          provider: creds.provider,
          orderId: input.orderId,
          paymentRequestId: input.paymentRequestId,
           amount: payment.amount,
           currency: payment.currency ?? input.currency,
          approvedAt: payment.paid_at ? new Date(payment.paid_at * 1000).toISOString() : undefined,
          debug: payment.pg_tid ? { reason: payment.pg_tid } : undefined
        };
      } catch (error) {
        console.error("[Checkout] Iamport approve failed", error);
        return buildMockApproval(creds, input, "approved", "아임포트 승인 중 오류로 모의 승인으로 대체합니다.");
      }
    case "tosspayments":
      return buildMockApproval(creds, input, "approved", "토스페이먼츠 실 연동 구현 예정.");
    case "inicis":
    case "kginicis":
      return buildMockApproval(creds, input, "approved", "KG이니시스 실 연동 구현 예정.");
    default:
      return buildMockApproval(
        creds,
        input,
        "approved",
        `지원되지 않는 PG_PROVIDER 값: ${creds.provider}`
      );
  }
}

export async function cancelPgPayment(input: ApprovalInput): Promise<PgApprovalResult> {
  const creds = getPgCredentials();

  if (!hasAllCredentials(creds)) {
    return buildMockApproval(
      creds,
      input,
      "cancelled",
      "PG 자격 증명이 없어 모의 취소로 대체합니다."
    );
  }

  switch (creds.provider) {
    case "iamport":
      try {
        const result = await iamportCancelPayment(
          {
            apiKey: creds.apiKey!,
            apiSecret: creds.apiSecret!,
            merchantId: creds.merchantId!
          },
          input.paymentRequestId,
          input.reason
        );

        return {
          status: "cancelled",
          provider: creds.provider,
          orderId: input.orderId,
          paymentRequestId: input.paymentRequestId,
          amount: input.amount,
          currency: input.currency,
          cancelledAt: result.cancelled_at ? new Date(result.cancelled_at * 1000).toISOString() : undefined,
          debug: { reason: "Iamport API cancellation 성공" }
        };
      } catch (error) {
        console.error("[Checkout] Iamport cancel failed", error);
        return buildMockApproval(creds, input, "cancelled", "아임포트 취소 중 오류로 모의 취소로 대체합니다.");
      }
    case "tosspayments":
      return buildMockApproval(creds, input, "cancelled", "토스페이먼츠 취소 연동 구현 예정.");
    case "inicis":
    case "kginicis":
      return buildMockApproval(creds, input, "cancelled", "KG이니시스 취소 연동 구현 예정.");
    default:
      return buildMockApproval(
        creds,
        input,
        "cancelled",
        `지원되지 않는 PG_PROVIDER 값: ${creds.provider}`
      );
  }
}
