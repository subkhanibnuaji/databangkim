"use client";

import { useState } from "react";
import { Copy, Check, Lock, ChevronDown, ArrowUpRight } from "lucide-react";
import type { LinkItem } from "@/types";
import DynamicIcon from "./DynamicIcon";
import { copyToClipboard, displayUrl, cn } from "@/lib/utils";
import { SOURCE_LABELS } from "@/lib/constants";

interface LinkCardCompactProps {
  link: LinkItem;
  index: number;
  depth?: number;
}

export default function LinkCardCompact({ link, index, depth = 0 }: LinkCardCompactProps) {
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

  return (
    <div className={cn(depth > 0 && "ml-6")}>
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-2.5 transition-colors duration-150 group",
          depth > 0
            ? "border-l-2 border-l-primary-200 dark:border-l-primary-700"
            : index % 2 === 0
              ? "bg-card-bg"
              : "bg-background",
          hasUrl && "hover:bg-primary-50/50 dark:hover:bg-primary-800/20 cursor-pointer"
        )}
        {...(hasUrl
          ? {}
          : hasChildren
            ? { onClick: () => setExpanded(!expanded), role: "button", style: { cursor: "pointer" } }
            : {}
        )}
      >
        {/* Expand toggle */}
        {hasChildren ? (
          <button
            onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
            className="flex-shrink-0 p-0.5 text-muted hover:text-foreground transition-colors"
          >
            <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", !expanded && "-rotate-90")} />
          </button>
        ) : (
          <span className="w-4" />
        )}

        {/* Icon */}
        <DynamicIcon
          name={link.icon}
          className={cn(
            "w-4 h-4 flex-shrink-0",
            hasChildren ? "text-primary-500" : "text-gray-400 dark:text-gray-500"
          )}
        />

        {/* Title */}
        {hasUrl ? (
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-foreground group-hover:text-primary-500 truncate flex-shrink-0 max-w-[200px] sm:max-w-[300px] transition-colors focus-ring"
          >
            {link.title}
          </a>
        ) : (
          <span className={cn(
            "text-sm font-medium text-foreground truncate flex-shrink-0 max-w-[200px] sm:max-w-[300px]",
            hasChildren && "font-semibold"
          )}>
            {link.title}
          </span>
        )}

        {/* URL or description */}
        {hasUrl ? (
          <span className="hidden md:block text-[11px] text-muted-foreground truncate flex-1 min-w-0">
            {displayUrl(link.url!)}
          </span>
        ) : (
          <span className="hidden md:block text-xs text-muted truncate flex-1 min-w-0">
            {hasChildren ? `${link.children!.length} link` : link.description}
          </span>
        )}

        {/* Source badge */}
        {hasUrl && link.source && (
          <span className="hidden lg:inline-block text-[10px] font-medium px-2 py-0.5 rounded-full bg-badge-bg text-badge-text flex-shrink-0">
            {SOURCE_LABELS[link.source] || link.source}
          </span>
        )}

        {/* Access lock */}
        {link.accessLevel === "restricted" && (
          <Lock className="w-3 h-3 text-warning flex-shrink-0" />
        )}

        {/* Actions */}
        {hasUrl && (
          <div className="flex items-center gap-0.5 flex-shrink-0">
            <button
              onClick={handleCopy}
              className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all text-muted hover:text-foreground focus-ring"
              title={copied ? "Tersalin!" : "Salin URL"}
            >
              {copied ? <Check className="w-3 h-3 text-success" /> : <Copy className="w-3 h-3" />}
            </button>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-muted hover:text-primary-500 focus-ring"
              title="Buka"
            >
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>

      {/* Nested children */}
      {hasChildren && expanded && (
        <div className="space-y-0">
          {link.children!.map((child, i) => (
            <LinkCardCompact key={child.id} link={child} index={index + i + 1} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
