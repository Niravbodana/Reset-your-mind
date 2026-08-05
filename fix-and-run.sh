#!/bin/bash
# RIZN — purana code hata ke latest chalao (Mac/Linux)
set -e

echo "=== RIZN fix-and-run ==="

# Repo root (script lives here)
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

echo "1) Purane servers band..."
lsof -ti:3000 2>/dev/null | xargs kill -9 2>/dev/null || true
docker compose down 2>/dev/null || true
docker stop humsafar-web rizn-web 2>/dev/null || true
docker rm humsafar-web rizn-web 2>/dev/null || true

echo "2) Local changes reset + latest pull..."
git fetch origin
git checkout cursor/saathly-website-9e8a
git reset --hard origin/cursor/saathly-website-9e8a

echo "3) Version check..."
NAME=$(node -p "require('./saathly/package.json').name")
if [ "$NAME" != "rizn" ]; then
  echo "ERROR: Abhi bhi purana package.json hai (name=$NAME). Git pull fail hua."
  exit 1
fi
echo "   OK — package name: $NAME"

echo "4) Fresh install..."
cd saathly
rm -rf node_modules .next
npm install

echo ""
echo "=== READY ==="
echo "Ab ye command chalao:"
echo "  cd $ROOT/saathly && npm run dev"
echo ""
echo "Browser: http://localhost:3000"
echo "Confirm: Logo RIZN hona chahiye, npm run dev me 'rizn@0.1.0' dikhe"
echo ""
read -p "Abhi npm run dev start karun? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  npm run dev
fi
