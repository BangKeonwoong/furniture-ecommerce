"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent } from "react";
import { CheckoutSummary } from "@/components/checkout-summary";
import { useCheckoutStore } from "@/lib/store/checkout-store";

function useCheckoutAddress() {
  const { address, setAddress } = useCheckoutStore();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAddress({ ...address, [name]: value });
  };
  return { address, handleChange };
}

export default function CheckoutAddressPage() {
  const router = useRouter();
  const { address, handleChange } = useCheckoutAddress();

  return (
    <div className="grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <form
        className="space-y-6 rounded-3xl border border-slate-200 bg-white p-4 sm:p-6"
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          router.push("/checkout/shipping");
        }}
      >
        <div>
          <p className="text-sm font-semibold text-slate-900">수령인 정보</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="text-sm text-slate-600">
              이름
              <input
                name="name"
                value={address.name}
                onChange={handleChange}
                className="mt-1 w-full rounded-full border border-slate-200 px-4 py-2 text-sm"
                placeholder="홍길동"
                required
              />
            </label>
            <label className="text-sm text-slate-600">
              연락처
              <input
                name="phone"
                value={address.phone}
                onChange={handleChange}
                className="mt-1 w-full rounded-full border border-slate-200 px-4 py-2 text-sm"
                placeholder="010-0000-0000"
                required
              />
            </label>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">배송지</p>
          <label className="mt-2 block text-sm text-slate-600">
            우편번호
            <input
              name="postalCode"
              value={address.postalCode}
              onChange={handleChange}
              className="mt-1 w-full rounded-full border border-slate-200 px-4 py-2 text-sm"
              placeholder="00000"
              required
            />
          </label>
          <label className="mt-4 block text-sm text-slate-600">
            주소
            <input
              name="address1"
              value={address.address1}
              onChange={handleChange}
              className="mt-1 w-full rounded-full border border-slate-200 px-4 py-2 text-sm"
              placeholder="도로명 주소"
              required
            />
          </label>
          <label className="mt-4 block text-sm text-slate-600">
            상세 주소
            <input
              name="address2"
              value={address.address2}
              onChange={handleChange}
              className="mt-1 w-full rounded-full border border-slate-200 px-4 py-2 text-sm"
              placeholder="상세 주소"
            />
          </label>
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
            <input type="checkbox" />
            <span>문 통과 여부 상담 요청</span>
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          다음 단계: 배송 옵션
        </button>
      </form>
      <CheckoutSummary sticky />
    </div>
  );
}
