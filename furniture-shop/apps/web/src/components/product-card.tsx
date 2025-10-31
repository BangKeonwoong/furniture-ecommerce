import Image from "next/image";
import Link from "next/link";
import type { ProductSummary } from "@/lib/data";
import { PRODUCT_THUMBNAIL_PLACEHOLDER } from "@/lib/placeholders";

function formatPrice(value: number, currency: string) {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency
  }).format(value / 100);
}

function shippingLabel(shippingClass: ProductSummary["shippingClass"]) {
  switch (shippingClass) {
    case "PARCEL":
      return "택배 배송";
    case "LTL":
      return "프리미엄 배송";
    case "WHITE_GLOVE":
      return "화이트글러브";
    default:
      return "배송";
  }
}

export function ProductCard({ product }: { product: ProductSummary }) {
  const price = formatPrice(product.price, product.currency);
  const eta = `${product.leadTimeDays}일 내 출고`;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100">
        <Image
          src={product.thumbnail || PRODUCT_THUMBNAIL_PLACEHOLDER}
          alt={product.title}
          fill
          priority={false}
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-700">
          {eta}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{shippingLabel(product.shippingClass)}</p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900">{product.title}</h3>
        </div>
        <p className="text-sm text-slate-600">{price}</p>
        <div className="mt-auto flex items-center justify-between text-xs text-slate-500">
          <span>★ {product.rating.toFixed(1)} ({product.reviewCount})</span>
          <span>{product.colors.length} colors</span>
        </div>
      </div>
    </Link>
  );
}
