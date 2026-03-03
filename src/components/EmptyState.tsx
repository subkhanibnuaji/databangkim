"use client";

import { SearchX } from "lucide-react";

interface EmptyStateProps {
  onClear: () => void;
}

export default function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-badge-bg flex items-center justify-center mb-4">
        <SearchX className="w-8 h-8 text-muted" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Tidak ada hasil ditemukan
      </h3>
      <p className="text-muted text-sm mb-4 max-w-sm">
        Coba ubah kata kunci pencarian atau filter yang digunakan.
      </p>
      <button
        onClick={onClear}
        className="px-4 py-2 text-sm font-medium rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors focus-ring"
      >
        Reset Filter
      </button>
    </div>
  );
}
