"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckoutSummary } from "@/components/checkout-summary";
import { useCheckoutStore } from "@/lib/store/checkout-store";

type ShippingOption = {
  id: string;
  label: string;
  etaDays: number;
  description: string;
  price: number;
};

const FALLBACK_OPTIONS: ShippingOption[] = [
  {
    id: "white-glove",
    label: "화이트글러브",
    etaDays: 14,
    description: "룸 인 / 설치 포함",
    price: 0
  }
];

export default function CheckoutShippingPage() {
  const { address, shippingOption, setShippingOption } = useCheckoutStore();
  const [postalCode, setPostalCode] = useState("");
  const [options, setOptions] = useState<ShippingOption[]>(FALLBACK_OPTIONS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchQuotes(code?: string) {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/shipping/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postalCode: code?.trim() || "00000",
          shippingClass: "WHITE_GLOVE"
        })
      });

      if (!response.ok) {
        throw new Error("quote_error");
      }

      const data = await response.json();
      const quotes = (data.quotes as ShippingOption[]) ?? FALLBACK_OPTIONS;
      setOptions(quotes);
      if (!quotes.some((option) => option.id === shippingOption)) {
        setShippingOption(quotes[0]?.id ?? "");
      }
    } catch (err) {
      console.error("Failed to fetch shipping quotes", err);
      setError("배송 견적을 가져오지 못했습니다. 잠시 후 다시 시도해 주세요.");
      setOptions(FALLBACK_OPTIONS);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // pre-fill postal code from address store
    setPostalCode(address.postalCode);
    fetchQuotes(address.postalCode);
  }, [address.postalCode]);

  return (
    <div className="grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-4 sm:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">배송 옵션</p>
            <p className="text-xs text-slate-500">배송지 우편번호에 따라 사용 가능한 옵션이 달라집니다.</p>
          </div>
          <form
            className="flex items-center gap-2 text-sm"
            onSubmit={(event) => {
              event.preventDefault();
              fetchQuotes(postalCode);
            }}
          >
            <input
              value={postalCode}
              onChange={(event) => setPostalCode(event.target.value)}
              className="w-28 rounded-full border border-slate-200 px-3 py-2 text-sm"
              placeholder="우편번호"
            />
            <button
              type="submit"
              className="rounded-full border border-slate-200 px-4 py-2 text-xs text-slate-600 hover:border-slate-300"
            >
              견적 새로고침
            </button>
          </form>
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}

        <div className="space-y-4">
          {loading
            ? Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="animate-pulse rounded-3xl border border-slate-200 bg-slate-100 p-4">
                  <div className="h-5 w-32 rounded-full bg-slate-200" />
                  <div className="mt-2 h-4 w-52 rounded-full bg-slate-200" />
                </div>
              ))
            : options.map((option) => (
                <label
                  key={option.id}
                  className="flex cursor-pointer flex-col gap-2 rounded-3xl border border-slate-200 px-4 py-3 hover:border-slate-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        name="shipping"
                        type="radio"
                        checked={shippingOption === option.id}
                        onChange={() => setShippingOption(option.id)}
                      />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{option.label}</p>
                        <p className="text-xs text-slate-500">{option.description}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-slate-900">
                      {option.price === 0 ? "무료" : `${option.price.toLocaleString()}원`}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">예상 배송: {option.etaDays}일 내</p>
                </label>
              ))}
        </div>

        <Link
          href="/checkout/payment"
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          다음 단계: 결제 정보
        </Link>
      </div>
      <CheckoutSummary sticky />
    </div>
  );
}
