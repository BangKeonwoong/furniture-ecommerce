# Developer Tooling Checklist

- [ ] Node.js 18.18.x (`nvm install 18.18.2 && nvm use`)
- [ ] pnpm 8.x (`corepack enable` 권장)
- [ ] Prisma CLI (`pnpm dlx prisma -v` 확인)
- [ ] Stripe CLI (테스트 웹훅 검증용)
- [ ] Typesense CLI 또는 대체 검색 에뮬레이터 (선택)
- [ ] Docker Desktop (Postgres/Redis 컨테이너 실행 시)
- [ ] VS Code + 확장: ESLint, Tailwind CSS IntelliSense, Prisma, i18n Ally
- [ ] Browserslist 테스트용 Chrome/Edge 최신 버전, Safari 16+
- [ ] Playwright 모바일 스모크 실행: `pnpm e2e` (iPhone SE 프로필 포함)
- [ ] Vitest 단위 테스트 실행: `pnpm --filter web test:unit`
