import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { getProductsByCategory } from "@/lib/data";

const categoryCopy: Record<string, { title: string; description: string }> = {
  seating: {
    title: "Seating",
    description: "다양한 공간과 라이프스타일에 맞춘 모듈형 소파와 라운지 체어를 만나보세요."
  },
  bedroom: {
    title: "Bedroom",
    description: "심플한 구조와 스마트 수납으로 완성한 침실 가구 컬렉션."
  },
  dining: {
    title: "Dining",
    description: "함께하는 순간을 위한 테이블과 체어, 소재와 마감에서 오는 차이를 느껴보세요."
  }
};

export const dynamic = "force-static";

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const products = await getProductsByCategory(params.slug);
  const copy = categoryCopy[params.slug];

  if (!copy) {
    notFound();
  }

  return (
    <div className="bg-white">
      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">{copy.title}</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">{copy.description}</p>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <button className="rounded-full border border-slate-200 px-4 py-2 hover:border-slate-300 hover:text-slate-900">
              ETA 빠른 순
            </button>
            <button className="rounded-full border border-slate-200 px-4 py-2 hover:border-slate-300 hover:text-slate-900">
              가격 낮은 순
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="hidden rounded-3xl border border-slate-200 bg-slate-50 p-6 md:block">
            <h2 className="text-sm font-semibold text-slate-900">필터</h2>
            <div className="mt-4 space-y-4 text-sm text-slate-600">
              <div>
                <p className="font-medium text-slate-900">배송</p>
                <div className="mt-2 space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" /> <span>화이트글러브</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" /> <span>프리미엄 배송</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" /> <span>택배 배송</span>
                  </label>
                </div>
              </div>
              <div>
                <p className="font-medium text-slate-900">ETA</p>
                <div className="mt-2 space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" /> <span>7일 이내</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" /> <span>14일 이내</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          <div>
            {products.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-200 py-20 text-center text-sm text-slate-500">
                준비 중인 컬렉션입니다. 다른 카테고리를 둘러보세요.
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
