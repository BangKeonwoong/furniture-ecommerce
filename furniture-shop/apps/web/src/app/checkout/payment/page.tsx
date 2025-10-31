"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckoutSummary } from "@/components/checkout-summary";
import { useCartStore } from "@/lib/store/cart-store";
import { useCheckoutStore } from "@/lib/store/checkout-store";

export default function CheckoutPaymentPage() {
  const items = useCartStore((state) => state.items);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const currency = items[0]?.currency ?? "KRW";
  const { setClientSecret, clientSecret: storedClientSecret } = useCheckoutStore();

  const [clientSecret, setClientSecretState] = useState<string | null>(storedClientSecret ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function createIntent() {
      if (subtotal <= 0) {
        setClientSecretState(null);
        setClientSecret(null);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/checkout/create-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: subtotal, currency, customerEmail: "guest@example.com" })
        });

        if (!response.ok) {
          throw new Error("intent_error");
        }

        const data = await response.json();
        setClientSecretState(data.clientSecret ?? null);
        setClientSecret(data.clientSecret ?? null);
      } catch (err) {
        console.error("Failed to create payment intent", err);
        setError("결제 세션을 생성하는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      } finally {
        setLoading(false);
      }
    }

    createIntent();
  }, [subtotal, currency]);

  return (
    <div className="grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-4 sm:p-6">
        <div>
          <p className="text-sm font-semibold text-slate-900">결제 수단</p>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="rounded-3xl border border-dashed border-slate-200 p-6 text-center text-xs text-slate-500">
              {loading ? (
                <span className="animate-pulse">Stripe Payment Element 초기화 중...</span>
              ) : clientSecret ? (
                <span>
                  Payment Element 자리표시자 <br /> client secret: <code className="break-all text-slate-400">{clientSecret}</code>
                </span>
              ) : (
                <span>장바구니에 상품을 담으면 결제 세션이 생성됩니다.</span>
              )}
            </div>
            {error && <p className="text-xs text-red-500">{error}</p>}
            <label className="flex items-center gap-2 text-xs text-slate-500">
              <input type="checkbox" defaultChecked /> 카드 정보를 저장합니다.
            </label>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">청구지 주소</p>
          <p className="mt-2 text-xs text-slate-500">배송지와 동일 버튼, 다른 주소 입력 폼이 이곳에 표시됩니다.</p>
        </div>
        <Link
          href="/checkout/success/temp-order"
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          주문 완료하기
        </Link>
        <p className="text-xs text-slate-500">
          실제 결제 완료 시 결제 성공 웹훅을 수신하고, 주문 상태를 업데이트하도록 확장할 예정입니다.
        </p>
      </div>
      <CheckoutSummary />
    </div>
  );
}
