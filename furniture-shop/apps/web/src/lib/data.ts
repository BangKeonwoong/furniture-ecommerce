import type { Product, Review, Variant } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { PRODUCT_THUMBNAIL_PLACEHOLDER } from "@/lib/placeholders";
import { prisma } from "@/lib/prisma";

type ProductWithRelations = Product & {
  variants: Pick<Variant, "price" | "currency" | "leadTimeDays" | "color">[];
  reviews: Pick<Review, "rating">[];
  images: { url: string }[];
};

export type ProductSummary = {
  slug: string;
  title: string;
  price: number;
  currency: string;
  leadTimeDays: number;
  shippingClass: "PARCEL" | "LTL" | "WHITE_GLOVE";
  thumbnail: string;
  rating: number;
  reviewCount: number;
  colors: string[];
  category: string;
};

const productSummaryInclude: Prisma.ProductInclude = {
  variants: {
    select: { price: true, currency: true, leadTimeDays: true, color: true },
    orderBy: { price: "asc" },
    take: 3
  },
  reviews: { select: { rating: true } },
  images: { select: { url: true }, orderBy: { sort: "asc" }, take: 1 }
};

function mapProductSummary(row: ProductWithRelations): ProductSummary {
  const reviewCount = row.reviews.length;
  const rating =
    reviewCount > 0
      ? row.reviews.reduce((acc, review) => acc + review.rating, 0) / reviewCount
      : 0;

  const primaryVariant = row.variants[0];

  return {
    slug: row.slug,
    title: row.title,
    price: primaryVariant?.price ?? 0,
    currency: primaryVariant?.currency ?? "KRW",
    leadTimeDays: primaryVariant?.leadTimeDays ?? 0,
    shippingClass: (row.shippingClass ?? "WHITE_GLOVE") as ProductSummary["shippingClass"],
    thumbnail: row.images[0]?.url ?? PRODUCT_THUMBNAIL_PLACEHOLDER,
    rating: reviewCount > 0 ? Number(rating.toFixed(1)) : 0,
    reviewCount,
    colors: row.variants.map((variant) => variant.color).filter(Boolean) as string[],
    category: row.category
  };
}

export async function getPrismaProductsByCategory(category: string) {
  const rows = await prisma.product.findMany({
    where: { category },
    include: productSummaryInclude
  });

  return rows.map((row) => mapProductSummary(row as ProductWithRelations));
}

export async function searchPrismaProducts(term: string) {
  const rows = await prisma.product.findMany({
    where: {
      OR: [
        { title: { contains: term } },
        { description: { contains: term } },
        { category: { contains: term } }
      ]
    },
    include: productSummaryInclude
  });

  return rows.map((row) => mapProductSummary(row as ProductWithRelations));
}

export async function getPrismaFeaturedCategories() {
  const rows = await prisma.product.findMany({
    distinct: ["category"],
    select: { category: true }
  });
  return rows.map((row) => row.category).filter(Boolean);
}

const products: ProductSummary[] = [
  {
    slug: "orion-modular-sofa",
    title: "Orion Modular Sofa",
    price: 349900,
    currency: "KRW",
    leadTimeDays: 14,
    shippingClass: "WHITE_GLOVE",
    thumbnail: PRODUCT_THUMBNAIL_PLACEHOLDER,
    rating: 4.8,
    reviewCount: 126,
    colors: ["Alabaster", "Charcoal"],
    category: "seating"
  },
  {
    slug: "luna-lounge-chair",
    title: "Luna Lounge Chair",
    price: 89900,
    currency: "KRW",
    leadTimeDays: 7,
    shippingClass: "PARCEL",
    thumbnail: "https://picsum.photos/seed/luna-chair/800/800",
    rating: 4.6,
    reviewCount: 58,
    colors: ["Olive", "Sand"],
    category: "seating"
  },
  {
    slug: "aeris-platform-bed",
    title: "Aeris Platform Bed",
    price: 279900,
    currency: "KRW",
    leadTimeDays: 10,
    shippingClass: "LTL",
    thumbnail: "https://picsum.photos/seed/aeris-bed/800/800",
    rating: 4.9,
    reviewCount: 212,
    colors: ["Natural Oak", "Walnut"],
    category: "bedroom"
  },
  {
    slug: "selene-dining-table",
    title: "Selene Dining Table",
    price: 199900,
    currency: "KRW",
    leadTimeDays: 5,
    shippingClass: "LTL",
    thumbnail: "https://picsum.photos/seed/selene-table/800/800",
    rating: 4.7,
    reviewCount: 96,
    colors: ["Walnut"],
    category: "dining"
  }
];

export async function getProductsByCategory(category: string): Promise<ProductSummary[]> {
  const normalized = category.toLowerCase();
  try {
    const prismaProducts = await getPrismaProductsByCategory(normalized);
    if (prismaProducts.length > 0) {
      return prismaProducts;
    }
  } catch (error) {
    console.warn("[Data] prisma category fallback", error);
  }
  await delay();
  return products.filter((product) => product.category === normalized);
}

export async function getFeaturedCategories() {
  try {
    const prismaCategories = await getPrismaFeaturedCategories();
    if (prismaCategories.length > 0) {
      return prismaCategories;
    }
  } catch (error) {
    console.warn("[Data] prisma categories fallback", error);
  }
  const categories = Array.from(new Set(products.map((product) => product.category)));
  return categories;
}

export async function searchProducts(query: string): Promise<ProductSummary[]> {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];
  try {
    const prismaResults = await searchPrismaProducts(normalized);
    if (prismaResults.length > 0) {
      return prismaResults;
    }
  } catch (error) {
    console.warn("[Data] prisma search fallback", error);
  }
  await delay();
  return products.filter(
    (product) =>
      product.title.toLowerCase().includes(normalized) || product.category.toLowerCase().includes(normalized)
  );
}

function delay(ms = 120) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
