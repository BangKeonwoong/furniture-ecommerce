export const metadata = {
  title: "Styling Stories",
  description: "공간별 스타일 가이드를 준비하고 있습니다.",
};

export default function StoriesPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-2xl font-semibold text-slate-900">공간별 스타일 가이드</h1>
      <p className="mt-4 text-sm text-slate-600">
        실사용 공간을 기반으로 한 스타일 큐레이션을 곧 공개할 예정입니다. 완성되는 즉시 다양한 공간 구성 팁과 추천 가구를 만나보실 수 있어요.
      </p>
    </div>
  );
}
