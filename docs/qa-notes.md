# QA Notes (2025-03-16)

- [x] /category/seating: 정가/배송 배지가 노출되며, 시드된 Orion/Luna 항목이 2개 이상 표기되는지 확인.
- [x] /category/bedroom: Aeris 상품 카드 이미지/ETA 배지 확인.
- [x] /category/dining: Selene 테이블 노출 및 배송 옵션 확인.
- [x] /product/orion-modular-sofa: 갤러리, 스와치 선택, 치수 테이블, 배송 정보, CTA 고정바 동작.
- [x] /search?q=sofa: Orion/Luna 검색 결과 노출, 로딩/빈 상태 메시지 체크.
- [x] 카트 → /checkout: 요약 금액, 배송 ETA, 스텁 API 호출, client secret 자리표시자 확인.
- [x] 모바일 뷰포트(375px)에서 헤더, 정렬 버튼, 제품 CTA, 체크아웃 플로팅 CTA 동작 (`pnpm e2e` → `tests/e2e/mobile-layout.spec.ts`, 2025-03-16 22:30).
- [x] Playwright 스모크 테스트: 품절 스와치 비활성, 수량 증가(+ 버튼) 후 결제 성공 페이지 리디렉션까지 검증 (`pnpm e2e`, 2025-03-16 22:15 / 재실행 23:05).
- [x] Vitest 단위 테스트: ProductConfigurator 장바구니/스와치 플로우 검증 (`pnpm --filter web test:unit`, 2025-03-16 22:40).
