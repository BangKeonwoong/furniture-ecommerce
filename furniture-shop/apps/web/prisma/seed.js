const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const PLACEHOLDERS = {
  hero: "https://picsum.photos/seed/furniture-hero/1200/800",
  lounge: "https://picsum.photos/seed/luna-chair/1200/800",
  bed: "https://picsum.photos/seed/aeris-bed/1200/800",
  dining: "https://picsum.photos/seed/selene-table/1200/800"
};

const PRODUCTS = [
  {
    slug: "orion-modular-sofa",
    title: "Orion Modular Sofa",
    subtitle: "Configurable 4-seat layout",
    description:
      "Low-profile modular sofa with high-resilience foam, removable covers, and kiln-dried oak plinth.",
    brand: "Loom & Lattice",
    collectionSlug: "orion-living",
    category: "seating",
    shippingClass: "WHITE_GLOVE",
    warrantyMonths: 36,
    careInstructions: "Vacuum weekly, professional clean only.",
    attributes: {
      configuration: "modular",
      seats: 4,
      upholstery: "Performance linen"
    },
    variants: [
      {
        sku: "ORION-SOFA-4S-ALABASTER",
        price: 349900,
        compareAt: 389900,
        currency: "KRW",
        color: "Alabaster",
        finish: "Natural Oak",
        material: "Performance Linen",
        stockQty: 5,
        leadTimeDays: 14
      },
      {
        sku: "ORION-SOFA-4S-CHARCOAL",
        price: 349900,
        currency: "KRW",
        color: "Charcoal",
        finish: "Espresso",
        material: "Performance Linen",
        stockQty: 3,
        leadTimeDays: 21
      }
    ],
    gallery: [
      { url: PLACEHOLDERS.hero, alt: "Orion modular sofa" },
      { url: "https://picsum.photos/seed/orion-detail/1200/800", alt: "Orion detail" }
    ],
    reviews: [
      {
        rating: 5,
        title: "훌륭한 마감",
        body: "화이트글러브 팀이 설치까지 완벽하게 마무리했습니다.",
        photos: ["https://picsum.photos/seed/orion-review/600/400"]
      }
    ],
    questions: [
      {
        body: "모듈 구성을 바꿀 수 있나요?",
        answer: "좌/우 변환이 가능한 구조로 제작되어 있습니다."
      }
    ]
  },
  {
    slug: "luna-lounge-chair",
    title: "Luna Lounge Chair",
    subtitle: "Curved profile, kiln-dried frame",
    description:
      "Compact lounge chair with swivel base, tight back, and feather blend seat cushion.",
    brand: "Luna",
    collectionSlug: "orion-living",
    category: "seating",
    shippingClass: "PARCEL",
    warrantyMonths: 24,
    careInstructions: "Spot clean with mild detergent, air dry.",
    attributes: {
      configuration: "chair",
      upholstery: "Bouclé"
    },
    variants: [
      {
        sku: "LUNA-LOUNGE-OLIVE",
        price: 89900,
        currency: "KRW",
        color: "Olive",
        material: "Bouclé",
        stockQty: 12,
        leadTimeDays: 7
      },
      {
        sku: "LUNA-LOUNGE-SAND",
        price: 89900,
        currency: "KRW",
        color: "Sand",
        material: "Bouclé",
        stockQty: 8,
        leadTimeDays: 7
      }
    ],
    gallery: [
      { url: PLACEHOLDERS.lounge, alt: "Luna lounge chair" },
      { url: "https://picsum.photos/seed/luna-detail/1200/800", alt: "Luna detail" }
    ],
    reviews: [
      {
        rating: 4,
        title: "편안하지만 단단함",
        body: "작은 공간에 잘 맞아요. 회전 기능도 부드럽습니다.",
        photos: []
      }
    ],
    questions: [
      {
        body: "커버는 분리 세탁 가능한가요?",
        answer: "부분 세탁 가능하며, 미지근한 물로 세척을 권장합니다."
      }
    ]
  },
  {
    slug: "aeris-platform-bed",
    title: "Aeris Platform Bed",
    subtitle: "Floating platform with storage drawers",
    description:
      "Solid oak platform bed with soft-close storage drawers and upholstered headboard.",
    brand: "Aeris",
    collectionSlug: "aeris-bedroom",
    category: "bedroom",
    shippingClass: "LTL",
    warrantyMonths: 48,
    careInstructions: "Use dry cloth on frame, gentle vacuum on headboard.",
    attributes: {
      mattressSize: "Queen",
      storage: true
    },
    variants: [
      {
        sku: "AERIS-BED-QUEEN-OAK",
        price: 279900,
        currency: "KRW",
        color: "Natural Oak",
        material: "Solid Oak",
        stockQty: 4,
        leadTimeDays: 10
      },
      {
        sku: "AERIS-BED-QUEEN-WALNUT",
        price: 289900,
        currency: "KRW",
        color: "Walnut",
        material: "Walnut Veneer",
        stockQty: 3,
        leadTimeDays: 14
      }
    ],
    gallery: [
      { url: PLACEHOLDERS.bed, alt: "Aeris platform bed" },
      { url: "https://picsum.photos/seed/aeris-detail/1200/800", alt: "Aeris drawer detail" }
    ],
    reviews: [
      {
        rating: 5,
        title: "수납이 넉넉해요",
        body: "서랍이 깊어 겨울 이불까지 들어갑니다.",
        photos: []
      }
    ],
    questions: [
      {
        body: "높이를 조절할 수 있나요?",
        answer: "헤드보드 높이는 고정형이며 베드프레임 높이는 동일합니다."
      }
    ]
  },
  {
    slug: "selene-dining-table",
    title: "Selene Dining Table",
    subtitle: "6-seat waterfall edge",
    description:
      "Waterfall dining table with solid ash top, marine-grade finish, and integrated leveling glides.",
    brand: "Selene",
    collectionSlug: "selene-dining",
    category: "dining",
    shippingClass: "LTL",
    warrantyMonths: 24,
    careInstructions: "Wipe with damp cloth, avoid harsh chemicals.",
    attributes: {
      seats: 6,
      extendable: false
    },
    variants: [
      {
        sku: "SELENE-DINE-6P-WALNUT",
        price: 199900,
        currency: "KRW",
        color: "Walnut",
        material: "Solid Ash",
        stockQty: 6,
        leadTimeDays: 5
      }
    ],
    gallery: [
      { url: PLACEHOLDERS.dining, alt: "Selene dining table" },
      { url: "https://picsum.photos/seed/selene-detail/1200/800", alt: "Selene leg detail" }
    ],
    reviews: [
      {
        rating: 4,
        title: "가족 모임에 적합",
        body: "6명이 앉아도 넉넉합니다. 표면 마감이 고급스럽네요.",
        photos: []
      }
    ],
    questions: [
      {
        body: "방수 코팅이 되어 있나요?",
        answer: "마린 그레이드 마감으로 가벼운 물기도 쉽게 닦입니다."
      }
    ]
  }
];

