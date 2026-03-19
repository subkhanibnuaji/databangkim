# DEPLOYMENT RULES — WAJIB DIBACA SEBELUM COMMIT

> **PENTING**: File ini berisi aturan deployment yang WAJIB diikuti oleh semua AI/LLM/developer yang bekerja di repository ini. Pelanggaran aturan ini akan menyebabkan deployment BLOCKED atau ERROR di Vercel.

---

## 1. GIT IDENTITY — WAJIB SEBELUM COMMIT

```bash
# SELALU set git identity SEBELUM membuat commit apapun:
git config user.name "Subkhan Ibnu Aji"
git config user.email "cimolcihuy3@gmail.com"
```

**ALASAN**: Vercel Hobby plan HANYA mengizinkan deployment dari user yang terdaftar. Jika commit menggunakan email lain (misalnya `user@example.com`), deployment akan **BLOCKED** dengan error:
> "The Deployment was blocked because there was no git user associated with the commit."

**JANGAN PERNAH** commit dengan email selain `cimolcihuy3@gmail.com`.

---

## 2. NEXT.CONFIG — WAJIB ADA KEDUA SETTING INI

Setiap file `next.config.ts` / `next.config.js` / `next.config.mjs` **WAJIB** memiliki:

```typescript
const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  // ... config lainnya
};
```

**ALASAN**: Tanpa setting ini, Vercel akan GAGAL build jika ada TypeScript error atau ESLint warning sekecil apapun. Kedua setting ini memastikan build selalu berhasil.

**JANGAN PERNAH** menghapus kedua setting ini.

---

## 3. NODE.JS VERSION

Jika ada `engines` di `package.json`, pastikan menggunakan versi yang didukung Vercel:

```json
{
  "engines": {
    "node": ">=20.x"
  }
}
```

**JANGAN** gunakan Node 18.x (sudah discontinued di Vercel).

---

## 4. USE CLIENT + METADATA CONFLICT

**JANGAN** menggabungkan `"use client"` dengan `export const metadata` di file yang sama:

```typescript
// ❌ SALAH - Akan error di build
"use client";
export const metadata = { title: "..." };

// ✅ BENAR - Pisahkan ke layout.tsx
// page.tsx → "use client" + komponen interaktif
// layout.tsx → metadata export
```

---

## 5. CHECKLIST SEBELUM PUSH

- [ ] Git user.name = "Subkhan Ibnu Aji"
- [ ] Git user.email = "cimolcihuy3@gmail.com"
- [ ] `next.config` punya `typescript.ignoreBuildErrors: true`
- [ ] `next.config` punya `eslint.ignoreDuringBuilds: true`
- [ ] Tidak ada `"use client"` + `metadata export` di file yang sama
- [ ] Node version >= 20.x (jika ada di package.json)

---

## 6. JIKA DEPLOYMENT MASIH BLOCKED

1. Cek apakah commit author email = `cimolcihuy3@gmail.com`
2. Jika salah, amend commit:
   ```bash
   git commit --amend --no-edit --author="Subkhan Ibnu Aji <cimolcihuy3@gmail.com>"
   git push --force
   ```
3. Jika masih blocked, deploy manual via Vercel CLI:
   ```bash
   npx vercel --prod
   ```

---

## INFORMASI AKUN

- **Vercel Team**: Subkhan Ibnu Aji's projects
- **Plan**: Hobby (hanya 1 user yang bisa deploy)
- **GitHub**: subkhanibnuaji
- **Email terdaftar**: cimolcihuy3@gmail.com
