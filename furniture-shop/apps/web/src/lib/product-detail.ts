import { HERO_PLACEHOLDER, PRODUCT_PLACEHOLDER } from "@/lib/placeholders";

export type ProductDetail = {
  slug: string;
  title: string;
  subtitle?: string;
  price: number;
  compareAt?: number;
  currency: string;
  leadTimeDays: number;
  shippingClass: "PARCEL" | "LTL" | "WHITE_GLOVE";
  description: string;
  dimensions: {
    width: number;
    depth: number;
    height: number;
    seatHeight?: number;
    armHeight?: number;
  };
  variants: Array<{
    id: string;
    label: string;
    color: string;
    swatch?: string;
    inStock: boolean;
  }>;
  gallery: string[];
  features: string[];
  policies: {
    delivery: string;
    returns: string;
    warranty: string;
  };
};

const mockProduct: ProductDetail = {
  slug: "orion-modular-sofa",
  title: "Orion Modular Sofa",
  subtitle: "Configurable 4-seat layout",
  price: 349900,
  compareAt: 389900,
  currency: "KRW",
  leadTimeDays: 14,
  shippingClass: "WHITE_GLOVE",
  description:
    "낮은 실루엣과 깊은 좌방석, 고밀도 폼과 다운 블렌드 쿠션으로 완성한 모듈형 소파입니다.",
  dimensions: {
    width: 3200,
    depth: 1100,
    height: 760,
    seatHeight: 420,
    armHeight: 560
  },
  variants: [
    { id: "alabaster", label: "Alabaster", color: "#E9E5DA", swatch: "#E9E5DA", inStock: true },
    { id: "charcoal", label: "Charcoal", color: "#393939", swatch: "#393939", inStock: true },
    { id: "linen", label: "Fog Linen", color: "#D0C8BE", swatch: "#D0C8BE", inStock: false }
  ],
  gallery: [HERO_PLACEHOLDER, PRODUCT_PLACEHOLDER, "https://picsum.photos/seed/furniture-alt/800/800"],
  features: [
    "모듈형 구성으로 좌/우 카우치 전환 가능",
    "스테인 방지 퍼포먼스 패브릭",
    "화이트글러브 배송 + 설치 포함"
  ],
  policies: {
    delivery: "수도권 14일 내 화이트글러브 배송. 지방권 +3일. 3인 이상 팀이 설치 및 포장 수거 진행.",
    returns:
      "배송 후 14일 이내 반품 가능. LTL 회수비 120,000원 공제. 맞춤 제작 옵션 선택 시 반품 불가.",
    warranty: "프레임 5년, 쿠션 2년 보증. 정품 등록 시 무료 케어 가이드 제공."
  }
};

export async function getProductDetail(slug: string): Promise<ProductDetail | null> {
  await new Promise((resolve) => setTimeout(resolve, 120));
  if (slug === mockProduct.slug) {
    return mockProduct;
  }
  return null;
}
