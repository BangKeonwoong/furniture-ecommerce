"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

const steps = [
  { segment: null, label: "주소" },
  { segment: "shipping", label: "배송" },
  { segment: "payment", label: "결제" }
] as const;

export function CheckoutStepper() {
  const segment = useSelectedLayoutSegment();

  return (
    <nav className="flex items-center justify-center gap-4 rounded-full bg-slate-100 px-2 py-1 text-sm">
      {steps.map((step, index) => {
        const isActive = segment === step.segment || (segment === null && step.segment === null);
        return (
          <Link
            key={step.label}
            href={step.segment ? `/checkout/${step.segment}` : `/checkout`}
            className={`flex min-w-[90px] items-center justify-center rounded-full px-4 py-2 transition ${
              isActive ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 text-xs font-semibold">
              {index + 1}
            </span>
            {step.label}
          </Link>
        );
      })}
    </nav>
  );
}
