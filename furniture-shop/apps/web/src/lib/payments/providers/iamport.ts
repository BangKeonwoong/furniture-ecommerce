import type { CreatePgPaymentInput } from "../types";

type PgCredentials = {
  apiKey: string;
  apiSecret: string;
  merchantId: string;
  jsClientKey?: string;
};

type IamportTokenResponse = {
  access_token: string;
  expired_at: number;
};

const IAMPORT_API_BASE = "https://api.iamport.kr";

async function requestIamportToken(creds: PgCredentials): Promise<IamportTokenResponse> {
  const response = await fetch(`${IAMPORT_API_BASE}/users/getToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      imp_key: creds.apiKey,
      imp_secret: creds.apiSecret
    })
  });

  const data = (await response.json()) as {
    code: number;
    message?: string;
    response?: IamportTokenResponse;
  };

  if (data.code !== 0 || !data.response) {
    throw new Error(data.message ?? "아임포트 토큰 발급에 실패했습니다.");
  }

  return data.response;
}

async function iamportAuthorizedFetch<T>(
  token: string,
  path: string,
  options: RequestInit
): Promise<T> {
  const response = await fetch(`${IAMPORT_API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      ...(options.headers ?? {})
    }
  });

  const data = (await response.json()) as { code: number; message?: string; response?: T };

  if (data.code !== 0 || !data.response) {
    throw new Error(data.message ?? "아임포트 API 요청이 실패했습니다.");
  }

  return data.response;
}

export async function iamportCreatePayment(
  creds: PgCredentials,
  input: CreatePgPaymentInput
): Promise<{
  paymentRequestId: string;
  tokenInfo: IamportTokenResponse;
}> {
  const tokenInfo = await requestIamportToken(creds);

  await iamportAuthorizedFetch<{ merchant_uid: string; amount: number }>(
    tokenInfo.access_token,
    "/payments/prepare",
    {
      method: "POST",
      body: JSON.stringify({
        merchant_uid: input.orderId,
        amount: input.amount
      })
    }
  );

  return {
    paymentRequestId: input.orderId,
    tokenInfo
  };
}

export async function iamportGetPaymentStatus(
  creds: PgCredentials,
  pgTransactionId: string
): Promise<{
  status: string;
  imp_uid: string;
  merchant_uid: string;
  amount: number;
  currency?: string;
  pg_tid?: string;
  paid_at?: number;
}> {
  const tokenInfo = await requestIamportToken(creds);

  const payment = await iamportAuthorizedFetch<{
    status: string;
    imp_uid: string;
    merchant_uid: string;
    amount: number;
    currency?: string;
    pg_tid?: string;
    paid_at?: number;
  }>(tokenInfo.access_token, `/payments/${pgTransactionId}`, {
    method: "GET"
  });

  return payment;
}

export async function iamportCancelPayment(
  creds: PgCredentials,
  paymentRequestId: string,
  reason?: string
): Promise<{
  status: string;
  cancelled_at?: number;
  merchant_uid: string;
}> {
  const tokenInfo = await requestIamportToken(creds);

  const result = await iamportAuthorizedFetch<{
    status: string;
    cancelled_at?: number;
    merchant_uid: string;
  }>(tokenInfo.access_token, "/payments/cancel", {
    method: "POST",
    body: JSON.stringify({
      merchant_uid: paymentRequestId,
      reason: reason ?? "user_cancel"
    })
  });

  return result;
}

export type { IamportTokenResponse };
