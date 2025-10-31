# TODO — 2025-03-16

## 완료
- [x] 커스텀 훅(`useVariantSelection`)으로 변형 선택 로직 분리.
- [x] Checkout 주소 단계 네비게이션을 `useRouter` 기반 전환으로 교체.
- [x] Playwright `baseURL`을 `PLAYWRIGHT_BASE_URL` 환경 변수로 설정.

## 우선순위 1
- [x] `scripts/dev-start.sh`에서 현재 포트를 감지해 `PLAYWRIGHT_BASE_URL` 또는 `.env.local-playwright`를 자동 생성.
- [x] Playwright 스모크에 품절/중복 담기/결제 성공 리디렉션 시나리오 추가.
- [ ] 국내 PG(아임포트/토스페이먼츠 등) 샌드박스 키 수급 후 `.env` 및 `docs/integration-notes.md` 업데이트.
  - [x] `.env`, `.env.example`, `docs/integration-notes.md`에 샌드박스 변수 가이드를 반영.
  - [x] `docs/pg-sandbox-checklist.md`에 키 수급 절차와 후속 작업 체크리스트 작성.
  - [ ] 샌드박스 계정/키 실제 발급 및 값 주입.
- [ ] PG 결제 승인/취소 플로우에 맞춰 `/app/api/checkout` 라우트 및 프런트 결제 단계를 리팩터링.
  - [x] Stripe 전용 `create-intent` 엔드포인트를 국내 PG용 `create-payment` 구조로 교체.
  - [x] 결제 스토어를 `paymentSession` 기반으로 개편하고 결제 페이지 UI를 국내 PG 흐름에 맞게 조정.
  - [x] 승인/취소 API 라우트를 분리하고 모의 승인 플로우를 구현.
  - [x] 아임포트 REST API(토큰 발급/prepare/승인 조회/취소) 연동 로직 초안 추가.
  - [ ] 토스페이먼츠/KG이니시스 REST 연동 및 승인·취소 로직 구현.
    - [x] `docs/pg-provider-expansion.md`로 요구사항 정리 및 코드 스텁/환경변수 예시 추가.
  - [x] 프런트 결제 위젯(`IMP.request_pay` 등)과 승인 라우트 파라미터 연동.
  - [x] Next.js typed routes에 맞춰 주요 `Link` href 정리 (헤더/푸터/홈/체크아웃).
  - [x] Prisma 쿼리 타입(variants/reviews include) 및 데이터 헬퍼 정리로 `pnpm typecheck` 통과시키기.
  - [x] Playwright 스모크에 PG 모의 응답/리디렉션 검증 추가.
- [x] 헤더/푸터 목적지 404 방지를 위해 `/services`, `/policies/*`, `/about`, `/trade`, `/newsletter` 등 플레이스홀더 페이지 추가.
- [ ] 새로 추가한 정적 페이지에 실제 콘텐츠(요금, 정책, 양식)를 보강하고 콘텐츠 팀과 리뷰.
- [ ] 배송/결제 API 라우터에 Sentry(또는 Pulse) 연동.

## 우선순위 2
- [ ] 3D/AR 메타데이터 채우고 컬렉션 스토리카드 JSON 구조화 (`docs/content-population.md`).
- [ ] Postgres 마이그레이션 초안 생성 (`docs/postgres-migration-plan.md` 참고).
- [ ] CI 파이프라인에서 `pnpm --filter web test:unit` + `pnpm e2e` 실행 및 trace 업로드 구성.
- [x] Husky pre-commit 훅으로 `pnpm lint && pnpm test:unit` 자동 실행.

## 우선순위 3
- [ ] 모바일 spacing/sticky CTA 미세 조정 완료 (`docs/backlog-summary.md` 후속).
- [ ] Figma/이미지 에셋 수급 후 히어로·카테고리 이미지를 실소스로 교체.
