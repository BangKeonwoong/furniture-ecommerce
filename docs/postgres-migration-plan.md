# Postgres Migration Plan

## Motivation
SQLite는 Json, enum, 동시성에 제한이 있어 운영 환경에서는 Postgres로 전환해야 한다. 색인 전략, JSONB, foreign key 제약 등을 강화할 수 있다.

## Steps
1. **스키마 업데이트**
   - `prisma/schema.prisma`에서 datasource provider를 `postgresql`로 교체.
   - `Product.category`, `Variant.status` 등을 enum으로 재변환 (ShippingClass, VariantStatus 복원).
   - JSON 필드(`attributes`, `dimensions`, `boxDims`, `photos`)를 `Json` 타입으로 재전환.
   - 관계 양방향 필드 확인 (Collection ↔ Product).

2. **마이그레이션 생성**
   ```bash
   pnpm prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/init_postgres.sql
   ```
   또는 기존 마이그레이션 삭제 후 `pnpm prisma migrate dev --name init --create-only`.

3. **환경 변수**
   - `.env`를 Postgres URL로 업데이트: `DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB?schema=public"`
   - 개발과 운영을 구분해 `.env.development`, `.env.production` 구성.

4. **배포 파이프라인**
   - 마이그레이션 실행: `pnpm prisma migrate deploy`
   - 시드: `pnpm prisma db seed` (Postgres용 시드에 맞춰 조정 필요.

5. **시드 스크립트 조정**
   - JSON 필드 문자열화 제거.
   - `shippingClass`, `status` 등을 enum 값으로 조정.
   - Postgres용 upsert 전략 고려 (중복 실행 대비).

6. **테스트**
   - QA에서 Postgres DB로 연결해 주요 플로우 (카테고리/검색/PDP/체크아웃) 재검증.
   - 로드/동시성 테스트 필요 시 k6 또는 Artillery 도입 고려.

## Open Questions
- 운영 DB 스키마: 다중 스키마/테이블 파티셔닝 여부.
- Prisma Client 버전 업그레이드 (6.x) 시 호환성 체크.
- 서버리스 환경(Vercel)에서 Postgres 연결 풀 전략 (Prisma Data Proxy, pgBouncer 등).
