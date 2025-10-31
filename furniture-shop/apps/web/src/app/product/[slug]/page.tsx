import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product-gallery";
import { ProductPolicies } from "@/components/product-policies";
import { ProductConfigurator } from "@/components/product-configurator";
import { estimateEta } from "@/lib/eta";
import { getProductDetail } from "@/lib/product-detail";
import { mmToCm } from "@/lib/units";

function formatPrice(value: number, currency: string) {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency
  }).format(value / 100);
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductDetail(params.slug);

  if (!product) {
    notFound();
  }

  const finalPrice = formatPrice(product.price, product.currency);
  const eta = estimateEta({ leadTimeDays: product.leadTimeDays, zone: "B" });
  const etaLabel = `예상 배송: ${eta - 2}~${eta + 2}일`;

  return (
    <div className="bg-white">
      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <ProductGallery images={product.gallery} />

          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{product.shippingClass}</p>
              <h1 className="text-3xl font-semibold text-slate-900">{product.title}</h1>
              {product.subtitle && <p className="text-sm text-slate-600">{product.subtitle}</p>}
              <p className="text-lg font-semibold text-slate-900">{finalPrice}</p>
              {product.compareAt && (
                <p className="text-sm text-slate-400 line-through">{formatPrice(product.compareAt, product.currency)}</p>
              )}
            </div>

            <ProductConfigurator product={product} priceLabel={finalPrice}>
              <div className="space-y-4 text-sm text-slate-600">
                <p>{product.description}</p>
                <ul className="list-disc space-y-2 pl-5">
                  {product.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm">
                <p className="font-semibold text-slate-900">{etaLabel}</p>
                <p className="mt-1 text-slate-600">화이트글러브 배송 · 설치 포함 · 시간 지정 안내 예정</p>
              </div>

              <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
                <p className="text-sm font-semibold text-slate-900">치수 (cm)</p>
                <div className="grid grid-cols-2 gap-3">
                  <span>가로: {mmToCm(product.dimensions.width)}cm</span>
                  <span>세로: {mmToCm(product.dimensions.depth)}cm</span>
                  <span>높이: {mmToCm(product.dimensions.height)}cm</span>
                  {product.dimensions.seatHeight && <span>좌방석 높이: {mmToCm(product.dimensions.seatHeight)}cm</span>}
                  {product.dimensions.armHeight && <span>팔걸이 높이: {mmToCm(product.dimensions.armHeight)}cm</span>}
                </div>
              </div>
            </ProductConfigurator>
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6 rounded-3xl bg-slate-50 p-8">
            <h2 className="text-xl font-semibold text-slate-900">3D / AR 미리보기</h2>
            <p className="text-sm text-slate-600">
              모바일 Safari에서는 AR Quick Look으로, Chrome에서는 3D 뷰어로 공간에 배치해볼 수 있습니다. 실제 모델 파일은 런치 시 업로드됩니다.
            </p>
            <div className="aspect-video w-full rounded-3xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">
              모델 뷰어 자리표시자
            </div>
          </div>
          <div className="space-y-6">
            <ProductPolicies policies={product.policies} />
          </div>
        </div>
      </section>
    </div>
  );
}
