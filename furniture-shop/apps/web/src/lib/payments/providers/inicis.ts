import type { CreatePgPaymentInput } from "../types";

export type InicisCredentials = {
  signKey: string;
  clientKey: string;
  merchantId: string;
};

export function hasInicisCredentials(creds: {
  apiKey?: string;
  apiSecret?: string;
  merchantId?: string;
}): creds is InicisCredentials {
  return Boolean(creds.apiKey && creds.apiSecret && creds.merchantId);
}

export async function createInicisPayment(
  _credentials: InicisCredentials,
  _input: CreatePgPaymentInput
): Promise<never> {
  throw new Error("KG이니시스 연동은 아직 구현되지 않았습니다. docs/pg-provider-expansion.md를 참고하세요.");
}

export async function approveInicisPayment(): Promise<never> {
  throw new Error("KG이니시스 승인 로직은 아직 구현되지 않았습니다.");
}

export async function cancelInicisPayment(): Promise<never> {
  throw new Error("KG이니시스 취소 로직은 아직 구현되지 않았습니다.");
}
