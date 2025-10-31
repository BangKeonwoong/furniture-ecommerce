"use client";

export default function CategoryError({ reset }: { reset: () => void }) {
  return (
    <div className="bg-white">
      <section className="mx-auto w-full max-w-4xl px-6 py-20 text-center">
        <h1 className="text-2xl font-semibold text-slate-900">카테고리를 불러오지 못했습니다.</h1>
        <p className="mt-2 text-sm text-slate-600">잠시 후 다시 시도하거나 다른 페이지로 이동해 주세요.</p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
        >
          다시 시도
        </button>
      </section>
    </div>
  );
}
