"use client";

import { useState } from "react";
import { ExternalLink, Copy, Lock, ChevronDown, ChevronRight } from "lucide-react";
import type { LinkItem } from "@/types";
import StatusBadge from "./StatusBadge";
import DynamicIcon from "./DynamicIcon";
import { copyToClipboard, cn } from "@/lib/utils";

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

  const handleCopy = async () => {
    if (!link.url) return;
    await copyToClipboard(link.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn(depth > 0 && "ml-6")}>
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors",
          index % 2 === 0 ? "bg-card-bg" : "bg-background",
          "hover:bg-card-hover",
          depth > 0 && "border-l-2 border-l-primary-300 dark:border-l-primary-600"
        )}
      >
        {/* Expand toggle for parent */}
        {hasChildren ? (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex-shrink-0 p-0.5 text-muted hover:text-foreground"
          >
            {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>
        ) : (
          <span className="w-4" />
        )}

        {/* Icon */}
        <DynamicIcon name={link.icon} className="w-4 h-4 text-primary-500 flex-shrink-0" />

        {/* Title */}
        {hasUrl ? (
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-foreground hover:text-primary-500 truncate flex-shrink-0 max-w-[200px] sm:max-w-[300px] focus-ring"
          >
            {link.title}
          </a>
        ) : (
          <span className="text-sm font-medium text-foreground truncate flex-shrink-0 max-w-[200px] sm:max-w-[300px]">
            {link.title}
          </span>
        )}

        {/* Description (hidden on mobile) */}
        <span className="hidden md:block text-xs text-muted truncate flex-1 min-w-0">
          {link.description}
        </span>

        {/* Tags (hidden on mobile) */}
        <div className="hidden lg:flex items-center gap-1 flex-shrink-0">
          {link.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-1.5 py-0.5 rounded-full bg-badge-bg text-badge-text"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Status */}
        <div className="flex-shrink-0">
          <StatusBadge status={link.status} />
        </div>

        {/* Access indicator */}
        {link.accessLevel && link.accessLevel !== "public" && (
          <Lock className="w-3 h-3 text-warning flex-shrink-0" />
        )}

        {/* Children count */}
        {hasChildren && (
          <span className="text-[10px] text-muted-foreground bg-badge-bg px-1.5 py-0.5 rounded-full flex-shrink-0">
            {link.children!.length}
          </span>
        )}

        {/* Actions */}
        {hasUrl && (
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={handleCopy}
              className="p-1 rounded hover:bg-badge-bg transition-colors text-muted hover:text-foreground focus-ring"
              title={copied ? "Tersalin!" : "Salin URL"}
            >
              <Copy className={cn("w-3 h-3", copied && "text-success")} />
            </button>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded hover:bg-badge-bg transition-colors text-muted hover:text-foreground focus-ring"
              title="Buka"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>

      {/* Nested children */}
      {hasChildren && expanded && (
        <div className="mt-0.5 space-y-0.5">
          {link.children!.map((child, i) => (
            <LinkCardCompact key={child.id} link={child} index={index + i + 1} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
