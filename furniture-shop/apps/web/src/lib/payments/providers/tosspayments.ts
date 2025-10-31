import type { CreatePgPaymentInput } from "../types";

export type TossPaymentsCredentials = {
  secretKey: string;
  clientKey: string;
  merchantId: string;
};

export function hasTossPaymentsCredentials(creds: {
  apiKey?: string;
  apiSecret?: string;
  merchantId?: string;
}): creds is TossPaymentsCredentials {
  return Boolean(creds.apiKey && creds.apiSecret && creds.merchantId);
}

export async function createTossPayment(
  _credentials: TossPaymentsCredentials,
  _input: CreatePgPaymentInput
): Promise<never> {
  throw new Error("토스페이먼츠 연동은 아직 구현되지 않았습니다. docs/pg-provider-expansion.md를 참고하세요.");
}

export async function approveTossPayment(): Promise<never> {
  throw new Error("토스페이먼츠 승인 로직은 아직 구현되지 않았습니다.");
}

export async function cancelTossPayment(): Promise<never> {
  throw new Error("토스페이먼츠 취소 로직은 아직 구현되지 않았습니다.");
}
