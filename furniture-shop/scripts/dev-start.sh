#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APP_DIR="$ROOT_DIR/apps/web"
TMP_DIR="$ROOT_DIR/tmp"
PID_FILE="$TMP_DIR/dev-server.pid"
LOG_FILE="$TMP_DIR/dev-server.log"

mkdir -p "$TMP_DIR"

if [ -f "$PID_FILE" ]; then
  PID="$(cat "$PID_FILE")"
  if ps -p "$PID" > /dev/null 2>&1; then
    echo "✅ 개발 서버가 이미 실행 중입니다 (PID: $PID)."
    echo "   로그: $LOG_FILE"
    exit 0
  else
    rm -f "$PID_FILE"
  fi
fi

cd "$APP_DIR"

if [ ! -d "node_modules" ]; then
  echo "📦 의존성을 설치합니다 (pnpm install)..."
  pnpm install
fi

if [ ! -f "prisma/dev.db" ]; then
  echo "🗃️  Prisma 마이그레이션 및 시드를 실행합니다..."
  pnpm prisma migrate dev --name init --skip-seed || true
  pnpm prisma db seed || true
fi

echo "🚀 개발 서버를 실행합니다..."
# 백그라운드 실행
pnpm dev > "$LOG_FILE" 2>&1 &
SERVER_PID=$!
echo "$SERVER_PID" > "$PID_FILE"

sleep 2
if ps -p "$SERVER_PID" > /dev/null 2>&1; then
  BASE_URL=""
  for _ in {1..15}; do
    if [ -f "$LOG_FILE" ]; then
      FOUND_URL=$(grep -Eo "http://localhost:[0-9]+" "$LOG_FILE" | tail -n1 || true)
      if [ -n "$FOUND_URL" ]; then
        BASE_URL="$FOUND_URL"
        break
      fi
    fi
    sleep 1
  done

  if [ -z "$BASE_URL" ]; then
    BASE_URL="http://localhost:3000"
  fi

  PLAYWRIGHT_ENV_FILE="$APP_DIR/.env.local-playwright"
  echo "PLAYWRIGHT_BASE_URL=$BASE_URL" > "$PLAYWRIGHT_ENV_FILE"
  echo "$BASE_URL" > "$TMP_DIR/playwright-base-url"

  echo "✅ 개발 서버가 실행 중입니다 (PID: $SERVER_PID)."
  echo "   $BASE_URL 에 접속하세요."
  echo "   Playwright 환경 변수 파일: $PLAYWRIGHT_ENV_FILE"
  echo "   로그는 $LOG_FILE 에 기록됩니다."
else
  echo "❌ 서버 실행에 실패했습니다. 로그를 확인하세요: $LOG_FILE"
  rm -f "$PID_FILE"
  exit 1
fi
