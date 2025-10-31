"use client";

export default function TradeProgramPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-16">
      <h1 className="text-3xl font-semibold text-slate-900">트레이드 프로그램</h1>
      <p className="text-sm text-slate-600">
        인테리어 디자이너, 건축가, 리테일 파트너를 위한 전용 혜택을 준비 중입니다. 조기 등록을 원하시면 아래 양식을
        참고해 주시고, 프로그램 오픈 시 우선 안내해 드리겠습니다.
      </p>
      <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
        <div>
          <h2 className="text-base font-semibold text-slate-900">예정 혜택</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-500">
            <li>프로젝트 규모에 따른 전용 할인율</li>
            <li>재고/리드타임 우선 확보 및 맞춤 배송 일정</li>
            <li>AR/3D 모델, 소재 샘플 키트 제공</li>
          </ul>
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900">조기 등록</h2>
          <p className="mt-2 text-sm text-slate-500">
            사업자 등록증, 포트폴리오 또는 회사 소개 자료를{" "}
            <a href="mailto:trade@loomlattice.com" className="underline">
              trade@loomlattice.com
            </a>{" "}
            으로 보내주세요. 담당자가 2영업일 이내 연락드릴 예정입니다.
          </p>
        </div>
      </section>
      <p className="text-xs text-slate-400">
        정식 런칭 일정은 뉴스레터를 통해 공지됩니다. 페이지 상단의 뉴스레터 구독을 통해 가장 먼저 만나보세요.
      </p>
    </div>
  );
}
