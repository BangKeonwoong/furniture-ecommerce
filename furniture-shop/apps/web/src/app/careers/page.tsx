"use client";

export default function CareersPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-16">
      <h1 className="text-3xl font-semibold text-slate-900">채용 안내</h1>
      <p className="text-sm text-slate-600">
        Loom &amp; Lattice는 제품, 디자인, 엔지니어링, 고객 경험 등 다양한 분야에서 팀원을 모집할 예정입니다. 아래
        포지션은 상시 채용 중이며, 관심있는 분들은 이력서와 포트폴리오를 보내 주세요.
      </p>
      <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
        <div>
          <h2 className="text-base font-semibold text-slate-900">모집 중인 포지션</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-500">
            <li>Product Designer (UX/UI)</li>
            <li>3D Visualization Specialist</li>
            <li>Logistics Operations Manager</li>
          </ul>
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900">지원 방법</h2>
          <p className="mt-2 text-sm text-slate-500">
            recruit@loomlattice.com 으로 이력서/포트폴리오/희망 연봉을 보내 주세요. 서류 검토 후 5영업일 이내 연락을
            드립니다.
          </p>
        </div>
      </section>
      <p className="text-xs text-slate-400">채용 관련 문의: recruit@loomlattice.com</p>
    </div>
  );
}
