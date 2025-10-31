# Furniture Shop Web App

이 저장소는 고급 가구 이커머스 경험을 구축하기 위한 프로젝트 기반입니다. 상세한 비전과 운영 전략은 `church-website-program-plan.md` 및 `furniture-site-build-plan.md`를 참고하세요.

## 기술 스택 개요
- **Framework**: Next.js (App Router) + TypeScript
- **UI**: Tailwind CSS, headless UI 패턴, `next/image`
- **데이터 계층**: Prisma ORM + SQLite(기본) / Postgres(운영 전환 예정)
- **검색**: Typesense/Algolia (초기에는 모의 구현)
- **결제**: Stripe Payment Intent + Payment Element (Apple Pay / Google Pay / Link 지원)
- **미디어**: Cloudinary/Imgix(이미지), Mux(비디오/360), `@google/model-viewer`(3D)
- **호스팅/인프라**: Vercel, Edge Functions, Redis 캐시 레이어
- **관측성**: Sentry, GA4(+서버 사이드 이벤트 포워딩), Logflare/DataDog

## 개발 환경 요구사항
- Node.js 18.x (권장: 18.18.2) — `.nvmrc` 제공 예정
- 패키지 매니저: pnpm 8.x
- 추가 도구: Prisma CLI, Stripe CLI(웹훅 디버깅용), Typesense CLI(옵션)
- Lint/Format: ESLint, Prettier; Testing: Vitest + Testing Library, Playwright(E2E)

## 문서
- `furniture-site-build-plan.md`: 단계별 구현 계획
- `docs/scope-and-kpis.md`: 프로젝트 범위와 성공 지표
- `docs/content-population.md`: 시드 데이터/QA 체크리스트
- 추후 `/docs` 디렉터리에 운영·통합 가이드 추가 예정

## 테스트·QA 실행
- `pnpm lint` / `pnpm typecheck` / `pnpm test` (Vitest) / `pnpm e2e` (Playwright 설치 후)
- 원클릭 스크립트: `bash furniture-shop/scripts/dev-start.sh`, `bash furniture-shop/scripts/dev-stop.sh`, `bash furniture-shop/scripts/dev-test.sh`
- 수동 QA 체크리스트는 `docs/qa-notes.md`, 로그는 `docs/analytics-qa-log.md` 참고
