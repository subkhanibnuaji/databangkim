"use client";

import type { StatusType } from "@/types";
import { STATUS_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function StatusBadge({ status }: { status: StatusType }) {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full",
        "bg-badge-bg"
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          config.dotClass,
          status === "active" && "animate-pulse-dot"
        )}
      />
      <span className={config.color}>{config.label}</span>
    </span>
  );
}
