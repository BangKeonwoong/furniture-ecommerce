export default function ProductLoading() {
  return (
    <div className="bg-white">
      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4">
            <div className="aspect-[4/3] w-full animate-pulse rounded-3xl bg-slate-200" />
            <div className="flex gap-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-20 w-20 animate-pulse rounded-2xl bg-slate-200" />
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="h-4 w-24 animate-pulse rounded-full bg-slate-200" />
            <div className="h-10 w-3/4 animate-pulse rounded-full bg-slate-200" />
            <div className="h-4 w-1/2 animate-pulse rounded-full bg-slate-200" />
            <div className="h-6 w-32 animate-pulse rounded-full bg-slate-200" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-4 animate-pulse rounded-full bg-slate-200" />
              ))}
            </div>
            <div className="h-28 animate-pulse rounded-3xl bg-slate-100" />
            <div className="h-28 animate-pulse rounded-3xl bg-slate-100" />
            <div className="h-12 animate-pulse rounded-full bg-slate-200" />
          </div>
        </div>
      </section>
    </div>
  );
}
