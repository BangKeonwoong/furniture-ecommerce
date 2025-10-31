import { NextResponse } from "next/server";

import { approvePgPayment } from "@/lib/payments/pg-client";

type ApproveBody = {
  orderId?: string;
  paymentRequestId?: string;
  pgTransactionId?: string;
  amount?: number;
  currency?: string;
};

export async function POST(request: Request) {
  let payload: ApproveBody;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  const { orderId, paymentRequestId, pgTransactionId, amount, currency } = payload;

  if (!orderId || !paymentRequestId) {
    return NextResponse.json({ error: "orderId와 paymentRequestId가 필요합니다." }, { status: 400 });
  }

  try {
    const result = await approvePgPayment({ orderId, paymentRequestId, pgTransactionId, amount, currency });
    return NextResponse.json(result);
  } catch (error) {
    console.error("[Checkout] approve 실패", error);
    return NextResponse.json({ error: "결제 승인 처리 중 문제가 발생했습니다." }, { status: 500 });
  }
}
