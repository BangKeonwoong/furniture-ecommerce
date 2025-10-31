import Link from "next/link";
import { CheckoutSummary } from "@/components/checkout-summary";

export default function CheckoutAddressPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <form className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6">
        <div>
          <p className="text-sm font-semibold text-slate-900">수령인 정보</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="text-sm text-slate-600">
              이름
              <input className="mt-1 w-full rounded-full border border-slate-200 px-4 py-2 text-sm" placeholder="홍길동" />
            </label>
            <label className="text-sm text-slate-600">
              연락처
              <input className="mt-1 w-full rounded-full border border-slate-200 px-4 py-2 text-sm" placeholder="010-0000-0000" />
            </label>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">배송지</p>
          <label className="mt-2 block text-sm text-slate-600">
            우편번호
            <input className="mt-1 w-full rounded-full border border-slate-200 px-4 py-2 text-sm" placeholder="00000" />
          </label>
          <label className="mt-4 block text-sm text-slate-600">
            주소
            <input className="mt-1 w-full rounded-full border border-slate-200 px-4 py-2 text-sm" placeholder="도로명 주소" />
          </label>
          <label className="mt-4 block text-sm text-slate-600">
            상세 주소
            <input className="mt-1 w-full rounded-full border border-slate-200 px-4 py-2 text-sm" placeholder="상세 주소" />
          </label>
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
            <input type="checkbox" />
            <span>문 통과 여부 상담 요청</span>
          </div>
        </div>
        <Link
          href="/checkout/shipping"
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          다음 단계: 배송 옵션
        </Link>
      </form>
      <CheckoutSummary />
    </div>
  );
}
