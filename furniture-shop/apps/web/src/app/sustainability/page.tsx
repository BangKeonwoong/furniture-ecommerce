"use client";

export default function SustainabilityPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-16">
      <h1 className="text-3xl font-semibold text-slate-900">지속가능성</h1>
      <p className="text-sm text-slate-600">
        Loom &amp; Lattice는 제품 수명 주기 전체에서 탄소 배출을 최소화하기 위해 소재 선정, 제조 파트너, 배송 정책을
        지속적으로 점검하고 있습니다.
      </p>
      <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
        <div>
          <h2 className="text-base font-semibold text-slate-900">소재 전략</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-500">
            <li>FSC 인증 목재 사용 비중 2024년 기준 85%</li>
            <li>천연 오일, 수성 마감재 적용 확대</li>
            <li>알루미늄 부품 60% 이상 재활용 소재 사용</li>
          </ul>
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900">제조 및 물류</h2>
          <p className="mt-2 text-sm text-slate-500">
            ISO 14001 인증 공장과 협력하며, 포장재를 재활용 가능한 종이/완충제로 전환하고 있습니다. 화이트글러브
            물류는 전기차로 순차 교체 중입니다.
          </p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900">회수 프로그램</h2>
          <p className="mt-2 text-sm text-slate-500">
            사용하던 Loom &amp; Lattice 가구를 회수하여 리퍼브/기부로 연결하는 프로그램을 준비 중입니다. 2025년 하반기
            시범 운영 예정입니다.
          </p>
        </div>
      </section>
    </div>
  );
}
