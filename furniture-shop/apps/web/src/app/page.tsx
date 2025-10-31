import Link from "next/link";
import type { Route } from "next";
import Image from "next/image";
import { HERO_PLACEHOLDER } from "@/lib/placeholders";

const categories = [
  { slug: "seating", title: "Seating", description: "Sofas, sectionals, and lounge chairs built for everyday comfort." },
  { slug: "bedroom", title: "Bedroom", description: "Beds and storage designed to transform your retreat." },
  { slug: "dining", title: "Dining", description: "Gathering tables and chairs with honest materials." }
] as const;

const seatingRoute = "/category/seating" as Route;
const storiesRoute = "/stories" as Route;
const categoryRoute = "/category" as Route;

export default function HomePage() {
  return (
    <div className="bg-gradient-to-b from-white to-slate-100">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-20 md:flex-row md:items-center">
        <div className="flex-1 space-y-6">
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-500">
            Crafted for real spaces
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            시간이 지나도 변하지 않는 디자인, Loom & Lattice 컬렉션을 만나보세요.
          </h1>
          <p className="text-lg text-slate-600">
            빠른 배송 ETA, 화이트글러브 설치, AR 미리보기까지 갖춘 올인원 쇼핑 경험입니다.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href={seatingRoute} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              쇼파 & 체어 보기
            </Link>
            <Link href={storiesRoute} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 hover:border-slate-400">
              공간별 스타일 가이드
            </Link>
          </div>
        </div>
        <div className="flex-1 overflow-hidden rounded-3xl shadow-soft">
          <Image src={HERO_PLACEHOLDER} alt="Hero" width={1200} height={800} className="h-full w-full object-cover" />
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="flex items-center justify-between py-6">
          <h2 className="text-2xl font-semibold text-slate-900">카테고리 둘러보기</h2>
          <Link href={categoryRoute} className="text-sm font-medium text-slate-600 hover:text-slate-900">
            전체 보기
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={{ pathname: "/category/[slug]", params: { slug: category.slug } }}
              className="group rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{category.slug}</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">{category.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{category.description}</p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-slate-900">
                둘러보기
                <span aria-hidden className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
