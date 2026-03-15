"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { Building2, Search, X, ExternalLink, Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  theme: string;
  onToggleTheme: () => void;
  searchValue: string;
  onSearch: (value: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
}

export default function Header({ theme, onToggleTheme, searchValue, onSearch, searchInputRef }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => onSearch(val), 300);
    },
    [onSearch]
  );

  const handleClear = useCallback(() => {
    onSearch("");
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
      searchInputRef.current.focus();
    }
  }, [onSearch, searchInputRef]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? "glass shadow-lg" : ""
      }`}
    >
      <div
        className="bg-gradient-to-r from-[var(--header-gradient-from)] to-[var(--header-gradient-to)]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          {/* Top row: Logo + Theme */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur flex items-center justify-center">
                <Building2 className="w-6 h-6 text-accent-400" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  Data<span className="text-accent-400">Bangkim</span>
                  <Sparkles className="w-4 h-4 text-accent-400 animate-pulse-dot" />
                </h1>
                <p className="text-xs sm:text-sm text-primary-200 font-medium">
                  Pusat Data & Link Hub — Dir. Bangkim
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://linktr.ee/FasilitatorBSPS"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-500/20 border border-accent-400/30 text-accent-300 hover:bg-accent-500/30 hover:text-accent-200 transition-all text-xs font-medium backdrop-blur"
              >
                <ExternalLink className="w-3 h-3" />
                Linktree Fasilitator
              </a>
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            </div>
          </div>

          {/* Search bar */}
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-300" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder='Cari link, data, atau resource... (tekan "/" untuk fokus)'
              defaultValue={searchValue}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-white/10 backdrop-blur border border-white/20 text-white placeholder-primary-300 text-sm focus:outline-none focus:ring-2 focus:ring-accent-400/50 focus:border-accent-400/50 transition-all"
            />
            {searchValue && (
              <button
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
