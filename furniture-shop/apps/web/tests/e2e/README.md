# Playwright E2E Tests

현재 Playwright 의존성이 설치되지 않은 환경이므로, 다음 단계 진행 후 스모크 테스트를 작성하세요.

## 설치
```bash
cd furniture-shop/apps/web
pnpm add -D @playwright/test
npx playwright install
```

## 실행
- `pnpm test:e2e` — 기본 스모크 플로우 실행 (테스트 작성 후)
- CI에서 사용할 경우 `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1` 환경변수로 브라우저 캐시 공유 가능

## TODO
- 홈 → 카테고리 → PDP → 카트 → 체크아웃 스모크 시나리오 구현
- 모바일 뷰포트 테스트 (iPhone 13) 추가
- Stripe/배송 API 스텁을 모킹하여 결제 단계 자동화 가능여부 검토
