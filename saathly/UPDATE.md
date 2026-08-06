# Update / fix local install

## Tum already `saathly` folder mein ho?

Terminal me `saathly %` dikhe to **sirf ye chalao** (no `cd saathly`):

```bash
git fetch origin && git reset --hard origin/cursor/saathly-website-9e8a
rm -rf node_modules .next && npm install && npm run dev
```

## Tum repo root (`Reset-your-mind`) mein ho?

```bash
git fetch origin && git reset --hard origin/cursor/saathly-website-9e8a
cd saathly && rm -rf node_modules .next && npm install && npm run dev
```

---

## Purana Humsafar / git pull fail?

Local `package.json` changes block pull. `git reset --hard` fixes it.

| Check | Sahi |
|-------|------|
| `grep '"name"' package.json` | `"rizn"` |
| npm output | `rizn@0.1.0 dev` |
| Theme | Black + gold, RIZN logo |

---

## Browser

1. Incognito window — http://localhost:3000
2. Hard refresh: `Cmd+Shift+R`

---

## Docker (optional, from repo root)

```bash
git fetch origin && git reset --hard origin/cursor/saathly-website-9e8a
RIZN_ADMIN_PASSWORD=your-secret docker compose build --no-cache
docker compose up
```

Image: `rizn:latest` (not `humsafar`).
