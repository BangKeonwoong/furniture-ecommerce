"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCheckoutStore } from "@/lib/store/checkout-store";

export default function CheckoutSuccessPage({ params }: { params: { orderId: string } }) {
  const reset = useCheckoutStore((state) => state.reset);

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <div className="bg-white">
      <section className="mx-auto w-full max-w-3xl px-6 py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-white">
          ✓
        </div>
        <h1 className="mt-6 text-3xl font-semibold text-slate-900">주문이 완료되었습니다.</h1>
        <p className="mt-3 text-sm text-slate-600">
          주문번호 <span className="font-semibold">{params.orderId}</span> 에 대한 확인 메일을 발송했습니다. 배송 일정은 화이트글러브 팀에서 별도로 안내드립니다.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:border-slate-300">
            계속 쇼핑하기
          </Link>
          <Link href="/account/orders" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
            주문 내역 보기
          </Link>
        </div>
      </section>
    </div>
  );
}
