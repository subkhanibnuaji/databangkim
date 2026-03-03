"use client";

import { Download } from "lucide-react";
import type { LinkItem } from "@/types";
import { exportAsJson } from "@/lib/utils";

interface ExportButtonProps {
  links: LinkItem[];
}

export default function ExportButton({ links }: ExportButtonProps) {
  return (
    <button
      onClick={() => exportAsJson(links, `databangkim-export-${new Date().toISOString().slice(0, 10)}.json`)}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border-color text-muted hover:text-foreground hover:bg-card-hover transition-colors focus-ring"
      title="Export data sebagai JSON"
    >
      <Download className="w-3.5 h-3.5" />
      Export
    </button>
  );
}
