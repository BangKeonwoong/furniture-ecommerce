# 가구 판매 웹사이트 — GPT‑5 Codex CLI용 상세 계획 · 유의사항 · 기술/기교

아래 문서는 **GPT‑5 Codex CLI**로 “가구 판매 웹사이트”를 만들기 위한 **상세 계획·유의사항·기술/기교 모음**입니다. 그대로 복붙해 실행 가능한 **Codex 프롬프트**와 **스키마/코드 예시**, **체크리스트**까지 포함했습니다. 불필요한 미사여구 없이 실전 위주로 구성했습니다.

---

## 0) 목표와 성공 기준

- **핵심 목표:** 방문자가 3~5분 안에 “내 공간/예산/배송 가능일”에 맞는 가구를 비교·구매할 수 있게 한다.  
- **지표(KPI):**  
  - 상품목록→PDP 클릭률 ≥ 35%  
  - PDP→장바구니 전환 ≥ 18%  
  - 장바구니→결제 시작 ≥ 55% / 결제완료 ≥ 70%  
  - 반품율(30일 기준) ≤ 6% / 배송 손상 클레임 ≤ 1.5%

---

## 1) 정보 구조(IA)·카탈로그 설계

### 1.1 카테고리 트리(샘플)
- **Seating**: Sofa, Loveseat, Sectional, Armchair, Ottoman, Bench  
- **Bedroom**: Bed, Mattress, Nightstand, Dresser, Wardrobe  
- **Dining**: Dining Table, Dining Chair, Bar Stool, Sideboard  
- **Storage**: Bookcase, Cabinet, TV Stand, Shelving  
- **Office**, **Outdoor**, **Kids**, **Lighting**, **Rugs/Decor**, **Collections(시리즈)**

### 1.2 공통 속성(모든 가구)
- **치수**: width/depth/height, seatHeight, armHeight, clearance(하부공간), **패키지 박스 치수/무게**(문 통과 체크용)  
- **소재/마감**: material(wood/metal/fabric/leather), finish(oak/walnut/…​)  
- **색상·스와치**: color, swatchImage  
- **하중**: weightCapacity  
- **조립**: assemblyRequired(yes/no), assemblyTime(min), toolsIncluded  
- **리드타임**: leadTimeDays(재고/주문제작 구분), madeToOrder(boolean)  
- **배송 등급**: shippingClass(parcel/LTL/whiteglove), boxCount  
- **보증/케어**: warrantyMonths, careInstructions  
- **시리즈/호환**: collectionId, compatibleItems[]

### 1.3 카테고리별 필터(퍼니처 특화)
- 공통: 가격, **배송 가능일(ETA)**, 재고, 소재, 마감, 색상, 브랜드, 평점  
- Seating: 좌석수, 좌방석 깊이, 모듈형 여부, 형태(L‑shape/U‑shape)  
- Dining: 인원수, 연장(extendable), 상판 소재/두께  
- Bedroom: 매트리스 규격(Queen/King/…​), 수납형 여부  
- Outdoor: 방수/UV 등급

**주의:** 필터 라벨은 고객 언어(“소파/쇼파/sofa/couch”) 동의어 사전으로 매핑. 단위(㎝/inch) 자동 변환.

---

## 2) PDP(상품 상세) 구성 원칙

- **퍼스트뷰**: 가격(할인/할부/BNPL 옵션), **ETA/배송비/반품 요약**, 재고, 변형 선택(스와치), CTA(장바구니/가속결제).  
- **결정 지원**:  
  1) **치수 다이어그램**(문짝/엘리베이터/복도 통과 가이드 포함)  
  2) **스와치 즉시 미리보기** + 고해상도 줌/회전  
  3) **AR/3D 보기**(glTF/GLB + USDZ)  
  4) **공간·스타일 추천(“이 시리즈와 매칭”)**  
- **정책 투명성**: 반품(기간/비용/재포장 규정), 배송 등급(문 앞/룸인/화이트글러브), 조립 옵션.  
- **UGC**: 포토 리뷰, 키워드 필터(“편안함/내구성/조립쉬움”), Q&A(치수/설치/케어).

