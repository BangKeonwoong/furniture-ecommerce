"use client";

import Link from "next/link";

export default function ReturnsPolicyPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-16">
      <nav className="text-xs text-slate-400">
        <Link href="/">홈</Link> / 반품 및 교환
      </nav>
      <h1 className="text-3xl font-semibold text-slate-900">반품 및 교환 안내</h1>
      <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
        <div>
          <h2 className="text-base font-semibold text-slate-900">신청 기한</h2>
          <p className="mt-2 text-sm text-slate-500">제품 수령 후 7일 이내 고객센터를 통해 접수해 주세요.</p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900">가능 조건</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-500">
            <li>포장 및 구성품 훼손이 없는 미사용 제품</li>
            <li>배송 중 파손/오염 등 제품 이상이 확인된 경우</li>
            <li>화이트글러브 설치 제품은 설치 완료 전까지 가능</li>
          </ul>
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900">진행 절차</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-500">
            <li>고객센터(1644-0000) 또는 메일로 접수</li>
            <li>사진 및 이상 내역 확인 후 회수 일정 안내</li>
            <li>제품 회수 → 검수 → 환불(영업일 기준 3~5일)</li>
          </ol>
        </div>
      </section>
      <p className="text-xs text-slate-400">
        자세한 정책은{" "}
        <a href="mailto:returns@loomlattice.com" className="underline">
          returns@loomlattice.com
        </a>{" "}
        으로 문의해 주세요.
      </p>
    </div>
  );
}
