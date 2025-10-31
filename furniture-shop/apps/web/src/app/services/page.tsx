"use client";

import Link from "next/link";

export default function ServicesPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-16">
      <h1 className="text-3xl font-semibold text-slate-900">서비스 안내</h1>
      <p className="text-sm text-slate-600">
        화이트글러브 배송, AR 스타일링, 현장 설치까지 이어지는 통합 서비스를 준비 중입니다. 자세한 가격과 예약 안내는
        곧 공개될 예정이며, 아래 링크를 통해 먼저 확인하실 수 있습니다.
      </p>
      <div className="space-y-3 rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
        <div>
          <h2 className="text-base font-semibold text-slate-900">화이트글러브 배송</h2>
          <p className="mt-2 text-sm text-slate-500">
            전문 팀이 직접 설치까지 도와드리는 프리미엄 배송 서비스입니다. 현재는 주요 수도권 지역을 대상으로 테스트
            중이며 차후 전국으로 확대됩니다.
          </p>
          <Link href="/services/white-glove" className="mt-2 inline-flex text-sm font-medium text-slate-900">
            자세히 보기 →
          </Link>
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900">공간 컨설팅</h2>
          <p className="mt-2 text-sm text-slate-500">
            AR/3D 모델을 활용한 가구 배치 제안과 소재 추천 서비스를 준비하고 있습니다. 베타 테스트 신청은
            newsletter@loomlattice.com 으로 문의해 주세요.
          </p>
        </div>
      </div>
      <p className="text-xs text-slate-400">
        서비스에 대한 질문이 있으신가요?{" "}
        <a href="mailto:hello@loomlattice.com" className="underline">
          hello@loomlattice.com
        </a>{" "}
        으로 연락 주세요.
      </p>
    </div>
  );
}
