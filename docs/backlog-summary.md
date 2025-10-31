# Backlog Summary — Sprint Prep

## Outstanding Blockers
- Playwright 브라우저/의존성 설치 대기 (현재는 DevTools 모바일 시뮬레이터로 수동 QA 진행).
- 국내 PG(아임포트/토스페이먼츠 등) 샌드박스 키 미확보.
- Typesense API 키 미확보.
- 디자인 산출물(Figma, 이미지, 3D 모델) 전달 대기.

## Next Sprint Objectives
1. **모바일 QA 개선**
   - ✅ 375px 뷰 헤더/정렬 CTA/체크아웃 플로팅 CTA 자동화 (`tests/e2e/mobile-layout.spec.ts`)
   - 남은 과제: 모바일 전용 spacing 보완, sticky CTA 오버레이 세부 조정
2. **체크아웃 상태 공유**
     - 주소/배송 옵션/결제 client secret을 전역 저장 및 복원
     - Zustand persist 또는 URL 파라미터/서버 액션 전략 결정
3. **실 연동 준비**
   - 국내 PG 선정 및 API 키 확보 → `.env`/`integration-notes` 업데이트
   - PG 결제 승인/취소 흐름에 맞춰 `/app/api/checkout` 라우트 리팩터링
   - Logging/Sentry 스텁 추가
4. **테스트 자동화**
   - ✅ ProductConfigurator 장바구니/스와치 플로우 단위 테스트 (`src/components/__tests__/product-configurator.test.tsx`)
   - Playwright 설치 가능 시 스모크 테스트 구현
   - 모바일/데스크톱 뷰포트 기본 E2E 작성

## Dependencies / Notes
- Postgres 전환은 `docs/postgres-migration-plan.md` 참고.
- QA 로그는 `docs/analytics-qa-log.md`, 체크리스트는 `docs/qa-notes.md` 유지.
