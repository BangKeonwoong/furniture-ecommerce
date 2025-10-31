#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PID_FILE="$ROOT_DIR/tmp/dev-server.pid"

if [ ! -f "$PID_FILE" ]; then
  echo "ℹ️ 실행 중인 개발 서버 PID 파일을 찾을 수 없습니다."
  exit 0
fi

PID="$(cat "$PID_FILE")"
if ps -p "$PID" > /dev/null 2>&1; then
  echo "🛑 개발 서버를 종료합니다 (PID: $PID)..."
  kill "$PID"
  sleep 1
  if ps -p "$PID" > /dev/null 2>&1; then
    echo "⚠️ 정상 종료되지 않아 강제 종료합니다."
    kill -9 "$PID" || true
  fi
  echo "✅ 서버가 종료되었습니다."
else
  echo "ℹ️ PID $PID 에 해당하는 프로세스가 없습니다."
fi

rm -f "$PID_FILE"
