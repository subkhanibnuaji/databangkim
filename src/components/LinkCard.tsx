"use client";

import { useState } from "react";
import { Copy, Check, ChevronDown, Lock, ArrowUpRight } from "lucide-react";
import type { LinkItem } from "@/types";
import DynamicIcon from "./DynamicIcon";
import { displayUrl, copyToClipboard, cn } from "@/lib/utils";
import { SOURCE_LABELS } from "@/lib/constants";

interface LinkCardProps {
  link: LinkItem;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  depth?: number;
}

export default function LinkCard({ link, isBookmarked, onToggleBookmark, depth = 0 }: LinkCardProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const hasChildren = link.children && link.children.length > 0;
  const hasUrl = !!link.url;

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!link.url) return;
    await copyToClipboard(link.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Parent node with children ──────────────────────────────────
  if (hasChildren) {
    return (
      <div className="animate-fade-in">
        <button
          onClick={() => setExpanded(!expanded)}
          className={cn(
            "w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-200 group",
            "bg-card-bg border border-card-border",
            "hover:shadow-lg hover:shadow-shadow-color hover:border-primary-200 dark:hover:border-primary-600"
          )}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-800 dark:to-primary-700 flex items-center justify-center flex-shrink-0 shadow-sm">
            <DynamicIcon name={link.icon} className="w-5 h-5 text-primary-500 dark:text-primary-300" />
          </div>
          <div className="flex-1 text-left min-w-0">
            <h3 className="text-[15px] font-semibold text-foreground group-hover:text-primary-500 transition-colors leading-tight">
              {link.title}
            </h3>
            <p className="text-xs text-muted mt-0.5 line-clamp-1">{link.description}</p>
          </div>
          <span className="text-[11px] font-medium text-primary-500 dark:text-primary-300 bg-primary-50 dark:bg-primary-800/60 px-2.5 py-1 rounded-full flex-shrink-0">
            {link.children!.length} link
          </span>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-muted transition-transform duration-300 ease-out",
              !expanded && "-rotate-90"
            )}
          />
        </button>

        {/* Children */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-out",
            expanded ? "mt-2 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          )}
        >
          <div className="ml-5 pl-4 border-l-2 border-primary-100 dark:border-primary-700/50 space-y-1.5">
            {link.children!.map((child) => (
              <LinkCard
                key={child.id}
                link={child}
                isBookmarked={isBookmarked}
                onToggleBookmark={onToggleBookmark}
                depth={depth + 1}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Leaf node with URL ─────────────────────────────────────────
  if (hasUrl) {
    return (
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "group flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 animate-fade-in",
          "border border-transparent",
          depth > 0
            ? "bg-background hover:bg-primary-50/50 dark:hover:bg-primary-800/20 hover:border-primary-100 dark:hover:border-primary-700/40"
            : "bg-card-bg border-card-border hover:shadow-lg hover:shadow-shadow-color hover:border-primary-200 dark:hover:border-primary-600"
        )}
      >
        <div
          className={cn(
            "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200",
            depth > 0
              ? "bg-gray-100 dark:bg-gray-800 group-hover:bg-primary-50 dark:group-hover:bg-primary-800"
              : "bg-primary-50 dark:bg-primary-800"
          )}
        >
          <DynamicIcon
            name={link.icon}
            className={cn(
              "w-4 h-4 transition-colors duration-200",
              depth > 0
                ? "text-gray-400 dark:text-gray-500 group-hover:text-primary-500 dark:group-hover:text-primary-400"
                : "text-primary-500 dark:text-primary-300"
            )}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">
              {link.title}
            </span>
            {link.accessLevel === "restricted" && (
              <Lock className="w-3 h-3 text-warning flex-shrink-0" />
            )}
          </div>
          <span className="text-[11px] text-muted-foreground truncate block mt-0.5 group-hover:text-muted transition-colors">
            {displayUrl(link.url!)}
          </span>
        </div>

        {link.source && (
          <span className="hidden sm:inline-block text-[10px] font-medium px-2 py-0.5 rounded-full bg-badge-bg text-badge-text flex-shrink-0 whitespace-nowrap">
            {SOURCE_LABELS[link.source] || link.source}
          </span>
        )}

        {link.notes && (
          <span className="hidden lg:inline-block text-[10px] text-muted-foreground italic truncate max-w-[160px] flex-shrink-0">
            {link.notes}
          </span>
        )}

        <button
          onClick={handleCopy}
          className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all text-muted hover:text-foreground flex-shrink-0"
          title={copied ? "Tersalin!" : "Salin URL"}
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-success" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>

        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary-500 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0" />
      </a>
    );
  }

  // ── Standalone item without URL or children ────────────────────
  return (
    <div className="flex items-center gap-3.5 px-4 py-3 rounded-xl bg-card-bg border border-card-border animate-fade-in">
      <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
        <DynamicIcon name={link.icon} className="w-4 h-4 text-gray-400" />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-sm font-medium text-foreground">{link.title}</span>
        <p className="text-xs text-muted mt-0.5 line-clamp-1">{link.description}</p>
      </div>
    </div>
  );
}
