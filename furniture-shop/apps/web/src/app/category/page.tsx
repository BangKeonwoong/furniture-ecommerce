"use client";

import Link from "next/link";
import type { Route } from "next";

const categories = [
  { slug: "seating", title: "Seating", description: "Sofas, lounge chairs, modular systems" },
  { slug: "bedroom", title: "Bedroom", description: "Beds and storage for your retreat" },
  { slug: "dining", title: "Dining", description: "Tables and chairs for gatherings" },
  { slug: "workspace", title: "Workspace", description: "Desks, shelving, and office seating (coming soon)" }
] as const;

export default function CategoryIndexPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-slate-900">카테고리 전체 보기</h1>
        <p className="text-sm text-slate-600">
          Loom &amp; Lattice가 준비 중인 공간별 컬렉션을 한 번에 살펴보세요. 출시 알림을 신청하면 새로운 카테고리를
          가장 먼저 안내해 드립니다.
        </p>
      </header>
      <section className="grid gap-6 md:grid-cols-2">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}` as Route}
            className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{category.slug}</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">{category.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{category.description}</p>
            <span className="mt-4 inline-flex items-center text-sm font-medium text-slate-900">
              둘러보기 <span aria-hidden className="ml-2 transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        ))}
      </section>
      <footer className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-xs text-slate-500">
        원하는 카테고리가 보이지 않나요?{" "}
        <a href="mailto:hello@loomlattice.com" className="underline">
          hello@loomlattice.com
        </a>{" "}
        으로 의견을 보내 주세요.
      </footer>
    </div>
  );
}
