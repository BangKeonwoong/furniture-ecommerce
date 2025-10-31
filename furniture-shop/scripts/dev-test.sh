#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APP_DIR="$ROOT_DIR/apps/web"

cd "$APP_DIR"

if [ ! -d "node_modules" ]; then
  echo "📦 의존성을 먼저 설치하세요 (pnpm install)."
  exit 1
fi

pnpm lint || true
pnpm typecheck || true
pnpm test || true
# E2E 테스트는 dev 서버 실행이 필요하므로 안내만 출력
if pgrep -f "pnpm dev" > /dev/null; then
  pnpm test:e2e || true
else
  echo "ℹ️ E2E 테스트는 개발 서버 실행 후 'pnpm test:e2e'로 수동 실행하세요."
fi
