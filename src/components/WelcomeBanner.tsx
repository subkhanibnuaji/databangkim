"use client";

import { Zap, ArrowRight, ExternalLink } from "lucide-react";

export default function WelcomeBanner() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 p-6 sm:p-8 text-white shadow-xl shadow-primary-500/10">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-400/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-400/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-accent-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-accent-300">
                Pusat Data & Link Hub
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold mb-1">
              Selamat datang di <span className="text-accent-400">DataBangkim</span>
            </h2>
            <p className="text-sm text-primary-200 max-w-lg">
              Akses cepat ke seluruh data, link, dan resource Direktorat Pengembangan Kawasan Permukiman.
              Gunakan pencarian atau filter untuk menemukan yang Anda butuhkan.
            </p>
          </div>

          <a
            href="https://linktr.ee/FasilitatorBSPS"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold transition-all hover:shadow-lg hover:shadow-accent-500/30 hover:scale-105 flex-shrink-0 group"
          >
            <ExternalLink className="w-4 h-4" />
            Linktree Fasilitator
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
