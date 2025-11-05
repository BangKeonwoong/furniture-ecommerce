import "./globals.css";

import Link from "next/link";
import type { Metadata } from "next";

import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Furniture Shop",
  description: "Modern furniture built for real homes"
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <html lang="ko">
      <body className="bg-slate-50 text-slate-900">
        <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
            <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900">
              Loom &amp; Lattice
            </Link>
            <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
              <Link href="/category/seating" className="hover:text-slate-900">
                Seatings
              </Link>
              <Link href="/category/bedroom" className="hover:text-slate-900">
                Bedroom
              </Link>
              <Link href="/category/dining" className="hover:text-slate-900">
                Dining
              </Link>
              <Link href="/services" className="hover:text-slate-900">
                Services
              </Link>
            </nav>
            <div className="flex items-center gap-3 text-sm">
              {user ? (
                <>
                  <span className="hidden text-slate-600 sm:inline">{user.name ?? user.email}</span>
                  <form action="/api/auth/logout" method="POST">
                    <button className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600 hover:border-slate-300">
                      로그아웃
                    </button>
                  </form>
                  <Link
                    className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                    href="/account"
                  >
                    계정
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600 hover:border-slate-300"
                  >
                    로그인
                  </Link>
                  <Link
                    href="/signup"
                    className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                  >
                    회원가입
                  </Link>
                </>
              )}
            </div>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
