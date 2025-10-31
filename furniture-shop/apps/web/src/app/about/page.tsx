"use client";

export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-16">
      <h1 className="text-3xl font-semibold text-slate-900">Loom &amp; Lattice 소개</h1>
      <p className="text-sm text-slate-600">
        Loom &amp; Lattice는 지속가능한 소재와 투명한 제작 과정을 기반으로 한 가구 브랜드입니다. 2020년부터 국내외
        제조 파트너와 협업하며 일상에 오래 머무는 디자인을 만들고 있습니다.
      </p>
      <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
        <div>
          <h2 className="text-base font-semibold text-slate-900">브랜드 가치</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-500">
            <li>지속가능성: FSC 인증 목재, 친환경 패브릭, 재활용 알루미늄 사용</li>
            <li>투명한 가격: 제작, 물류, 마진 정보를 고객에게 공개</li>
            <li>사용자 경험: AR 미리보기, 화이트글러브 배송, 3년 무상 A/S 제공</li>
          </ul>
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900">연혁</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-500">
            <li>2020 — 브랜드 런칭 및 첫 플래그십 스토어 오픈</li>
            <li>2022 — 3D/AR 가구 배치 서비스 베타 출시</li>
            <li>2024 — 화이트글러브 배송 및 전국 설치 서비스 확대</li>
          </ol>
        </div>
      </section>
      <p className="text-xs text-slate-400">더 궁금한 점이 있다면 hello@loomlattice.com 으로 연락해 주세요.</p>
    </div>
  );
}
