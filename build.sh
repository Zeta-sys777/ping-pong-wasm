#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DIST_DIR="$ROOT_DIR/dist"

mkdir -p "$DIST_DIR"

if ! command -v emcc >/dev/null 2>&1; then
  echo "emcc not found. Install Emscripten and activate its environment first." >&2
  exit 1
fi

emcc "$ROOT_DIR/src/main.cpp" \
  -O2 \
  -s USE_SDL=2 \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s ENVIRONMENT=web \
  -s EXPORTED_RUNTIME_METHODS='["ccall","cwrap","callMain"]' \
  -o "$DIST_DIR/index.html" \
  --shell-file "$ROOT_DIR/web/shell.html"

cp "$ROOT_DIR/web/style.css" "$DIST_DIR/style.css"

if [ ! -f "$ROOT_DIR/web/config.js" ]; then
  cp "$ROOT_DIR/web/config.example.js" "$ROOT_DIR/web/config.js"
fi

cp "$ROOT_DIR/web/config.js" "$DIST_DIR/config.js"
cp "$ROOT_DIR/web/app.js" "$DIST_DIR/app.js"

echo "Build complete: $DIST_DIR/index.html"
