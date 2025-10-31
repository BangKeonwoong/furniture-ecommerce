# Content Population Roadmap

## Seed Data Expansion
- ✅ Prisma 시드에 Seating/Bedroom/Dining 대표 상품을 추가.
- ✅ 제품별 리뷰/질문 샘플 데이터를 추가해 PDP UGC 영역 검증.
- [ ] 카테고리별 3D/AR 파일 경로 수집 후 `attributes`에 메타데이터 저장.
- [ ] 컬렉션 스토리카드(룩북) 데이터를 CMS 또는 JSON으로 분리.

- ## QA 체크리스트 (데이터 기준)
- [x] `pnpm prisma db seed` 실행 후 `/category/:slug`에 모든 상품이 노출되는지 확인.
- [x] `/search`에서 좌석/침실/다이닝 키워드로 검색 시 결과가 나오고, 없는 경우 대비 메시지가 노출되는지 확인.
- [x] PDP 갤러리 이미지가 자리표시자 또는 실물 이미지로 정상 렌더링되는지 확인.
- [x] PDP 리뷰/질문 샘플이 표시되고 평균 평점이 반영되는지 확인.
- [x] 장바구니 → 체크아웃까지 새 시드 데이터가 pricing/ETA에 반영되는지 검증.
- [x] 체크아웃 단계에서 주소→배송→결제 순 흐름이 스트라이프/배송 API 스텁과 정상 통신하는지 확인.

## Backlog
- [ ] 다국어/다중 통화 지원을 위한 가격/설명 문자열 구조화.
- [ ] CMS 연동 시 Prisma와의 싱크 전략 수립 (webhooks or scheduled sync).
- [ ] 물류 파트너 API 연동 시 배송 옵션 자동화 로직 설계.
