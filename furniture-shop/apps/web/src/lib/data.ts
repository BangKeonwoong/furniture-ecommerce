import { PRODUCT_THUMBNAIL_PLACEHOLDER } from "@/lib/placeholders";

async function getPrismaProductsByCategory(category: string) {
  try {
    const { prisma } = await import("@/lib/prisma");
    const rows = await prisma.product.findMany({
      where: { category },
      include: {
        variants: {
          orderBy: { createdAt: "asc" },
          take: 1
        },
        images: {
          orderBy: { sort: "asc" },
          take: 1
        },
        reviews: true
      }
    });

    if (!rows.length) return null;

    return rows.map((row) => {
      const reviewCount = row.reviews.length;
      const rating =
        reviewCount > 0
          ? row.reviews.reduce((acc, review) => acc + review.rating, 0) / reviewCount
          : 0;

      return {
        slug: row.slug,
        title: row.title,
        price: row.variants[0]?.price ?? 0,
        currency: row.variants[0]?.currency ?? "KRW",
        leadTimeDays: row.variants[0]?.leadTimeDays ?? 0,
        shippingClass: (row.shippingClass ?? "WHITE_GLOVE") as ProductSummary["shippingClass"],
        thumbnail: row.images[0]?.url ?? PRODUCT_THUMBNAIL_PLACEHOLDER,
        rating: reviewCount > 0 ? Number(rating.toFixed(1)) : 0,
        reviewCount,
        colors: row.variants
          .map((variant) => variant.color)
          .filter(Boolean) as string[],
        category: row.category
      };
    });
  } catch (error) {
    return null;
  }
}

async function searchPrismaProducts(term: string) {
  try {
    const { prisma } = await import("@/lib/prisma");
    const rows = await prisma.product.findMany({
      where: {
        OR: [
          { title: { contains: term, mode: "insensitive" } },
          { description: { contains: term, mode: "insensitive" } },
          { category: { contains: term, mode: "insensitive" } }
        ]
      },
      include: {
        variants: { orderBy: { createdAt: "asc" }, take: 1 },
        images: { orderBy: { sort: "asc" }, take: 1 },
        reviews: true
      }
    });

    if (!rows.length) return null;
    return rows.map((row) => {
      const reviewCount = row.reviews.length;
      const rating =
        reviewCount > 0
          ? row.reviews.reduce((acc, review) => acc + review.rating, 0) / reviewCount
          : 0;

      return {
        slug: row.slug,
        title: row.title,
        price: row.variants[0]?.price ?? 0,
        currency: row.variants[0]?.currency ?? "KRW",
        leadTimeDays: row.variants[0]?.leadTimeDays ?? 0,
        shippingClass: (row.shippingClass ?? "WHITE_GLOVE") as ProductSummary["shippingClass"],
        thumbnail: row.images[0]?.url ?? PRODUCT_THUMBNAIL_PLACEHOLDER,
        rating: reviewCount > 0 ? Number(rating.toFixed(1)) : 0,
        reviewCount,
        colors: row.variants.map((variant) => variant.color).filter(Boolean) as string[],
        category: row.category
      };
    });
  } catch (error) {
    return null;
  }
}

async function getPrismaFeaturedCategories() {
  try {
    const { prisma } = await import("@/lib/prisma");
    const rows = await prisma.product.findMany({
      select: { category: true }
    });
    const categories = rows.map((row) => row.category).filter(Boolean);
    if (!categories.length) return null;
    return Array.from(new Set(categories));
  } catch (error) {
    return null;
  }
}

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
  const prismaProducts = await getPrismaProductsByCategory(normalized);
  if (prismaProducts && prismaProducts.length > 0) {
    return prismaProducts;
  }
  await delay();
  return products.filter((product) => product.category === normalized);
}

export async function getFeaturedCategories() {
  const prismaCategories = await getPrismaFeaturedCategories();
  if (prismaCategories && prismaCategories.length > 0) {
    return prismaCategories;
  }
  const categories = Array.from(new Set(products.map((product) => product.category)));
  return categories;
}

export async function searchProducts(query: string): Promise<ProductSummary[]> {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];
  const prismaResults = await searchPrismaProducts(normalized);
  if (prismaResults && prismaResults.length > 0) {
    return prismaResults;
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
