"use client";

import { create } from "zustand";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  currency: string;
  quantity: number;
  image: string;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          items: state.items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i))
        };
      }
      return { items: [...state.items, item] };
    }),
  removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item))
    })),
  clear: () => set({ items: [] })
}));
