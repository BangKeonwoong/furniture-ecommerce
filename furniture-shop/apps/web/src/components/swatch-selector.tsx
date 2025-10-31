"use client";

import React, { useState } from "react";
import type { ProductDetail } from "@/lib/product-detail";

export function SwatchSelector({
  variants,
  selectedId,
  onChange
}: {
  variants: ProductDetail["variants"];
  selectedId?: string;
  onChange?: (id: string) => void;
}) {
  const [internalSelected, setInternalSelected] = useState(variants[0]?.id ?? "");
  const resolvedSelected = selectedId ?? internalSelected;

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500">마감 선택</p>
      <div className="flex flex-wrap gap-3">
        {variants.map((variant) => {
          const isSelected = variant.id === resolvedSelected;
          return (
            <button
              key={variant.id}
              type="button"
              disabled={!variant.inStock}
              aria-pressed={isSelected}
              onClick={() => {
                if (selectedId === undefined) {
                  setInternalSelected(variant.id);
                }
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
