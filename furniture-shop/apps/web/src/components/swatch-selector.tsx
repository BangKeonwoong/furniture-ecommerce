"use client";

import { useState } from "react";
import type { ProductDetail } from "@/lib/product-detail";

export function SwatchSelector({
  variants,
  onChange
}: {
  variants: ProductDetail["variants"];
  onChange?: (id: string) => void;
}) {
  const [selected, setSelected] = useState(variants[0]?.id ?? "");

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500">마감 선택</p>
      <div className="flex flex-wrap gap-3">
        {variants.map((variant) => {
          const isSelected = variant.id === selected;
          return (
            <button
              key={variant.id}
              type="button"
              disabled={!variant.inStock}
              onClick={() => {
                setSelected(variant.id);
                onChange?.(variant.id);
              }}
              className={`flex items-center gap-3 rounded-full border px-4 py-2 text-sm transition ${
                isSelected ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 hover:border-slate-300"
              } ${variant.inStock ? "" : "opacity-60"}`}
            >
              <span className="inline-block h-5 w-5 rounded-full" style={{ backgroundColor: variant.swatch ?? variant.color }} />
              <span>{variant.label}</span>
            </button>
          );
        })}
      </div>
      <p className="text-xs text-slate-500">재고 상태는 실시간으로 업데이트됩니다.</p>
    </div>
  );
}