---

## 3) 배송·반품·A/S 설계(퍼니처 특화)

- **배송 등급 분기**
  - **Parcel**: 소형(택배) – 자동 운임 계산  
  - **LTL Freight**: 대형 – 리프트 게이트/예약 배송, 배송일 지정  
  - **White‑Glove**: 실내 배치 + 포장 수거 + 선택적 조립
- **ETA 계산**: `leadTimeDays + 운송일수(우편번호/권역) + 예약대기일수`  
- **예약/부재 실패 정책**: 2회 실패 후 재배송비 추가 고지  
- **손상 클레임 플로우**: 수령 48시간 내 사진 업로드 → RMA 발급 → 부분 환불/부품 재발송/교체  
- **반품 조건**: 사용흔적/조립 후 반품 제한, 포장 보존, 리스탁 비용(대형 가구 현실 반영)  
- **맞춤제작(MTO)**: 취소·반품 제한(법규 준수 범위 내), 승인 체크박스/요약 강조

---

## 4) 검색·탐색·추천

- **자동완성**: 카테고리/브랜드/최근 본 상품 혼합, 동의어·오타 보정(“쇼파/소파/couch/sofa”).  
- **패싯**: 숫자 범위 슬라이더(폭/깊이/높이/가격/리드타임), 스와치 필터(색/마감), **ETA 필터**(이번 주/2주 내/한 달+).  
- **리스트 카드**: 썸네일, 색상 변형 미리보기, **ETA 배지**, 배송 등급, 리뷰 요약, 빠른 비교/담기.  
- **추천**: 세트 구성(다이닝 테이블 + 체어 N), 시리즈 매칭, “공간별 룩” 컬렉션.

---

## 5) 접근성·국제화·SEO

- **접근성**: WCAG 2.2 AA, 키보드 포커스/스킵 링크, 스와치=라디오 그룹, 3D 모델 **대체 설명** 제공.  
- **국제화**: ㎝↔inch, kg↔lb 자동 변환, 지역/통화/날짜 로케일, **배송 가능 국가별 결제수단**.  
- **SEO/리치리절트**: `Product`, `Offer`, `AggregateRating`, `FAQPage`, `HowTo`(조립 가이드 가능), 변형 canonical 전략, **품절/단종** 처리(410/301/대체상품).

---

## 6) 아키텍처·스택

- **프런트**: Next.js(App Router, RSC, Server Actions), TypeScript, Tailwind  
- **백엔드**: Next API Route/Server Action + Postgres + Prisma  
- **검색**: Typesense/Algolia  
- **결제**: Stripe Payment Intent + Payment Element(가속결제 연동)  
- **이미지/3D**: 이미지 CDN(WebP/AVIF), `@google/model-viewer`(GLB/USDZ), 360 뷰(스프라이트)  
- **호스팅**: Vercel(에지 캐시/ISR), DB는 관리형(Postgres)  
- **관측**: Sentry(프런트/백), 로그(요청/결제/웹훅), GA4/헤드리스 이벤트 파이프

---

## 7) 데이터 모델(Prisma 예시)

