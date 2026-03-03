"use client";

import { Building2, MapPin, Keyboard } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-section-bg border-t border-border-color mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
          {/* Logo + info */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-lg bg-primary-500 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">
                Direktorat Pengembangan Kawasan Permukiman
              </p>
              <p className="text-xs text-muted">
                Kementerian Perumahan dan Kawasan Permukiman
              </p>
            </div>
          </div>

          <div className="flex-1" />

          {/* Address */}
          <div className="flex items-start gap-2 text-xs text-muted text-center sm:text-right">
            <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 hidden sm:block" />
            <span>
              Gedung Wisma Mandiri 2, Jl. M.H Thamrin No. 5,
              <br />
              Jakarta Pusat 10340
            </span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border-color flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} DataBangkim. Powered by Next.js &bull; Data managed via code
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Keyboard className="w-3 h-3" />
            <span>
              Tekan <kbd className="px-1 py-0.5 rounded border border-border-color bg-badge-bg text-[10px] font-mono">?</kbd> untuk shortcut keyboard
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
