import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: {
    default: "Loom & Lattice",
    template: "%s | Loom & Lattice"
  },
  description: "Premium furniture for modern living with transparent delivery and white-glove care.",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body className={cn("min-h-screen bg-slate-50 text-slate-900 antialiased", fontSans.variable)}>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