```prisma
// schema.prisma
datasource db { provider = "postgresql"; url = env("DATABASE_URL") }
generator client { provider = "prisma-client-js" }

model Product {
  id              String   @id @default(cuid())
  slug            String   @unique
  title           String
  subtitle        String?
  description     String
  brand           String?
  collectionId    String?
  madeToOrder     Boolean  @default(false)
  shippingClass   ShippingClass
  warrantyMonths  Int? 
  careInstructions String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  variants        Variant[]
  images          Image[]
  reviews         Review[]
  qna             Question[]
  attributes      Json     // 카테고리별 확장 속성(예: extendable, seats 등)
}

model Variant {
  id           String  @id @default(cuid())
  productId    String
  sku          String  @unique
  price        Int     // cents
  compareAt    Int?
  currency     String  @default("USD")
  color        String?
  finish       String?
  material     String?
  swatchImage  String?
  stockQty     Int     @default(0)
  leadTimeDays Int     @default(0)
  weightKg     Float?
  packageCount Int? 
  boxDims      Json?   // [{w,d,h,kg}]
  dimensions   Json    // {width, depth, height, seatHeight, armHeight, clearance}
  weightCapacity Int?
  assemblyRequired Boolean @default(false)
  assemblyTimeMin Int?
  images       Image[]
  status       VariantStatus @default(ACTIVE)
  Product      Product @relation(fields: [productId], references: [id])
}

model Image {
  id        String  @id @default(cuid())
  variantId String?
  productId String?
  url       String
  alt       String
  sort      Int     @default(0)
  Variant   Variant? @relation(fields: [variantId], references: [id])
  Product   Product? @relation(fields: [productId], references: [id])
}

model Review {
  id        String  @id @default(cuid())
  productId String
  rating    Int
  title     String?
  body      String?
  photos    Json?
  createdAt DateTime @default(now())
  Product   Product @relation(fields: [productId], references: [id])
}

model Question {
  id        String  @id @default(cuid())
  productId String
  body      String
  answer    String?
  createdAt DateTime @default(now())
  Product   Product @relation(fields: [productId], references: [id])
}

enum ShippingClass { PARCEL LTL WHITE_GLOVE }
enum VariantStatus { ACTIVE DRAFT DISCONTINUED }
```

---

## 8) 라우팅 구조(Next.js, App Router)

```
app/
  layout.tsx
  page.tsx                         # 홈: 주력 카테고리, 룩/세트, 베스트셀러, 빠른 필터(ETA)
  search/
    page.tsx                       # 검색 결과(자동완성 API 포함)
  category/[slug]/
    page.tsx                       # 목록: 패싯, 정렬, 비교
  product/[slug]/
    page.tsx                       # PDP
  cart/page.tsx
  checkout/
    page.tsx                       # 게스트 기본, 주소 → 배송 → 결제
    success/[orderId]/page.tsx
  account/
    orders/[id]/page.tsx
  api/
    products/route.ts              # 목록/PDP 데이터
    checkout/create-intent/route.ts
    checkout/webhook/route.ts
    qna/route.ts
```

---

## 9) 핵심 컴포넌트·기교

### 9.1 스와치 변형 선택(접근성 보장)

```tsx
// VariantSwatches.tsx
"use client";
import { useId } from "react";

type Opt = { id: string; label: string; swatchUrl?: string; disabled?: boolean };

export default function VariantSwatches({
  options, value, onChange
}: { options: Opt[]; value?: string; onChange: (id: string)=>void }) {
  const name = useId();
  return (
    <div role="radiogroup" aria-label="색상/마감">
      <div className="flex gap-2">
        {options.map(o => (
          <label key={o.id} className={`inline-flex items-center gap-2 border rounded p-2 ${o.disabled ? "opacity-40" : "cursor-pointer"}`}>
            <input
              type="radio" name={name} value={o.id}
              checked={o.id===value} onChange={()=>onChange(o.id)} disabled={o.disabled}
              className="sr-only"
            />
            {o.swatchUrl ? <img src={o.swatchUrl} alt="" className="w-6 h-6 rounded" /> : <span className="w-6 h-6 rounded border" />}
            <span aria-hidden>{o.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
```

### 9.2 치수 테이블 + 단위 변환
- 내부는 **mm** 기준 저장 → UI에서 `㎝/inch` 토글로 변환.  
- “문 통과” 체크: `max(box.width, box.height) < door.width` 단순 규칙 + 경고 표시.

### 9.3 3D/AR

```html
<script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
<model-viewer src="/models/sofa.glb" ios-src="/models/sofa.usdz"
  ar ar-modes="webxr scene-viewer quick-look"
  camera-controls environment-image="neutral"
  shadow-intensity="1" style="width:100%;height:480px">
</model-viewer>
```
- GLB는 5–15MB 목표(텍스처 압축, Draco/KTX2). USDZ는 iOS Quick Look용.

### 9.4 배송 ETA 계산 로직(초간단)

