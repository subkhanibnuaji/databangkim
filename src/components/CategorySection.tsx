"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Category, LinkItem, ViewMode } from "@/types";
import LinkCard from "./LinkCard";
import LinkCardCompact from "./LinkCardCompact";
import DynamicIcon from "./DynamicIcon";
import { cn } from "@/lib/utils";

interface CategorySectionProps {
  category: Category;
  links: LinkItem[];
  view: ViewMode;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string) => void;
}

export default function CategorySection({
  category,
  links,
  view,
  isBookmarked,
  onToggleBookmark,
}: CategorySectionProps) {
  const [expanded, setExpanded] = useState(true);

  if (links.length === 0) return null;

  return (
    <section id={`category-${category.id}`} className="animate-fade-in">
      {/* Category Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 py-3.5 px-3 group focus-ring rounded-xl hover:bg-card-hover transition-colors duration-200"
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-110"
          style={{ backgroundColor: `${category.color}18` }}
        >
          <DynamicIcon
            name={category.icon}
            className="w-4.5 h-4.5"
            style={{ color: category.color }}
          />
        </div>
        <div className="flex-1 text-left">
          <h2 className="text-sm font-bold text-foreground tracking-tight group-hover:text-primary-500 transition-colors">
            {category.label}
          </h2>
          <p className="text-[11px] text-muted hidden sm:block">{category.description}</p>
        </div>
        <span className="text-[11px] text-muted font-semibold bg-badge-bg px-2.5 py-1 rounded-full">
          {links.length} item
        </span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-muted transition-transform duration-300 ease-out",
            !expanded && "-rotate-90"
          )}
        />
      </button>

      {/* Links — always single-column for clean hierarchy */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-out",
          expanded ? "mt-2 mb-8 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {view === "compact" ? (
          <div className="rounded-xl border border-border-color overflow-hidden">
            {links.map((link, i) => (
              <LinkCardCompact key={link.id} link={link} index={i} />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {links.map((link) => (
              <LinkCard
                key={link.id}
                link={link}
                isBookmarked={isBookmarked(link.id)}
                onToggleBookmark={onToggleBookmark}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
