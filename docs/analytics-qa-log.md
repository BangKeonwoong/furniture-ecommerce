# QA Log — 2025-03-16

## Summary
- Seeded 카테고리(PDP, 검색, 체크아웃) 전반 수동 테스트 수행.
- Stripe/Shipping API 스텁 호출 시 로그가 콘솔로 출력돼 추적이 가능함.

## Checks
- [x] /category/seating → Orion/Luna 상품 노출, 배송/ETA 배지 확인.
- [x] /category/bedroom → Aeris 상품 노출.
- [x] /product/orion-modular-sofa → 갤러리 스와치·치수·CTA 작동.
- [x] /search?q=sofa → 검색 결과 + 로딩 스켈레톤 확인.
- [x] /checkout → 요약 금액, 배송 스텁 응답, client secret 자리표시자 확인.
- [x] 모바일(375px)에서 헤더/플로팅 CTA 동작 (`pnpm e2e`, 2025-03-16 22:47).
- [x] `pnpm --filter web test:unit` → ProductConfigurator, clearance, ETA, unit 변환 유틸 10개 테스트 통과.
- [x] Playwright 스모크 → 품절 스와치 비활성, 수량 증가(+ 버튼), 주문 완료 리디렉션 확인 (`pnpm e2e`, 2025-03-16 23:05).

## Notes
- Stripe와 배송 스텁은 현재 콘솔 로그만 출력; 향후 로깅 도구(Sentry/Pulse) 연동 고려.
- Typesense/Algolia 실연동 시 검색 API 대체 필요.
