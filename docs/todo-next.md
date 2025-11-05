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

## 우선순위 1 — 신규: 회원가입/로그인 기능 구축
- [ ] 요구사항 및 UX 플로우 확정 (`docs/auth-roadmap.md` 기반).
  - [x] 이메일 기반 회원가입/로그인·SNS 여부·비밀번호 재설정 범위 확정.
  - [x] 로그인→장바구니/결제 연계, 회원가입 후 `/account` 리디렉션 UX 정의.
  - [x] 보안 정책(비밀번호 규칙, 잠금, rate limit, 감사 로그) 확정.
  - [x] 개인정보/이용약관 안내, 계정 삭제/동의 관리 플로우 초안.
- [ ] Prisma 스키마에 `User`/`Session` 모델 추가 및 마이그레이션.
  - [x] User/Session/VerificationToken 필드 요구사항 정리.
  - [x] Prisma 스키마에 모델 추가 (User/Session/VerificationToken) 및 enum 정의.
  - [x] Prisma 마이그레이션 생성 & SQLite 샌드박스에 적용.
  - [ ] Seed 데이터(테스트 계정, 세션) 작성.
- [ ] 비밀번호 해시 유틸, 세션/JWT 전략 결정 및 서버 라우트 초안 구현.
- [ ] CSRF 방어, rate limit, 감사 로그 등 보안 미들웨어 구성.
- [ ] `/signup`, `/login` 페이지와 인증 헤더 UX 제작.
- [ ] 보호 페이지(예: `/account`)에 인증 가드 적용.
- [ ] Auth 관련 Playwright/단위 테스트 및 보안 점검 체크리스트 작성.
- [ ] `.env`에 세션 시크릿/SMTP 등 환경 변수 정의.
- [ ] 개인정보 처리방침/이용약관 업데이트 및 계정 삭제/동의 관리 플로우 설계.
- [ ] 운영 관측(로그/알림) 구성 및 장애 대응 플레이북 확정.
- [ ] 배송/결제 API 라우터에 Sentry(또는 Pulse) 연동.

## 우선순위 2
- [ ] 3D/AR 메타데이터 채우고 컬렉션 스토리카드 JSON 구조화 (`docs/content-population.md`).
- [ ] Postgres 마이그레이션 초안 생성 (`docs/postgres-migration-plan.md` 참고).
- [ ] CI 파이프라인에서 `pnpm --filter web test:unit` + `pnpm e2e` 실행 및 trace 업로드 구성.
- [x] Husky pre-commit 훅으로 `pnpm lint && pnpm test:unit` 자동 실행.

## 우선순위 3
- [ ] 모바일 spacing/sticky CTA 미세 조정 완료 (`docs/backlog-summary.md` 후속).
- [ ] Figma/이미지 에셋 수급 후 히어로·카테고리 이미지를 실소스로 교체.
