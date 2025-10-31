"use client";

import React, { type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { ProductDetail } from "@/lib/product-detail";
import { SwatchSelector } from "@/components/swatch-selector";
import { useCartStore } from "@/lib/store/cart-store";
import { PRODUCT_PLACEHOLDER } from "@/lib/placeholders";
import { useVariantSelection } from "@/hooks/useVariantSelection";

type ProductConfiguratorProps = {
  product: ProductDetail;
  priceLabel: string;
  children?: ReactNode;
};

export function ProductConfigurator({ product, priceLabel, children }: ProductConfiguratorProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const { activeVariant, selectedId, selectVariant } = useVariantSelection(product.variants);
  const isVariantOutOfStock = !activeVariant || !activeVariant.inStock;

  const handleAddToCart = () => {
    if (!activeVariant || isVariantOutOfStock) {
      return;
    }

    addItem({
      id: `${product.slug}-${activeVariant.id}`,
      title: `${product.title} (${activeVariant.label})`,
      price: product.price,
      currency: product.currency,
      quantity: 1,
      image: product.gallery[0] ?? PRODUCT_PLACEHOLDER
    });

    router.push("/cart");
  };

  return (
    <div className="space-y-6">
      <SwatchSelector
        variants={product.variants}
        selectedId={selectedId ?? undefined}
        onChange={selectVariant}
      />
      {children}
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={isVariantOutOfStock}
        className={`fixed inset-x-0 bottom-0 flex items-center justify-between bg-white px-6 py-4 text-sm shadow-2xl md:static md:rounded-full md:border md:border-slate-200 md:bg-slate-900 md:px-8 md:py-4 md:text-base md:text-white md:shadow-none ${
          isVariantOutOfStock ? "cursor-not-allowed opacity-60" : "hover:bg-slate-800 md:hover:bg-slate-800"
        }`}
      >
        <span>장바구니에 담기</span>
        <span className="font-semibold">{priceLabel}</span>
      </button>
    </div>
  );
}
