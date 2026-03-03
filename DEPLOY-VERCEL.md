# Deploy DataBangkim ke Vercel

## Cara 1: Import dari GitHub (Paling Mudah)

1. Buka [vercel.com/new](https://vercel.com/new)
2. Klik **"Import Git Repository"**
3. Pilih repo `subkhanibnuaji/databangkim`
4. Settings akan terdeteksi otomatis dari `vercel.json`:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Install Command**: `npm ci`
5. Klik **"Deploy"**
6. Tunggu build selesai — site live di `databangkim.vercel.app`

Setiap push ke branch `main` akan otomatis trigger deployment baru.

## Cara 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (dari root project)
cd databangkim
vercel deploy

# Deploy ke production
vercel deploy --prod
```

## Cara 3: Vercel CLI One-liner

```bash
npx vercel deploy --prod
```

## Environment Variables

Tidak ada environment variable yang dibutuhkan.
Project ini murni static/client-side.

## Custom Domain (Opsional)

Setelah deploy, bisa tambah custom domain:

1. Buka project di Vercel Dashboard
2. Settings > Domains
3. Tambahkan domain, misal: `data.bangkim.id`
4. Ikuti instruksi DNS yang diberikan Vercel

## Perbedaan dengan GitHub Pages

| | Vercel | GitHub Pages |
|---|---|---|
| URL | `databangkim.vercel.app` | `subkhanibnuaji.github.io/databangkim/` |
| basePath | Tidak perlu | `/databangkim` |
| Build | Server-side Next.js | Static export (`output: 'export'`) |
| Deploy | Auto dari push | Auto dari push (via Actions) |
| Custom Domain | Gratis | Gratis |
| Edge Network | Global CDN | GitHub CDN |

Kedua metode deploy tetap didukung bersamaan. File `next.config.ts` otomatis mendeteksi target deploy via environment variable `DEPLOY_TARGET`.
