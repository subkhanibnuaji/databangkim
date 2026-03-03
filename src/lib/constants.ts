import type { StatusType } from "@/types";

export const STATUS_CONFIG: Record<StatusType, { label: string; color: string; dotClass: string }> = {
  active: { label: "Aktif", color: "text-green-600", dotClass: "bg-green-500" },
  maintenance: { label: "Maintenance", color: "text-yellow-600", dotClass: "bg-yellow-500" },
  deprecated: { label: "Deprecated", color: "text-red-600", dotClass: "bg-red-500" },
  "coming-soon": { label: "Coming Soon", color: "text-blue-600", dotClass: "bg-blue-500" },
};

export const SOURCE_LABELS: Record<string, string> = {
  internal: "Internal",
  external: "Eksternal",
  "google-sheet": "Google Sheet",
  drive: "Google Drive",
};

export const ACCESS_LABELS: Record<string, string> = {
  public: "Publik",
  internal: "Internal",
  restricted: "Terbatas",
};

export const KEYBOARD_SHORTCUTS = [
  { keys: ["/"], description: "Fokus ke pencarian" },
  { keys: ["Escape"], description: "Bersihkan pencarian / tutup modal" },
  { keys: ["t"], description: "Toggle tema gelap/terang" },
  { keys: ["?"], description: "Tampilkan shortcut keyboard" },
  { keys: ["g", "h"], description: "Scroll ke atas" },
  { keys: ["1-9"], description: "Lompat ke kategori" },
];