async function seed() {
  await prisma.image.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.collection.deleteMany();

  await prisma.collection.createMany({
    data: [
      { slug: "orion-living", title: "Orion Living", intro: "Modular seating with performance fabrics and warm oak accents." },
      { slug: "aeris-bedroom", title: "Aeris Bedroom", intro: "Floating silhouettes, hidden storage and warm textures for quiet spaces." },
      { slug: "selene-dining", title: "Selene Dining", intro: "Waterfall edges and taper legs for gatherings large and small." }
    ]
  });

  const collectionMap = await prisma.collection.findMany({ select: { id: true, slug: true } }).then((rows) => {
    return rows.reduce((acc, row) => {
      acc[row.slug] = row.id;
      return acc;
    }, {});
  });

  for (const product of PRODUCTS) {
    const created = await prisma.product.create({
      data: {
        slug: product.slug,
        title: product.title,
        subtitle: product.subtitle,
        description: product.description,
        brand: product.brand,
        collectionId: collectionMap[product.collectionSlug],
        category: product.category,
        shippingClass: product.shippingClass,
        warrantyMonths: product.warrantyMonths,
        careInstructions: product.careInstructions,
        attributes: JSON.stringify(product.attributes ?? {}),
        variants: {
          create: product.variants.map((variant) => ({
            ...variant,
            dimensions: JSON.stringify({ width: 2000, depth: 900, height: 750 }),
            boxDims: JSON.stringify([{ w: 2100, d: 950, h: 300, kg: 60 }]),
            status: "ACTIVE",
            weightKg: 60,
            weightCapacity: 200,
            assemblyRequired: true,
            assemblyTimeMin: 30
          }))
        },
        images: {
          create: product.gallery.map((image, index) => ({
            url: image.url,
            alt: image.alt,
            sort: index
          }))
        }
      }
    });

    if (product.reviews?.length) {
      await prisma.review.createMany({
        data: product.reviews.map((review) => ({
          productId: created.id,
          rating: review.rating,
          title: review.title,
          body: review.body,
          photos: JSON.stringify(review.photos ?? [])
        }))
      });
    }

    if (product.questions?.length) {
      await prisma.question.createMany({
        data: product.questions.map((question) => ({
          productId: created.id,
          body: question.body,
          answer: question.answer ?? null
        }))
      });
    }
  }
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Seed failed", error);
    await prisma.$disconnect();
    process.exit(1);
  });
