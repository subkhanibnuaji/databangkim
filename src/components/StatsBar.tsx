"use client";

import { useEffect, useState } from "react";
import { Link2, FolderOpen, CheckCircle, Clock, TrendingUp } from "lucide-react";

interface StatsBarProps {
  totalLinks: number;
  totalCategories: number;
  activeLinks: number;
  lastUpdated: string;
}

function AnimatedCounter({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (target === 0) return;
    const duration = 600;
    const steps = 20;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <span className="animate-count-up">
      <span className="font-bold text-foreground text-base">{count}</span>{" "}
      <span className="text-muted">{label}</span>
    </span>
  );
}

export default function StatsBar({ totalLinks, totalCategories, activeLinks, lastUpdated }: StatsBarProps) {
  const activePercent = totalLinks > 0 ? Math.round((activeLinks / totalLinks) * 100) : 0;

  return (
    <div className="bg-section-bg border-b border-border-color">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-4 sm:gap-6 py-3.5 overflow-x-auto text-xs sm:text-sm no-scrollbar">
          <div className="flex items-center gap-2 whitespace-nowrap px-3 py-1 rounded-lg bg-primary-50/50 dark:bg-primary-800/20">
            <Link2 className="w-4 h-4 text-primary-500" />
            <AnimatedCounter target={totalLinks} label="Links" />
          </div>
          <div className="w-px h-5 bg-border-color" />
          <div className="flex items-center gap-2 whitespace-nowrap px-3 py-1 rounded-lg bg-primary-50/50 dark:bg-primary-800/20">
            <FolderOpen className="w-4 h-4 text-primary-500" />
            <AnimatedCounter target={totalCategories} label="Kategori" />
          </div>
          <div className="w-px h-5 bg-border-color" />
          <div className="flex items-center gap-2 whitespace-nowrap px-3 py-1 rounded-lg bg-green-50/50 dark:bg-green-900/10">
            <CheckCircle className="w-4 h-4 text-success" />
            <AnimatedCounter target={activeLinks} label="Aktif" />
            <span className="text-[10px] font-semibold text-success bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded-full hidden sm:inline">
              {activePercent}%
            </span>
          </div>
          <div className="w-px h-5 bg-border-color" />
          <div className="flex items-center gap-2 whitespace-nowrap">
            <Clock className="w-4 h-4 text-muted" />
            <span className="text-muted">Update: {lastUpdated}</span>
          </div>
          <div className="flex-1" />
          <div className="hidden md:flex items-center gap-1 text-[11px] text-muted-foreground">
            <TrendingUp className="w-3 h-3" />
            <span>Selalu diperbarui</span>
          </div>
        </div>
      </div>
    </div>
  );
}
