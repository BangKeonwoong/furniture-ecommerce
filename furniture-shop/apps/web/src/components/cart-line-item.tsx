"use client";

import Image from "next/image";
import { useCartStore } from "@/lib/store/cart-store";

export function CartLineItem({ id }: { id: string }) {
  const item = useCartStore((state) => state.items.find((line) => line.id === id));
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  if (!item) return null;

  return (
    <div className="flex gap-6 rounded-3xl border border-slate-200 bg-white p-4">
      <div className="relative h-24 w-24 overflow-hidden rounded-2xl bg-slate-100">
        <Image src={item.image} alt={item.title} fill className="object-cover" />
      </div>
      <div className="flex flex-1 items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-900">{item.title}</p>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <button
              type="button"
              className="rounded-full border border-slate-200 px-2 py-1"
              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              type="button"
              className="rounded-full border border-slate-200 px-2 py-1"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>
          </div>
          <button
            type="button"
            className="text-xs text-slate-500 underline"
            onClick={() => removeItem(item.id)}
          >
            삭제
          </button>
        </div>
        <p className="text-sm font-semibold text-slate-900">
          {new Intl.NumberFormat("ko-KR", {
            style: "currency",
            currency: item.currency
          }).format((item.price * item.quantity) / 100)}
        </p>
      </div>
    </div>
  );
}
