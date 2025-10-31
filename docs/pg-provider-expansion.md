# 국내 PG 추가 연동 로드맵

토스페이먼츠와 KG이니시스를 아임포트와 동일한 구조로 연결하기 위한 주요 단계입니다. 실제 API 문서는 제공사 포털에서 최신 버전을 확인하세요.

## 토스페이먼츠
1. **환경 변수 정의**
   - `PG_PROVIDER="tosspayments"`
   - `PG_API_KEY`, `PG_API_SECRET` → REST API 시크릿/클라이언트 키
   - `PG_MERCHANT_ID` → 가맹점 ID
   - 필요 시 `PG_JS_SDK_CLIENT_KEY` → 브라우저 위젯 키
2. **서버 라우트 로직**
   - 결제 생성: `POST /v1/payments/confirm` (sandbox에선 승인/취소 통합 엔드포인트 사용) 호출 전 금액/주문 검증.
   - 승인: `pgTransactionId` == `paymentKey`를 사용, `amount`, `orderId` 필수.
   - 취소: `POST /v1/payments/{paymentKey}/cancel`에 사유/금액 전달.
3. **프런트 연동**
   - Checkout JS (`https://pay.tosspayments.com/sdk/js`)를 로드하고 `PaymentWidget` 사용.
   - 승인 성공 후 결제 키(`paymentKey`), 주문 ID, 금액을 `/api/checkout/approve`에 전달.

## KG이니시스
1. **환경 변수 정의**
   - `PG_PROVIDER="inicis"`
   - `PG_API_KEY` → REST `signKey`, `PG_API_SECRET` → `clientKey`
   - `PG_MERCHANT_ID` → `mid`
   - `PG_WEBHOOK_SECRET` 옵션으로 사인 검증 키 저장.
2. **서버 라우트 로직**
   - 승인: `https://iniapi.inicis.com/api/v1/` 하위 승인 API (`/payins/v1/approve`) 호출.
   - 취소: `/payins/v1/cancel` 사용, 사인 생성(sha256) 필요.
   - 요청 파라미터: `mid`, `tid`, `moid`, `price`, `timestamp`, `signature`.
3. **프런트 연동**
   - 웹표준 결제창 스크립트(`https://stdpay.inicis.com/stdjs/INIStdPay.js`) 또는 REST + 자체 UI 선택.
   - 승인 후 `tid`(거래 ID)를 `/api/checkout/approve`에 전달하고 서버에서 서명을 검증.

## 공통 TODO 체크
- [ ] 토스/이니시스 전용 환경 변수와 `.env.example` 안내 추가.
- [ ] `src/lib/payments/pg-client.ts`에 provider별 API 호출 모듈 연결.
- [ ] 프런트 `checkout/payment`에서 PG별 위젯 초기화 분기 처리.
- [ ] 테스트 플로우: Playwright에서 모의 승인/취소 케이스 추가, 서버 라우트 통합 테스트 작성.
- [ ] 문서 업데이트: `docs/integration-notes.md`, `docs/todo-next.md`, 운영 핸드북.
