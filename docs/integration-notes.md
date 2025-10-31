# Integration Notes

## 국내 PG (후보: 아임포트, 토스페이먼츠, KG이니시스)
- 환경 변수 예시:
  - `PG_API_KEY`, `PG_API_SECRET`, `PG_MERCHANT_ID`
  - 결제 모드 분기: `PG_ENV=sandbox|production`
- 샌드박스 셋업 체크리스트:
  1. PG 후보 선택 → 테스트 가맹 신청 (아임포트: https://guide.iamport.kr/643fc9b65edbc3, 토스페이먼츠: https://docs.tosspayments.com/resources/sandbox).
  2. 테스트 상점 ID / REST API 키 / 시크릿 / 자바스크립트 클라이언트 키 확보.
  3. `.env` 또는 `.env.local`에 `PG_PROVIDER`, `PG_ENV`, `PG_API_KEY`, `PG_API_SECRET`, `PG_MERCHANT_ID`, `PG_JS_SDK_CLIENT_KEY` 입력.
  4. 웹훅(승인/취소) 서명 키가 별도로 제공되면 `PG_WEBHOOK_SECRET`에 저장하고, 동일 키를 Vercel/서버리스 환경에도 주입.
  5. 세부 절차는 `docs/pg-sandbox-checklist.md`, `docs/pg-provider-expansion.md` 참고.
- 개발 단계:
  - PG 샌드박스 계정 발급 후 결제창 호출 → 인증 → 승인 흐름을 문서화.
  - `/app/api/checkout/create-payment`으로 결제 요청을 생성하고, `approve`/`cancel` 라우트에서 승인·취소를 처리.
  - 아임포트: `/users/getToken` → `/payments/prepare` → (프런트 승인 후) `/payments/{imp_uid}` 조회 → `/payments/cancel` 흐름을 구현함.
  - 프런트: `checkout/payment`에서 아임포트 스크립트를 로드해 `IMP.request_pay` 실행 → 응답의 `imp_uid`를 `approve` 라우트에 전달.
  - 토스페이먼츠/KG이니시스: `docs/pg-provider-expansion.md`에 명시한 승인/취소 REST 엔드포인트로 확장 예정.
  - 테스트 카드/계좌 번호를 `.env.example`에 안내.
- 실 서비스:
  - PG에서 제공하는 결제 위젯 또는 팝업 스크립트를 `checkout/payment` 단계에 삽입.
  - 승인 콜백/웹훅을 수신해 `/checkout/success/[orderId]`로 리디렉션 및 주문 상태 업데이트.
  - 부분 취소/영수증 발급 시나리오를 백엔드 큐(OMS, 이메일)와 연동.

## Shipping Quote Stub
- 엔드포인트: `POST /app/api/shipping/quote`.
- 요청: `{ postalCode, shippingClass }`.
- 응답: 화이트글러브/LTL 옵션과 ETA, 비용. 실제 연동 시 배송 파트너 API 키(`SHIPPING_API_BASE_URL`, `SHIPPING_API_KEY`)로 대체.

## TODO
- 국내 PG 결제 승인/취소 API와 장바구니 금액 반영 로직 연결.
- 배송 견적 API 응답을 `checkout/shipping` 단계에 실시간 반영.
- 주문 제출 시 백오피스/OMS 연동 및 이메일 발송 큐 연결.
- PG/Typesense API 키 확보 후 `.env` 업데이트 및 문서화.
- Playwright 설치 시 네트워크 접근 허용 필요 (E2E 자동화 준비, 설치 전까지 DevTools 시뮬레이터로 모바일 뷰 QA).
