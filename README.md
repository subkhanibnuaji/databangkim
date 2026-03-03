# DataBangkim

**Pusat Data & Link Hub** untuk Direktorat Pengembangan Kawasan Permukiman — Kementerian Perumahan dan Kawasan Permukiman (PKP).

Website statis yang berfungsi sebagai "command center" untuk semua link, data, dan resource terkait pekerjaan di Direktorat Bangkim. Konsep mirip Linktree tapi dengan fitur superpower: nested data hierarchy, search, filter, multiple views, bookmarks, dan keyboard shortcuts.

## Fitur

- **Nested Data Hierarchy** — Setiap bagian bisa memiliki child/cabang (contoh: Database Kumuh > SK Kumuh, Peta Spasial, Baseline Data)
- **Search & Filter Real-time** — Cari berdasarkan judul, deskripsi, atau tag
- **Multiple Views** — Grid, List, dan Compact view
- **Category Sections** — Accordion collapsible per kategori
- **Status Indicators** — Active / Maintenance / Deprecated / Coming Soon
- **Quick-copy URL** — Salin URL link dengan satu klik
- **Dark/Light Mode** — Toggle tema dengan shortcut `t`
- **Bookmark Favorites** — Pin link favorit (disimpan di localStorage)
- **Keyboard Shortcuts** — Navigasi cepat (tekan `?` untuk daftar lengkap)
- **Export JSON** — Download data link dalam format JSON
- **Responsive & Mobile-first** — Optimal di semua ukuran layar

## Tech Stack

| Teknologi | Versi |
| --- | --- |
| Next.js | 16+ (App Router, Static Export) |
| TypeScript | 5+ (strict mode) |
| Tailwind CSS | 4+ |
| Lucide React | Icons |
| Google Fonts | Plus Jakarta Sans, Inter, JetBrains Mono |
| GitHub Pages | Deployment via GitHub Actions |

## Struktur Proyek

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (fonts, metadata, theme script)
│   ├── page.tsx            # Homepage — main link hub
│   ├── globals.css         # Global styles + CSS variables
│   └── not-found.tsx       # Custom 404 page
├── components/             # React components
│   ├── Header.tsx          # Navy gradient header + search
│   ├── StatsBar.tsx        # Quick stats bar
│   ├── SearchFilter.tsx    # Filters, sort, view toggle
│   ├── CategorySection.tsx # Collapsible category accordion
│   ├── LinkCard.tsx        # Rich link card (grid/list) with nested children
│   ├── LinkCardCompact.tsx # Compact row view with nested children
│   ├── DynamicIcon.tsx     # Lucide icon resolver
│   ├── StatusBadge.tsx     # Status indicator
│   ├── TagPill.tsx         # Tag chip
│   ├── ThemeToggle.tsx     # Dark/light mode toggle
│   ├── Footer.tsx          # Footer
│   ├── BackToTop.tsx       # Scroll to top button
│   ├── KeyboardShortcuts.tsx # Shortcut modal
│   ├── ExportButton.tsx    # Export as JSON
│   └── EmptyState.tsx      # No results state
├── data/
│   └── links.json          # ⭐ MASTER DATA — semua links & konfigurasi
├── types/
│   └── index.ts            # TypeScript interfaces
├── hooks/
│   ├── useSearch.ts        # Search & filter logic
│   ├── useBookmarks.ts     # localStorage bookmarks
│   └── useKeyboardNav.ts   # Keyboard navigation
└── lib/
    ├── utils.ts            # Utility functions
    └── constants.ts        # Status config, labels
```

## Cara Menambah/Edit Link

Semua data dikelola lewat file `src/data/links.json`. Tidak ada admin panel — edit langsung di code.

### Menambah Link Baru

Tambahkan objek baru di array `links` dalam `src/data/links.json`:

```json
{
  "id": "ds-006",
  "title": "Judul Link Baru",
  "description": "Deskripsi singkat tentang link ini.",
  "url": "https://example.com",
  "category": "data-statistik",
  "icon": "database",
  "tags": ["tag1", "tag2"],
  "status": "active",
  "priority": 1,
  "addedAt": "2026-03-03",
  "updatedAt": "2026-03-03",
  "source": "internal",
  "accessLevel": "internal"
}
```

### Menambah Link dengan Sub-Item (Nested)

Gunakan properti `children` untuk membuat hierarki bersarang:

```json
{
  "id": "ds-010",
  "title": "Data Program XYZ",
  "description": "Kumpulan data program XYZ.",
  "category": "data-statistik",
  "icon": "folder",
  "tags": ["program", "xyz"],
  "status": "active",
  "priority": 1,
  "addedAt": "2026-03-03",
  "updatedAt": "2026-03-03",
  "children": [
    {
      "id": "ds-010-a",
      "title": "Sub Data A",
      "description": "Detail sub data A.",
      "url": "https://example.com/a",
      "category": "data-statistik",
      "icon": "file-text",
      "tags": ["sub-data"],
      "status": "active",
      "priority": 1,
      "addedAt": "2026-03-03",
      "updatedAt": "2026-03-03"
    }
  ]
}
```

## Data Schema

```typescript
interface LinkItem {
  id: string;               // ID unik, format: "cat-001"
  title: string;            // Judul link
  description: string;      // Deskripsi singkat
  url?: string;             // URL (opsional untuk parent node)
  category: CategoryType;   // Kategori
  icon: string;             // Nama icon Lucide
  tags: string[];           // Tag untuk pencarian
  status: StatusType;       // "active" | "maintenance" | "deprecated" | "coming-soon"
  priority: number;         // 1-10, urutan dalam kategori
  addedAt: string;          // Tanggal ditambahkan (ISO)
  updatedAt: string;        // Tanggal diperbarui (ISO)
  source?: string;          // "internal" | "external" | "google-sheet" | "drive"
  accessLevel?: string;     // "public" | "internal" | "restricted"
  pinned?: boolean;         // Tampil di atas
  children?: LinkItem[];    // Sub-item bersarang
}
```

## Kategori

| ID | Label | Icon |
| --- | --- | --- |
| `sistem-informasi` | Sistem Informasi & Aplikasi | monitor-smartphone |
| `data-statistik` | Data & Statistik | bar-chart-3 |
| `regulasi` | Regulasi & Kebijakan | scale |
| `monitoring` | Monitoring & Evaluasi | activity |
| `dokumen` | Dokumen & Template | file-text |
| `kolaborasi` | Kolaborasi & Komunikasi | users |
| `referensi` | Referensi & Knowledge Base | book-open |
| `tools` | Tools & Utilities | wrench |
| `media` | Media & Publikasi | image |
| `lainnya` | Lainnya | more-horizontal |

## Keyboard Shortcuts

| Shortcut | Aksi |
| --- | --- |
| `/` | Fokus pencarian |
| `Escape` | Bersihkan pencarian / tutup modal |
| `t` | Toggle tema gelap/terang |
| `?` | Tampilkan shortcut keyboard |
| `g` lalu `h` | Scroll ke atas |
| `1`-`9` | Lompat ke kategori |

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Output folder: ./out (static export)
```

## Deployment

Website di-deploy otomatis ke GitHub Pages via GitHub Actions setiap kali push ke branch `main`.

URL: `https://subkhanibnuaji.github.io/databangkim/`

### Setup GitHub Pages
1. Buka Settings > Pages
2. Pilih Source: **GitHub Actions**
3. Push ke branch `main`

## Maintainer

Tim IT — Direktorat Pengembangan Kawasan Permukiman, Kementerian PKP
