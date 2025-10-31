# Integration Notes

## Stripe
- 환경 변수: `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`.
- 개발 단계에서는 Stripe CLI로 웹훅 터널링 후 `/app/api/checkout/create-intent`를 호출해 `clientSecret`을 획득.
- 실 서비스: Payment Element를 `checkout/payment` 단계에 삽입하고, 결제 성공 시 `/checkout/success/[orderId]`로 리디렉션.

## Shipping Quote Stub
- 엔드포인트: `POST /app/api/shipping/quote`.
- 요청: `{ postalCode, shippingClass }`.
- 응답: 화이트글러브/LTL 옵션과 ETA, 비용. 실제 연동 시 배송 파트너 API 키(`SHIPPING_API_BASE_URL`, `SHIPPING_API_KEY`)로 대체.

## TODO
- Stripe Payment Intent 생성 후 장바구니 금액 반영 로직 연결.
- 배송 견적 API 응답을 `checkout/shipping` 단계에 실시간 반영.
- 주문 제출 시 백오피스/OMS 연동 및 이메일 발송 큐 연결.
- Stripe/Typesense API 키 확보 후 `.env` 업데이트 및 문서화.
- Playwright 설치 시 네트워크 접근 허용 필요 (E2E 자동화 준비).
