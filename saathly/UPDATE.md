# ⚠️ PURANA HUMSAFAR DIKH RAHA? — YE EXACT STEPS

## Problem kya hai?

Tumhare terminal me ye error aa raha tha:
```
error: Your local changes to the following files would be overwritten by merge:
  saathly/package.json
```

Isliye **git pull fail** ho raha hai aur tum **purane Humsafar** code pe stuck ho.

Confirm: `npm run dev` me `humsafar@0.1.0` dikhe = PURANA.  
Sahi: `rizn@0.1.0` dikhe = NAYA.

---

## FIX — copy paste karo (ek block me)

```bash
cd ~/Projects/dangerai.com/dangerai.com/aaj-kyabanayein/Reset-your-mind

lsof -ti:3000 | xargs kill -9 2>/dev/null
docker stop humsafar-web rizn-web 2>/dev/null
docker rm humsafar-web rizn-web 2>/dev/null

git fetch origin
git checkout cursor/saathly-website-9e8a
git reset --hard origin/cursor/saathly-website-9e8a

cd saathly
rm -rf node_modules .next
npm install
npm run dev
```

Ya root se script:
```bash
cd ~/Projects/dangerai.com/dangerai.com/aaj-kyabanayein/Reset-your-mind
chmod +x fix-and-run.sh
./fix-and-run.sh
```

---

## Browser

1. **Incognito / Private window** kholo (purana cache hatane ke liye)
2. Open: http://localhost:3000
3. Hard refresh: `Cmd+Shift+R`

Purane tab me recipe app (`/src/App.jsx` 404) dikh raha tha — wo **dusra project ka cache** hai. Incognito use karo.

---

## Sahi version me ye dikhega

| Check | Sahi |
|-------|------|
| npm output | `rizn@0.1.0 dev` |
| Logo | **RIZN** |
| Theme | Black + gold |
| Hero | Badi photo |
| Badge | PREMIUM v2 |
| Docker image | `rizn:latest` (humsafar NAHI) |

Verify command:
```bash
grep '"name"' package.json
# "name": "rizn"
```

---

## Docker (optional)

Pehle npm se confirm karo. Docker ke liye **repo root** se:

```bash
cd ~/Projects/dangerai.com/dangerai.com/aaj-kyabanayein/Reset-your-mind
git reset --hard origin/cursor/saathly-website-9e8a
docker compose down
docker compose build --no-cache
docker compose up
```

Image name `rizn:latest` honi chahiye — `humsafar:latest` = purana code.
