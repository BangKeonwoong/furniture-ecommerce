"use client";

import Link from "next/link";

export default function ShippingPolicyPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-16">
      <nav className="text-xs text-slate-400">
        <Link href="/">홈</Link> / 배송 안내
      </nav>
      <h1 className="text-3xl font-semibold text-slate-900">배송 안내</h1>
      <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
        <div>
          <h2 className="text-base font-semibold text-slate-900">일반 배송</h2>
          <p className="mt-2 text-sm text-slate-500">
            결제 완료 후 2~5영업일 내 택배로 출고됩니다. 제주 및 도서/산간 지역은 추가 배송비가 발생할 수 있습니다.
          </p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900">화이트글러브 배송</h2>
          <p className="mt-2 text-sm text-slate-500">
            대형 가구의 경우 화이트글러브 배송을 통해 설치까지 지원합니다. 자세한 내용은{" "}
            <Link href="/services/white-glove" className="underline">
              화이트글러브 안내
            </Link>
            를 참고해 주세요.
          </p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900">배송 지연 안내</h2>
          <p className="mt-2 text-sm text-slate-500">
            기상 상황, 물류 파업, 재고 이슈 등으로 배송이 지연될 경우 문자/이메일로 별도 안내를 드립니다.
          </p>
        </div>
      </section>
      <p className="text-xs text-slate-400">
        추가 문의는{" "}
        <a href="mailto:support@loomlattice.com" className="underline">
          support@loomlattice.com
        </a>{" "}
        으로 연락 주세요.
      </p>
    </div>
  );
}
