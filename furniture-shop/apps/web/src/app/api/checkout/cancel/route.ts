import { NextResponse } from "next/server";

import { cancelPgPayment } from "@/lib/payments/pg-client";

type CancelBody = {
  orderId?: string;
  paymentRequestId?: string;
  reason?: string;
  pgTransactionId?: string;
  amount?: number;
  currency?: string;
};

export async function POST(request: Request) {
  let payload: CancelBody;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  const { orderId, paymentRequestId, reason, pgTransactionId, amount, currency } = payload;

  if (!orderId || !paymentRequestId) {
    return NextResponse.json({ error: "orderId와 paymentRequestId가 필요합니다." }, { status: 400 });
  }

  try {
    const result = await cancelPgPayment({ orderId, paymentRequestId, reason, pgTransactionId, amount, currency });
    return NextResponse.json(result);
  } catch (error) {
    console.error("[Checkout] cancel 실패", error);
    return NextResponse.json({ error: "결제 취소 처리 중 문제가 발생했습니다." }, { status: 500 });
  }
}
