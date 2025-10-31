"use client";

import { useCallback, useMemo, useState } from "react";
import type { ProductDetail } from "@/lib/product-detail";

export function useVariantSelection(variants: ProductDetail["variants"]) {
  const [selectedId, setSelectedId] = useState<string>(variants[0]?.id ?? "");

  const activeVariant = useMemo(
    () => variants.find((variant) => variant.id === selectedId) ?? null,
    [variants, selectedId]
  );

  const selectVariant = useCallback((variantId: string) => {
    setSelectedId(variantId);
  }, []);

  const isSelected = useCallback(
    (variantId: string) => variantId === selectedId,
    [selectedId]
  );

  return {
    selectedId,
    activeVariant,
    selectVariant,
    isSelected
  };
}
