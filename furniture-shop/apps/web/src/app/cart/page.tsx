"use client";

import Link from "next/link";
import { CartLineItem } from "@/components/cart-line-item";
import { CartItem, useCartStore } from "@/lib/store/cart-store";

function formatCurrency(value: number, currency: string) {
  return new Intl.NumberFormat("ko-KR", { style: "currency", currency }).format(value / 100);
}

export default function CartPage() {
  const { items, clear } = useCartStore();

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const currency = items[0]?.currency ?? "KRW";

  return (
    <div className="bg-white">
      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">장바구니</h1>
            <p className="text-sm text-slate-600">배송 옵션, 화이트글러브 서비스, ETA는 다음 단계에서 선택할 수 있습니다.</p>
          </div>
          {items.length > 0 && (
            <button type="button" onClick={clear} className="text-xs text-slate-500 underline">
              장바구니 비우기
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 py-20 text-center text-sm text-slate-500">
            장바구니가 비어 있습니다. <Link href="/category/seating" className="underline">카테고리</Link>에서 가구를 찾아보세요.
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-4">
              {items.map((item: CartItem) => (
                <CartLineItem key={item.id} id={item.id} />
              ))}
            </div>
            <aside className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>상품 금액</span>
                <span>{formatCurrency(subtotal, currency)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>예상 배송비</span>
                <span>결제 단계 계산</span>
              </div>
              <div className="flex items-center justify-between text-base font-semibold text-slate-900">
                <span>합계</span>
                <span>{formatCurrency(subtotal, currency)}</span>
              </div>
              <Link
                href="/checkout"
                className="block rounded-full bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-slate-800"
              >
                결제 진행하기
              </Link>
              <p className="text-xs text-slate-500">
                배송 ETA는 각 상품별 리드타임과 배송 지역을 기준으로 계산되며, 결제 완료 후 문자로 안내됩니다.
              </p>
            </aside>
          </div>
        )}
      </section>
    </div>
  );
}
