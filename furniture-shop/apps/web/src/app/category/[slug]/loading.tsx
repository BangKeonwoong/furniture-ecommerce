export default function CategoryLoading() {
  return (
    <div className="bg-white">
      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="h-10 w-48 animate-pulse rounded-full bg-slate-200" />
          <div className="flex items-center gap-3">
            <div className="h-10 w-28 animate-pulse rounded-full bg-slate-200" />
            <div className="h-10 w-28 animate-pulse rounded-full bg-slate-200" />
          </div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-[280px_minmax(0,1fr)]">
          <div className="hidden rounded-3xl border border-slate-200 bg-slate-50 p-6 md:block">
            <div className="h-6 w-24 animate-pulse rounded-full bg-slate-200" />
            <div className="mt-4 space-y-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="h-4 w-32 animate-pulse rounded-full bg-slate-200" />
              ))}
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse rounded-3xl border border-slate-200 bg-slate-100 p-4">
                <div className="h-48 rounded-2xl bg-slate-200" />
                <div className="mt-4 h-4 rounded-full bg-slate-200" />
                <div className="mt-2 h-4 w-1/2 rounded-full bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
