import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ProductConfigurator } from "@/components/product-configurator";
import { useCartStore } from "@/lib/store/cart-store";
import type { ProductDetail } from "@/lib/product-detail";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock
  })
}));

function createProduct(overrides: Partial<ProductDetail> = {}): ProductDetail {
  return {
    slug: "orion-modular-sofa",
    title: "Orion Modular Sofa",
    subtitle: "Configurable 4-seat layout",
    price: 349900,
    compareAt: undefined,
    currency: "KRW",
    leadTimeDays: 14,
    shippingClass: "WHITE_GLOVE",
    description: "A modular sofa built for everyday lounging.",
    dimensions: {
      width: 3200,
      depth: 1100,
      height: 760,
      seatHeight: 420
    },
    variants: [
      { id: "alabaster", label: "Alabaster", color: "#E9E5DA", inStock: true },
      { id: "charcoal", label: "Charcoal", color: "#393939", inStock: true }
    ],
    gallery: ["https://example.com/hero.jpg"],
    features: ["모듈 구성 변경 가능"],
    policies: {
      delivery: "화이트글러브 배송",
      returns: "14일 이내 반품 가능",
      warranty: "프레임 5년 보증"
    },
    ...overrides
  };
}

describe("ProductConfigurator", () => {
  beforeEach(() => {
    pushMock.mockReset();
    useCartStore.getState().clear();
  });

  it("adds the active variant to cart and routes to cart page", async () => {
    const product = createProduct();
    const user = userEvent.setup();

    render(<ProductConfigurator product={product} priceLabel="₩349,900" />);

    await act(async () => {
      await user.click(screen.getByRole("button", { name: /장바구니에 담기/i }));
    });

    const cartItems = useCartStore.getState().items;
    expect(cartItems).toHaveLength(1);
    expect(cartItems[0]).toMatchObject({
      id: "orion-modular-sofa-alabaster",
      title: expect.stringContaining("Orion Modular Sofa"),
      quantity: 1
    });
    expect(pushMock).toHaveBeenCalledWith("/cart");
  });

  it("disables CTA for out-of-stock variant until another swatch is selected", async () => {
    const product = createProduct({
      variants: [
        { id: "linen", label: "Linen", color: "#D0C8BE", inStock: false },
        { id: "slate", label: "Slate", color: "#525252", inStock: true }
      ]
    });
    const user = userEvent.setup();

    render(<ProductConfigurator product={product} priceLabel="₩349,900" />);

    const addButton = screen.getByRole("button", { name: /장바구니에 담기/i });
    expect(addButton).toBeDisabled();

    await act(async () => {
      await user.click(screen.getByRole("button", { name: /Slate/i }));
    });
    expect(addButton).not.toBeDisabled();
  });
});
