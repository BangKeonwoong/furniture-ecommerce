# Backlog Summary — Sprint Prep

## Outstanding Blockers
- 네트워크 제한으로 인한 `pnpm install` / Playwright 브라우저 설치 불가.
- 외부 키(Stripe, Typesense) 미확보로 실 연동 대기.
- 디자인 산출물(Figma, 이미지, 3D 모델) 전달 대기.
- 체크아웃 단계 상태 공유(주소/배송 선택값) 저장 방식 미결정.

## Next Sprint Candidates
1. **모바일 QA**: 375px 뷰에서 헤더, 필터, 체크아웃 CTA 확인 및 개선.
2. **E2E 구성**: Playwright 설치 후 스모크 시나리오 구현.
3. **데이터 확장**: 리뷰/질문 샘플, 3D 모델 메타데이터 추가.
4. **상태 공유**: 체크아웃 단계 데이터를 서버 액션 또는 Zustand persist로 저장.
5. **로깅 연동**: Stripe/Shipping API 스텁 호출을 Sentry/Pulse에 기록.

## Dependencies / Notes
- Postgres 전환은 `docs/postgres-migration-plan.md` 참고.
- QA 로그는 `docs/analytics-qa-log.md`, 체크리스트는 `docs/qa-notes.md` 유지.
