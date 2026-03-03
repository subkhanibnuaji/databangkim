"use client";

import { useEffect, useState } from "react";
import { Link2, FolderOpen, CheckCircle, Clock } from "lucide-react";

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
      <span className="font-bold text-foreground">{count}</span>{" "}
      <span className="text-muted">{label}</span>
    </span>
  );
}

export default function StatsBar({ totalLinks, totalCategories, activeLinks, lastUpdated }: StatsBarProps) {
  return (
    <div className="bg-section-bg border-b border-border-color">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-4 sm:gap-6 py-3 overflow-x-auto text-xs sm:text-sm no-scrollbar">
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <Link2 className="w-3.5 h-3.5 text-primary-400" />
            <AnimatedCounter target={totalLinks} label="Links" />
          </div>
          <div className="w-px h-4 bg-border-color" />
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <FolderOpen className="w-3.5 h-3.5 text-primary-400" />
            <AnimatedCounter target={totalCategories} label="Kategori" />
          </div>
          <div className="w-px h-4 bg-border-color" />
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <CheckCircle className="w-3.5 h-3.5 text-success" />
            <AnimatedCounter target={activeLinks} label="Aktif" />
          </div>
          <div className="w-px h-4 bg-border-color" />
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <Clock className="w-3.5 h-3.5 text-muted" />
            <span className="text-muted">Update: {lastUpdated}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
