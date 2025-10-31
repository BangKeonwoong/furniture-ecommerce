import type { Metadata } from "next";
import Link from "next/link";
import { ReactNode } from "react";
import { CheckoutStepper } from "@/components/checkout-stepper";

export const metadata: Metadata = {
  title: "Checkout"
};

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white">
      <section className="mx-auto w-full max-w-5xl px-6 py-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">체크아웃</h1>
            <p className="mt-2 text-sm text-slate-600">배송 주소와 결제 정보를 입력하면 주문이 완료됩니다.</p>
          </div>
          <Link href="/cart" className="text-xs text-slate-500 underline">
            장바구니로 돌아가기
          </Link>
        </div>
        <div className="mt-6 flex justify-center">
          <CheckoutStepper />
        </div>
        <div className="mt-10">{children}</div>
      </section>
    </div>
  );
}
