import { NextResponse } from "next/server";

import { createPgPayment } from "@/lib/payments/pg-client";

type CheckoutCreatePaymentBody = {
  amount?: number;
  currency?: string;
  orderId?: string;
  buyer?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  returnUrl?: string;
  cancelUrl?: string;
};

export async function POST(request: Request) {
  let payload: CheckoutCreatePaymentBody;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  const { amount, currency, orderId, buyer, returnUrl, cancelUrl } = payload;

  if (!amount || amount <= 0) {
    return NextResponse.json({ error: "결제 금액이 필요합니다." }, { status: 400 });
  }

  if (!currency) {
    return NextResponse.json({ error: "통화 코드가 필요합니다." }, { status: 400 });
  }

  if (!orderId) {
    return NextResponse.json({ error: "주문 ID가 필요합니다." }, { status: 400 });
  }

  try {
    const result = await createPgPayment({
      amount,
      currency,
      orderId,
      buyer,
      returnUrl,
      cancelUrl
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("[Checkout] create-payment 실패", error);
    return NextResponse.json({ error: "결제 준비 중 오류가 발생했습니다." }, { status: 500 });
  }
}
