import { NextResponse } from "next/server";

type QuoteRequest = {
  postalCode: string;
  shippingClass: "PARCEL" | "LTL" | "WHITE_GLOVE";
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as QuoteRequest;

    if (!body.postalCode || !body.shippingClass) {
      return NextResponse.json({ error: "Missing postalCode or shippingClass" }, { status: 400 });
    }

    console.log("[Shipping] Quote requested", body);
    const mockQuotes = [
      {
        id: "white-glove",
        label: "화이트글러브",
        etaDays: 14,
        price: 0,
        description: "룸 인 / 설치 포함"
      },
      {
        id: "ltl",
        label: "프리미엄 배송",
        etaDays: 10,
        price: 39000,
        description: "엘리베이터 진입, 포장 제거"
      }
    ];

    return NextResponse.json({ quotes: mockQuotes, requested: body });
  } catch (error) {
    console.error("Shipping quote failed", error);
    return NextResponse.json({ error: "Unable to calculate shipping" }, { status: 500 });
  }
}
