"use client";

import Link from "next/link";

export default function WhiteGlovePage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-16">
      <nav className="text-xs text-slate-400">
        <Link href="/services" className="underline">
          서비스 안내
        </Link>{" "}
        / 화이트글러브 배송
      </nav>
      <h1 className="text-3xl font-semibold text-slate-900">화이트글러브 배송</h1>
      <p className="text-sm text-slate-600">
        전문 설치 기사님이 제품 배송, 조립, 포장재 수거까지 진행하는 프리미엄 배송 옵션입니다. 현재는 리빙룸/침실
        가구에 한해 수도권에서 베타 운영 중이며, 추후 전국으로 확대될 예정입니다.
      </p>
      <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
        <div>
          <h2 className="text-base font-semibold text-slate-900">배송 범위</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-500">
            <li>서울/경기/인천 일부 지역 (2025 Q1 전국 확대 예정)</li>
            <li>35kg 이상의 대형 제품 또는 설치가 필요한 제품 권장</li>
          </ul>
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900">포함 서비스</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-500">
            <li>배송 스케줄 사전 협의</li>
            <li>실내 이동 및 조립, 설치 위치 확인</li>
            <li>포장재 수거 및 간단한 사용 방법 안내</li>
          </ul>
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900">이용 요금</h2>
          <p className="mt-2 text-sm text-slate-500">
            제품별 무게와 설치 난이도에 따라 30,000원 ~ 80,000원 (VAT 포함) 사이에서 책정됩니다. 정확한 비용은 주문
            완료 전 체크아웃에서 확인하실 수 있습니다.
          </p>
        </div>
      </section>
      <p className="text-xs text-slate-400">
        화이트글러브 관련 문의는{" "}
        <a href="mailto:whiteglove@loomlattice.com" className="underline">
          whiteglove@loomlattice.com
        </a>{" "}
        으로 보내 주세요.
      </p>
    </div>
  );
}
