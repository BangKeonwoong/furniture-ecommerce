"use client";

import Link from "next/link";
import type { Route } from "next";
import { useState } from "react";

const navLinks = [
  { href: "/category/seating" as Route, label: "Seating" },
  { href: "/category/bedroom" as Route, label: "Bedroom" },
  { href: "/category/dining" as Route, label: "Dining" },
  { href: "/services" as Route, label: "Services" },
  { href: "/stories" as Route, label: "Stories" }
] satisfies Array<{ href: Route; label: string }>;

const tradeRoute = "/trade" as Route;
const searchRoute = "/search" as Route;
const cartRoute = "/cart" as Route;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900">
          Loom & Lattice
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-slate-900">
              {link.label}
            </Link>
          ))}
          <Link href={tradeRoute} className="text-slate-500 hover:text-slate-900">
            Trade
          </Link>
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href={searchRoute}
            className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600 hover:border-slate-300 hover:text-slate-900"
          >
            검색
          </Link>
          <Link
            href={cartRoute}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            장바구니
          </Link>
        </div>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <span className="sr-only">메뉴 열기</span>
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? (
              <path d="M6 6l8 8M6 14L14 6" />
            ) : (
              <path d="M3.5 6h13M3.5 10h13M3.5 14h13" />
            )}
          </svg>
        </button>
      </div>
      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-4 text-sm font-medium text-slate-700">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link href={tradeRoute} onClick={() => setOpen(false)}>
              Trade Program
            </Link>
            <Link href={searchRoute} onClick={() => setOpen(false)}>
              빠른 검색
            </Link>
            <Link href={cartRoute} onClick={() => setOpen(false)} className="font-semibold text-slate-900">
              장바구니 보기
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
