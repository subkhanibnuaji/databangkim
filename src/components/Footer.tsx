"use client";

import { Building2, MapPin, Keyboard, ExternalLink, Heart, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-section-bg to-primary-50 dark:from-section-bg dark:to-primary-900/30 border-t border-border-color mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Quick Links Banner */}
        <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-200/30 dark:border-primary-700/30">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary-500" />
              <span className="text-sm font-semibold text-foreground">Akses Cepat</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <a
                href="https://linktr.ee/FasilitatorBSPS"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 text-white text-xs font-semibold hover:shadow-lg hover:shadow-accent-500/25 transition-all hover:scale-105"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Linktree Fasilitator BSPS
              </a>
              <a
                href="https://go.pkp.go.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-500/10 border border-primary-300/30 dark:border-primary-600/30 text-primary-600 dark:text-primary-300 text-xs font-semibold hover:bg-primary-500/20 transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Portal GoPKP
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
          {/* Logo + info */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/20">
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
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            &copy; {new Date().getFullYear()} DataBangkim &bull; Dibuat dengan
            <Heart className="w-3 h-3 text-danger inline" />
            untuk Direktorat Bangkim
          </p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Keyboard className="w-3 h-3" />
              <span>
                Tekan <kbd className="px-1 py-0.5 rounded border border-border-color bg-badge-bg text-[10px] font-mono">?</kbd> untuk shortcut
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
