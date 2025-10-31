# PG 샌드박스 키 수급 체크리스트

국내 PG(아임포트, 토스페이먼츠, KG이니시스) 샌드박스를 준비하기 위한 절차를 정리했습니다. 실제 계정 신청 및 키 발급 후 `.env`에 값을 채워 넣고, `docs/integration-notes.md`를 최신화하세요.

## 공통 준비 사항
- [ ] 사업자 및 담당자 기본 정보 정리 (사업자등록증 사본, 대표자/담당자 연락처, 이메일).
- [ ] 테스트 결제 확인용 콜백 URL (예: `https://localhost/checkout/webhook`) 명세.
- [ ] 결제 성공/실패/취소 시나리오 정의 및 QA 환경 도메인 확보.

## 아임포트 (Iamport)
1. [아임포트 테스트 계정 신청 페이지](https://guide.iamport.kr/643fc9b65edbc3) 접속.
2. 샌드박스 계정 신청 후 `imp_key`, `imp_secret`, 가맹점 식별코드 확인.
3. 대시보드에서 웹훅/리디렉션 URL을 QA 도메인으로 설정.
4. 발급된 키를 `.env`에 주입:
   ```env
   PG_PROVIDER="iamport"
   PG_API_KEY="imp_key"
   PG_API_SECRET="imp_secret"
   PG_MERCHANT_ID="가맹점코드"
   PG_JS_SDK_CLIENT_KEY="imp_key"
   ```
5. 승인/취소 API 호출 시 필요한 추가 필드 (`merchant_uid`, `payment_id` 등) 확인 후 서버 로직 보강.

## 토스페이먼츠 (TossPayments)
1. [토스페이먼츠 샌드박스 신청 안내](https://docs.tosspayments.com/resources/sandbox) 확인.
2. `test_client_key`, `test_secret_key`, 상점 ID를 발급받아 저장.
3. 테스트 카드/계좌 번호와 응답 코드 케이스를 문서화.
4. `.env` 예시:
   ```env
   PG_PROVIDER="tosspayments"
   PG_API_KEY="test_secret_key"
   PG_API_SECRET="test_client_key"
   PG_MERCHANT_ID="상점ID"
   PG_JS_SDK_CLIENT_KEY="test_client_key"
   ```
5. 리디렉션 URL/웹훅 시그니처 검증 방식(HMAC 등)을 문서에 추가.

## KG이니시스
1. KG이니시스 영업 담당자 또는 [테스트 계정 안내 페이지](https://manual.inicis.com/pg/paytest) 통해 계정 신청.
2. `mid`, `signKey`, `clientKey` 등 필수 키 확보.
3. 빌링(정기결제) 여부를 사전 결정하여 추가 서류 확인.
4. `.env` 예시:
   ```env
   PG_PROVIDER="inicis"
   PG_API_KEY="signKey"
   PG_API_SECRET="clientKey"
   PG_MERCHANT_ID="mid"
   PG_JS_SDK_CLIENT_KEY="clientKey"
   PG_WEBHOOK_SECRET="선택적으로 제공되는 검증 키"
   ```
5. SHA256 서명 생성 규칙 및 승인/취소 API 명세를 `docs/integration-notes.md`에 옮겨두기.

## 후속 작업 체크
- [ ] 키 발급 후 `.env`와 `.env.example` 갱신.
- [ ] `docs/integration-notes.md`에 실제 API 엔드포인트 및 인증 방식 반영.
- [ ] Playwright 스모크 테스트에 실 키 기반 승인 플로우(또는 모킹 전략) 문서화.
- [ ] 백오피스/OMS 등 외부 연동에 필요할 수 있는 필드 목록 정리.
