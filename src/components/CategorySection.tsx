"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
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
        className="w-full flex items-center gap-3 py-3 px-4 rounded-xl bg-section-bg hover:bg-card-hover transition-colors group focus-ring"
        style={{ borderLeft: `3px solid ${category.color}` }}
      >
        <DynamicIcon
          name={category.icon}
          className="w-5 h-5 flex-shrink-0"
          style={{ color: category.color }}
        />
        <div className="flex-1 text-left">
          <h2 className="text-sm sm:text-base font-semibold text-foreground">
            {category.label}
          </h2>
          <p className="text-xs text-muted hidden sm:block">{category.description}</p>
        </div>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full"
          style={{ backgroundColor: `${category.color}15`, color: category.color }}
        >
          {links.length}
        </span>
        {expanded ? (
          <ChevronDown className="w-4 h-4 text-muted group-hover:text-foreground transition-colors" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted group-hover:text-foreground transition-colors" />
        )}
      </button>

      {/* Links */}
      {expanded && (
        <div className={cn("mt-3 mb-6", view === "compact" ? "space-y-0.5" : "")}>
          {view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {links.map((link) => (
                <LinkCard
                  key={link.id}
                  link={link}
                  isBookmarked={isBookmarked(link.id)}
                  onToggleBookmark={onToggleBookmark}
                />
              ))}
            </div>
          ) : view === "list" ? (
            <div className="space-y-3">
              {links.map((link) => (
                <LinkCard
                  key={link.id}
                  link={link}
                  isBookmarked={isBookmarked(link.id)}
                  onToggleBookmark={onToggleBookmark}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-border-color overflow-hidden">
              {links.map((link, i) => (
                <LinkCardCompact key={link.id} link={link} index={i} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
