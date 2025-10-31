export type BuyerInfo = {
  name?: string;
  email?: string;
  phone?: string;
};

export type CreatePgPaymentInput = {
  amount: number;
  currency: string;
  orderId: string;
  buyer?: BuyerInfo;
  returnUrl?: string;
  cancelUrl?: string;
};

export type PgPaymentBase = {
  provider: string;
  amount: number;
  currency: string;
  orderId: string;
};

export type PgPaymentResult =
  | (PgPaymentBase & {
      status: "ready";
      paymentRequestId: string;
      redirectUrl?: string;
      payload?: Record<string, unknown>;
    })
  | (PgPaymentBase & {
      status: "mock";
      paymentRequestId: string;
      redirectUrl?: string;
      payload?: Record<string, unknown>;
      debug: { reason: string };
    });

export type PgApprovalResult = {
  provider: string;
  orderId: string;
  paymentRequestId: string;
  status: "approved" | "cancelled";
  amount?: number;
  currency?: string;
  approvedAt?: string;
  cancelledAt?: string;
  reason?: string;
  debug?: { reason: string };
};