```ts
type Zone = "A"|"B"|"C";
const zoneTransit: Record<Zone, number> = { A:2, B:5, C:9 }; // 영업일
function estimateEta(leadTimeDays:number, zone:Zone, schedulingDays=2){
  return leadTimeDays + zoneTransit[zone] + schedulingDays;
}
```
- Zone 매핑은 우편번호 전처리로 캐싱. MTO는 `leadTimeDays` 크게.

### 9.5 Stripe 결제(서버 액션/API 예시)

```ts
// app/api/checkout/create-intent/route.ts
import Stripe from "stripe";
export async function POST(req: Request) {
  const { amount, currency, customer_email } = await req.json();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const intent = await stripe.paymentIntents.create({
    amount, currency, receipt_email: customer_email,
    automatic_payment_methods: { enabled: true }
  });
  return Response.json({ clientSecret: intent.client_secret });
}
```

---

## 10) 성능·품질·보안

- **이미지**: `next/image`, AVIF/WebP, `sizes`+`srcset`, LQIP/blur placeholder, lazy‑loading, **첫 뷰 주요 이미지 프리로드**.  
- **JS 예산**: 기본 번들 < 150KB(gz), 라우트 분할, 서버 컴포넌트 우선.  
- **캐싱**: 제품/목록 ISR(60–300s), 추천/재고는 서버 액션 갱신.  
- **보안**: CSRF(결제 제외 시 안전 처리), Rate limit(로그인/결제 API), 웹훅 서명 검증, 주문 금액 서버측 재계산(카트 신뢰 금지).  
- **접근성 회귀 테스트**: Axe/Lighthouse CI.  
- **에러 복구**: 결제 실패 재시도, 장바구니 영속화(cookie+server), 주문중단 복구 이메일.

---

## 11) 운영(CMS·PIM·프로세스)

- **PIM/CMS**: 시리즈 페이지, 룩북, 블로그(가이드/케어/스타일링).  
- **프로모션**: 쿠폰(율/정액/세트), 자동 프로모션(‘체어 4+1’), 번들(테이블+체어 N).  
- **반품 포털**: 주문번호+이메일 → 품목 선택 → 사진 업로드 → 자동 RMA → 픽업 수배.  
- **고객지원**: 영상 상담 예약(고가/복잡 상품), 치수 상담 스크립트, 부품(스크류/다리) 재발송 템플릿.

---

## 12) 로깅·분석·A/B

- **핵심 이벤트**: search, filter_apply, product_view, ar_view, add_to_cart, checkout_begin, payment_success, return_request.  
- **A/B 후보**:  
  1) ETA 노출 위치(가격 옆 vs. CTA 하단)  
  2) PDP 가속결제 버튼 노출(PDP 포함 vs. 체크아웃 전용)  
  3) 게스트 체크아웃 버튼 강조(최상단 강조 vs. 동등)  
  4) 리뷰 요약(문장 요약 vs. 분포 그래프)  
- **대시보드**: 퍼널/상품군별 전환/반품 이유 태깅(사이즈/색상오차/손상/품질)

---

## 13) QA 시나리오(발췌)

1. **MTO 소파**: 스와치 선택 → ETA 계산(4주+배송) → 결제 → 주문 확인서에 ETA/배송 등급 표기 확인.  
2. **문 통과 불가 케이스**: 문 폭 70㎝, 박스 최단 변 80㎝ → 경고 노출·구매 가능은 유지.  
3. **LTL 배송 실패**: 예약일 부재 → 재예약 프로세스·요금 고지 노출.  
4. **반품 포털**: 손상 사진 업로드 → RMA 생성 → 픽업 일정 확정 알림.

---

## 14) 실제 개발 시작 — **Codex CLI 프롬프트**(즉시 실행용)

> 전제: Codex CLI 설치/로그인 완료.

