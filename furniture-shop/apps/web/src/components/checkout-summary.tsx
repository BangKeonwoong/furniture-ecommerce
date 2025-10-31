"use client";

import Link from "next/link";
import type { Route } from "next";
import { CartItem, useCartStore } from "@/lib/store/cart-store";

function formatCurrency(value: number, currency: string) {
  return new Intl.NumberFormat("ko-KR", { style: "currency", currency }).format(value / 100);
}

type CheckoutSummaryProps = {
  ctaLabel?: string;
  ctaHref?: Route;
  sticky?: boolean;
};

export function CheckoutSummary({ ctaLabel, ctaHref, sticky = false }: CheckoutSummaryProps) {
  const items = useCartStore((state) => state.items);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const currency = items[0]?.currency ?? "KRW";

  return (
    <aside
      className={`space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600 ${
        sticky ? "fixed inset-x-4 bottom-6 z-40 shadow-lg sm:static sm:inset-auto sm:shadow-none" : ""
      }`}
    >
      <p className="text-sm font-semibold text-slate-900">주문 요약</p>
      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 p-4 text-xs text-slate-500">
          장바구니에 담긴 상품이 없습니다.{" "}
          <Link
            href={{ pathname: "/category/[slug]", params: { slug: "seating" } }}
            className="underline"
          >
            카테고리
          </Link>
          에서 둘러보세요.
        </div>
      ) : (
        <ul className="space-y-3 text-xs text-slate-500">
          {items.map((item: CartItem) => (
            <li key={item.id} className="flex items-center justify-between">
              <span>
                {item.title}
                <span className="ml-1 text-slate-400">× {item.quantity}</span>
              </span>
              <span className="text-slate-700">{formatCurrency(item.price * item.quantity, item.currency)}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="flex items-center justify-between text-sm text-slate-600">
        <span>상품 금액</span>
        <span>{formatCurrency(subtotal, currency)}</span>
      </div>
      <div className="flex items-center justify-between text-sm text-slate-600">
        <span>배송비</span>
        <span>결제 단계 계산</span>
      </div>
      <div className="flex items-center justify-between text-base font-semibold text-slate-900">
        <span>합계</span>
        <span>{formatCurrency(subtotal, currency)}</span>
      </div>
      {ctaLabel && ctaHref ? (
        <Link
          href={ctaHref}
          className="block rounded-full bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-slate-800"
        >
          {ctaLabel}
        </Link>
      ) : null}
    </aside>
  );
}
