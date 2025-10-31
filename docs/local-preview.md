# 로컬 미리보기 가이드

## 0. 원클릭 시작/종료 스크립트
- 시작: `bash furniture-shop/scripts/dev-start.sh`
- 종료: `bash furniture-shop/scripts/dev-stop.sh`
  - 최초 실행 전 `chmod +x furniture-shop/scripts/dev-start.sh furniture-shop/scripts/dev-stop.sh`을 한 번 수행하세요.
  - 로그 경로: `furniture-shop/tmp/dev-server.log`
  - PID 파일: `furniture-shop/tmp/dev-server.pid`

## 1. 의존성 설치
```bash
cd furniture-shop
pnpm install
```
> `pnpm`이 없다면 `corepack enable`로 활성화하거나 `npm install -g pnpm`으로 설치하세요.

## 2. Prisma 설정
```bash
cd apps/web
pnpm prisma generate
pnpm prisma migrate dev --name init
pnpm prisma db seed
```
- `.env`의 `DATABASE_URL` 기본값은 SQLite(`file:./prisma/dev.db`)입니다. 필요 시 Postgres URL로 교체하세요.
- `pnpm prisma migrate dev`는 `prisma/migrations` 폴더와 `prisma/dev.db` 파일을 생성합니다.

## 3. 환경 변수
`apps/web/.env.example`을 복사해 `.env`를 만들고 Stripe/Shipping 키를 입력합니다.
```bash
cp .env.example .env
```
필수 변수:
- `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`
- `TYPESENSE_API_KEY`, `TYPESENSE_HOST`
- `SHIPPING_API_BASE_URL`, `SHIPPING_API_KEY`

## 4. 개발 서버 실행
```bash
pnpm dev
```
- 기본 주소: http://localhost:3000
- 홈 → 카테고리/검색 → PDP → 장바구니 → 체크아웃(주소/배송/결제) 순으로 플로우를 확인할 수 있습니다.
- Stripe Payment Element는 자리표시자로 남아 있으므로 실제 결제는 Stripe CLI와 연동 후 진행하세요.

## 5. 추가 팁
- `pnpm test`로 유틸 단위 테스트를 실행할 수 있습니다.
- `pnpm lint`, `pnpm typecheck`를 실행해 코드 품질을 검증하세요.
- Vercel 배포 시 `pnpm build`로 사전 검증 후 배포합니다.
- Playwright E2E 실행 시 포트가 3000이 아닐 경우 `PLAYWRIGHT_BASE_URL=http://localhost:3001 pnpm e2e` 같이 환경 변수를 지정하면 자동으로 해당 포트를 사용합니다.