```bash
codex -C ./furniture-shop --sandbox workspace-write --full-auto --search \
"Next.js(App Router, TS, Tailwind) 기반 가구 이커머스 MVP 생성.
요구사항:
1) 라우트: 홈/검색/카테고리/상품(PDP)/장바구니/체크아웃/주문완료.
2) Prisma+Postgres 스키마: Product/Variant/Image/Review/Question, 가구 특화 필드(치수, 스와치, 배송등급, 리드타임, 패키지박스).
3) PDP: 가격/ETA/반품요약/스와치/치수표/3D(모델뷰어)/리뷰/Q&A/추천.
4) 체크아웃: 게스트 기본, 주소→배송→결제(Stripe Payment Intent + Payment Element). 웹훅 처리.
5) 검색/목록: 패싯(가격/치수/ETA/소재/마감/색상), 자동완성, 제품카드에 ETA 배지.
6) 이미지 최적화(next/image), ISR, 서버 컴포넌트 우선.
7) .env 예시(STRIPE_SECRET_KEY, DATABASE_URL), seed 스크립트(소파/테이블 등 20개).
8) Unit 변환(㎝↔inch), ETA 계산 유틸, 문 통과 체크 유틸 포함.
9) 테스트: Playwright 기본 플로우(검색→PDP→장바구니→결제시작), Lighthouse CI 스크립트.
완료 후 README에 로컬 실행/마이그레이션/시드/테스트/배포 문서화."
```

---

## 15) 샘플 시드(요약)

```ts
// prisma/seed.ts (발췌)
await prisma.product.create({
  data: {
    slug: "sofa-luna-3-seat",
    title: "Luna 3‑Seat Sofa",
    description: "미드센추리 라인, 깊은 좌방석.",
    brand: "Luna",
    shippingClass: "LTL",
    variants: {
      create: [{
        sku: "LUNA-SOFA-3S-OAK-GREY",
        price: 129900, currency: "USD",
        color: "Grey", finish: "Oak", material: "Fabric",
        stockQty: 6, leadTimeDays: 7,
        dimensions: { width: 2100, depth: 950, height: 820, seatHeight: 440 },
        boxDims: [{ w: 2200, d: 1000, h: 700, kg: 55 }]
      }]
    }
  }
});
```

---

## 16) 마이크로카피/가이드(필수 문구)

- **치수 경고**: “가구 패키지 치수 기준으로 출입문/엘리베이터 통과 여부를 확인하세요. 도움이 필요하시면 채팅/영상 상담을 예약하세요.”  
- **MTO 동의**: “주문제작 상품은 제작 시작 후 취소/반품이 제한됩니다.”  
- **배송 등급**: “화이트글러브: 실내 배치 + 포장 수거(조립 옵션) / LTL: 예약 배송, 2인 하역 필요.”

---

## 17) 런치 체크리스트(요약)

- 결제/웹훅 시크릿 환경변수, 도메인/SSL, 이미지 CDN, 로봇/사이트맵, 404/500 페이지  
- 보안 헤더(CSP, HSTS, X‑Frame‑Options), 로그/알람(Slack/Webhook)  
- 테스트 주문(승인/실패/취소/환불), 반품 포털 실제 픽업 예약 연동  
- 성능 목표: LCP < 2.5s(4G), CLS < 0.1, TBT < 200ms, Lighthouse ≥ 95

---

## 18) 흔한 함정 & 피하는 법

- **변형=별도 상품**로 쪼개기: SEO/분산 위험. 변형은 단일 PDP 내 라우팅(색/마감)으로 유지, canonical 전략 적용.  
- **이미지 용량 과대**: lifestyle 1–2장만 critical, 나머지 lazy. 3D는 선택 로딩.  
- **ETA 불명확**: “재고 있음”만 표기 금지. 날짜 범위(10–14일)로 구체화.  
- **장바구니→결제 강제 로그인**: 게스트 기본으로.  
- **리뷰 조작 의심**: 포토 리뷰 비율 목표(≥30%) 제시, ‘구매 인증’ 배지.

---

### 바로 다음 단계
1) 위 **Codex 프롬프트**로 스캐폴딩 생성 →  
2) `.env` 채우고 `prisma migrate/seed` →  
3) PDP 3D/ETA/스와치/치수표 작동 확인 →  
4) 결제/웹훅/반품 포털 연결 →  
5) 성능/접근성/플로우 QA 후 A/B 테스트 시작.
