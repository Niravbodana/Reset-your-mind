# ⚠️ PURANA VERSION NA CHALAO — YE STEPS FOLLOW KARO

Tumhare screenshot me **Humsafar** (cream/orange) dikh raha hai — wo **purana code** hai.
Naya version **RIZN** (black + gold + photos) hai.

## Step 1: Purana server band karo

```bash
# Jo bhi port 3000 pe chal raha hai band karo
lsof -ti:3000 | xargs kill -9
# Docker ho to:
docker compose down
docker stop rizn-web 2>/dev/null
```

## Step 2: Latest code pull karo

```bash
cd ~/Projects/dangerai.com/dangerai.com/aaj-kyabanayein/Reset-your-mind
git fetch origin
git checkout cursor/saathly-website-9e8a
git pull origin cursor/saathly-website-9e8a
```

## Step 3: Fresh install + run

```bash
cd saathly
rm -rf node_modules .next
npm install
npm run dev
```

Browser me kholo: **http://localhost:3000**

Hard refresh: `Cmd+Shift+R` (Mac) ya `Ctrl+Shift+R` (Windows)

## Step 4: Confirm — ye dikhna chahiye

✅ Logo: **RIZN** (Humsafar NAHI)  
✅ Background: **dark black + gold** (cream/orange NAHI)  
✅ Hero me **badi photo** dikhni chahiye  
✅ Top pe badge: **PREMIUM v2**  
✅ Phone mockup with live notifications  
✅ Before/After photos scroll karke  

## Docker se run karna ho to

```bash
cd Reset-your-mind
docker compose down
docker compose build --no-cache
docker compose up
```

## Agar phir bhi purana dikhe

Galat folder me ho sakte ho. Confirm karo:

```bash
pwd
# Output hona chahiye: .../Reset-your-mind/saathly

grep -r "Humsafar" src/
# Output: kuch nahi aana chahiye (empty)
```

Agar `Humsafar` dikhe = purana code hai, git pull dubara karo.
