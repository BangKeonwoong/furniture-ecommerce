"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { searchProducts, type ProductSummary } from "@/lib/data";

const recentSearchesSeed = ["sofa", "dining", "oak table"];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProductSummary[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>(recentSearchesSeed);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    async function fetchResults() {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      setLoading(true);
      const res = await searchProducts(query);
      if (active) {
        setResults(res);
        setLoading(false);
      }
    }
    fetchResults();
    return () => {
      active = false;
    };
  }, [query]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const term = query.trim();
    if (!term) return;
    setRecentSearches((prev) => [term, ...prev.filter((item) => item !== term)].slice(0, 5));
  }

  return (
    <div className="bg-white">
      <section className="mx-auto w-full max-w-4xl px-6 py-12">
        <h1 className="text-3xl font-semibold text-slate-900">검색</h1>
        <p className="mt-2 text-sm text-slate-600">제품 이름이나 공간, 소재를 입력해 원하는 가구를 찾아보세요.</p>

        <form onSubmit={handleSubmit} className="mt-6 flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
          <svg className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 3.5a5.5 5.5 0 015.5 5.5c0 1.3-.46 2.5-1.23 3.45l3.14 3.15-1.06 1.06-3.15-3.14A5.5 5.5 0 119 3.5z" />
          </svg>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
            placeholder="예: modular sofa, walnut dining table"
          />
          <button type="submit" className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white">
            검색
          </button>
        </form>

        {recentSearches.length > 0 && (
          <div className="mt-6 text-sm">
            <p className="text-slate-500">최근 검색</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {recentSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600 hover:border-slate-300"
                  onClick={() => setQuery(term)}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="animate-pulse rounded-3xl border border-slate-200 bg-slate-100 p-6">
                  <div className="h-40 rounded-2xl bg-slate-200" />
                  <div className="mt-4 h-4 rounded-full bg-slate-200" />
                  <div className="mt-2 h-4 w-1/2 rounded-full bg-slate-200" />
                </div>
              ))}
            </div>
          ) : results.length === 0 && query ? (
            <div className="rounded-3xl border border-dashed border-slate-200 py-16 text-center text-sm text-slate-500">
              일치하는 결과가 없습니다. 다른 키워드로 검색해보세요.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
