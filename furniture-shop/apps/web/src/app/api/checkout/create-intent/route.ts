import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16"
    })
  : null;

export async function POST(request: Request) {
  try {
    const { amount, currency, customerEmail } = await request.json();

    if (!amount || !currency) {
      return NextResponse.json({ error: "Missing amount or currency" }, { status: 400 });
    }

    if (!stripe) {
      console.log("[Checkout] Mock payment intent", { amount, currency, customerEmail });
      return NextResponse.json({ clientSecret: "mock_client_secret" });
    }

    const intent = await stripe.paymentIntents.create({
      amount,
      currency,
      receipt_email: customerEmail,
      automatic_payment_methods: { enabled: true }
    });

    console.log("[Checkout] Stripe payment intent created", { id: intent.id, amount, currency });
    return NextResponse.json({ clientSecret: intent.client_secret });
  } catch (error) {
    console.error("Create intent failed", error);
    return NextResponse.json({ error: "Unable to create payment intent" }, { status: 500 });
  }
}
