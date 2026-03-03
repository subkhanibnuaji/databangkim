"use client";

import { useState } from "react";
import { ExternalLink, Copy, Bookmark, BookmarkCheck, Lock, ChevronDown, ChevronRight } from "lucide-react";
import type { LinkItem } from "@/types";
import StatusBadge from "./StatusBadge";
import TagPill from "./TagPill";
import DynamicIcon from "./DynamicIcon";
import { relativeTime, copyToClipboard, displayUrl, cn } from "@/lib/utils";
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
    e.stopPropagation();
    if (!link.url) return;
    await copyToClipboard(link.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isParentNode = hasChildren && !hasUrl;

  return (
    <div className={cn(depth > 0 && "ml-4 sm:ml-6")}>
      <div
        className={cn(
          "group relative rounded-xl border transition-all",
          "bg-card-bg border-card-border",
          hasUrl && "card-hover",
          depth > 0 && "border-l-2",
          depth > 0 && "border-l-primary-300 dark:border-l-primary-600",
          link.pinned && depth === 0 && "ring-1 ring-accent-400/30"
        )}
      >
        {/* Pinned indicator */}
        {link.pinned && depth === 0 && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-500 rounded-full border-2 border-card-bg" />
        )}

        <div className="p-4">
          {/* Top row: icon + title + status */}
          <div className="flex items-start gap-3">
            <div
              className={cn(
                "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center",
                depth === 0
                  ? "bg-primary-50 text-primary-500 dark:bg-primary-800 dark:text-primary-300"
                  : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
              )}
            >
              <DynamicIcon name={link.icon} className="w-5 h-5" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                {hasUrl ? (
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-foreground hover:text-primary-500 transition-colors truncate focus-ring"
                  >
                    {link.title}
                  </a>
                ) : (
                  <button
                    onClick={() => hasChildren && setExpanded(!expanded)}
                    className="text-sm font-semibold text-foreground hover:text-primary-500 transition-colors truncate text-left focus-ring"
                  >
                    {link.title}
                  </button>
                )}
                <StatusBadge status={link.status} />
                {link.accessLevel && link.accessLevel !== "public" && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] text-warning">
                    <Lock className="w-3 h-3" />
                    {link.accessLevel === "restricted" ? "Terbatas" : "Internal"}
                  </span>
                )}
              </div>

              <p className="text-xs text-muted mt-1 line-clamp-2">{link.description}</p>

              {/* Clickable URL display */}
              {hasUrl && (
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-1.5 text-[11px] text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors truncate max-w-full focus-ring"
                  title={link.url}
                >
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{displayUrl(link.url!)}</span>
                </a>
              )}
            </div>

            {/* Expand/Collapse for parent nodes */}
            {hasChildren && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex-shrink-0 p-1 rounded-md hover:bg-card-hover transition-colors text-muted"
                aria-label={expanded ? "Collapse" : "Expand"}
              >
                {expanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            )}
          </div>

          {/* Tags */}
          {link.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {link.tags.slice(0, 4).map((tag) => (
                <TagPill key={tag} tag={tag} />
              ))}
              {link.tags.length > 4 && (
                <span className="text-[10px] text-muted self-center">+{link.tags.length - 4}</span>
              )}
            </div>
          )}

          {/* Bottom row: metadata + actions */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border-color">
            <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
              {link.source && (
                <span className="px-1.5 py-0.5 rounded bg-badge-bg text-badge-text">
                  {SOURCE_LABELS[link.source] || link.source}
                </span>
              )}
              <span>Diperbarui {relativeTime(link.updatedAt)}</span>
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {hasUrl && (
                <>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-md hover:bg-card-hover transition-colors text-muted hover:text-foreground focus-ring"
                    title={copied ? "Tersalin!" : "Salin URL"}
                  >
                    <Copy className={cn("w-3.5 h-3.5", copied && "text-success")} />
                  </button>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-md hover:bg-card-hover transition-colors text-muted hover:text-foreground focus-ring"
                    title="Buka di tab baru"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleBookmark(link.id);
                }}
                className={cn(
                  "p-1.5 rounded-md hover:bg-card-hover transition-colors focus-ring",
                  isBookmarked ? "text-accent-500" : "text-muted hover:text-foreground"
                )}
                title={isBookmarked ? "Hapus bookmark" : "Bookmark"}
              >
                {isBookmarked ? (
                  <BookmarkCheck className="w-3.5 h-3.5" />
                ) : (
                  <Bookmark className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Children count indicator */}
          {hasChildren && !expanded && (
            <div className="mt-2 text-[10px] text-muted-foreground">
              {link.children!.length} sub-item{link.children!.length > 1 ? "s" : ""}
            </div>
          )}
        </div>
      </div>

      {/* Nested Children */}
      {hasChildren && expanded && (
        <div className="mt-2 space-y-2 relative">
          {/* Vertical connector line */}
          <div className="absolute left-5 top-0 bottom-4 w-0.5 bg-border-color hidden sm:block" />
          {link.children!.map((child) => (
            <div key={child.id} className="relative">
              {/* Horizontal connector */}
              <div className="absolute left-5 top-6 w-3 h-0.5 bg-border-color hidden sm:block" />
              <LinkCard
                link={child}
                isBookmarked={isBookmarked}
                onToggleBookmark={onToggleBookmark}
                depth={depth + 1}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
