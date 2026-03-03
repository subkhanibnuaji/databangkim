"use client";

import { LayoutGrid, List, AlignJustify, ArrowUpDown, X } from "lucide-react";
import type { Category, FilterState, CategoryType, StatusType, SourceType, ViewMode, SortMode } from "@/types";
import { STATUS_CONFIG, SOURCE_LABELS } from "@/lib/constants";
import ExportButton from "./ExportButton";
import type { LinkItem } from "@/types";
import { cn } from "@/lib/utils";

interface SearchFilterProps {
  filters: FilterState;
  categories: Category[];
  filteredCount: number;
  totalCount: number;
  filteredLinks: LinkItem[];
  hasActiveFilters: boolean;
  onToggleCategory: (cat: CategoryType) => void;
  onToggleStatus: (status: StatusType) => void;
  onToggleSource: (source: SourceType) => void;
  onSetSort: (sort: SortMode) => void;
  onSetView: (view: ViewMode) => void;
  onClearFilters: () => void;
  onRemoveCategory: (cat: CategoryType) => void;
  onRemoveStatus: (status: StatusType) => void;
  onRemoveSource: (source: SourceType) => void;
}

export default function SearchFilter({
  filters,
  categories,
  filteredCount,
  totalCount,
  filteredLinks,
  hasActiveFilters,
  onToggleCategory,
  onToggleStatus,
  onToggleSource,
  onSetSort,
  onSetView,
  onClearFilters,
  onRemoveCategory,
  onRemoveStatus,
  onRemoveSource,
}: SearchFilterProps) {
  const viewModes: { mode: ViewMode; icon: React.ReactNode; label: string }[] = [
    { mode: "grid", icon: <LayoutGrid className="w-4 h-4" />, label: "Grid" },
    { mode: "list", icon: <List className="w-4 h-4" />, label: "List" },
    { mode: "compact", icon: <AlignJustify className="w-4 h-4" />, label: "Compact" },
  ];

  return (
    <div className="bg-section-bg border-b border-border-color">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 space-y-3">
        {/* Row 1: Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category filter */}
          <div className="relative group">
            <select
              onChange={(e) => {
                if (e.target.value) onToggleCategory(e.target.value as CategoryType);
                e.target.value = "";
              }}
              value=""
              className="appearance-none text-xs px-3 py-1.5 rounded-lg border border-border-color bg-input-bg text-foreground cursor-pointer hover:border-primary-400 transition-colors focus-ring pr-6"
            >
              <option value="">+ Kategori</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status filter */}
          <div className="relative">
            <select
              onChange={(e) => {
                if (e.target.value) onToggleStatus(e.target.value as StatusType);
                e.target.value = "";
              }}
              value=""
              className="appearance-none text-xs px-3 py-1.5 rounded-lg border border-border-color bg-input-bg text-foreground cursor-pointer hover:border-primary-400 transition-colors focus-ring pr-6"
            >
              <option value="">+ Status</option>
              {Object.entries(STATUS_CONFIG).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.label}
                </option>
              ))}
            </select>
          </div>

          {/* Source filter */}
          <div className="relative">
            <select
              onChange={(e) => {
                if (e.target.value) onToggleSource(e.target.value as SourceType);
                e.target.value = "";
              }}
              value=""
              className="appearance-none text-xs px-3 py-1.5 rounded-lg border border-border-color bg-input-bg text-foreground cursor-pointer hover:border-primary-400 transition-colors focus-ring pr-6"
            >
              <option value="">+ Sumber</option>
              {Object.entries(SOURCE_LABELS).map(([key, val]) => (
                <option key={key} value={key}>
                  {val}
                </option>
              ))}
            </select>
          </div>

          <div className="w-px h-5 bg-border-color hidden sm:block" />

          {/* Sort */}
          <div className="flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-muted" />
            <select
              value={filters.sort}
              onChange={(e) => onSetSort(e.target.value as SortMode)}
              className="appearance-none text-xs px-2 py-1.5 rounded-lg border border-border-color bg-input-bg text-foreground cursor-pointer hover:border-primary-400 transition-colors focus-ring"
            >
              <option value="priority">Prioritas</option>
              <option value="newest">Terbaru</option>
              <option value="az">A-Z</option>
            </select>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* View toggle */}
          <div className="flex items-center bg-input-bg rounded-lg border border-border-color p-0.5">
            {viewModes.map(({ mode, icon, label }) => (
              <button
                key={mode}
                onClick={() => onSetView(mode)}
                className={cn(
                  "p-1.5 rounded-md transition-colors focus-ring",
                  filters.view === mode
                    ? "bg-primary-500 text-white shadow-sm"
                    : "text-muted hover:text-foreground"
                )}
                title={label}
              >
                {icon}
              </button>
            ))}
          </div>

          {/* Export */}
          <ExportButton links={filteredLinks} />
        </div>

        {/* Row 2: Active filter chips + result count */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 animate-fade-in">
            <span className="text-xs text-muted">Filter aktif:</span>
            {filters.categories.map((cat) => {
              const catInfo = categories.find((c) => c.id === cat);
              return (
                <button
                  key={cat}
                  onClick={() => onRemoveCategory(cat)}
                  className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-primary-50 text-primary-600 dark:bg-primary-800 dark:text-primary-200 hover:bg-primary-100 dark:hover:bg-primary-700 transition-colors"
                >
                  {catInfo?.label || cat}
                  <X className="w-3 h-3" />
                </button>
              );
            })}
            {filters.statuses.map((status) => (
              <button
                key={status}
                onClick={() => onRemoveStatus(status)}
                className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-primary-50 text-primary-600 dark:bg-primary-800 dark:text-primary-200 hover:bg-primary-100 dark:hover:bg-primary-700 transition-colors"
              >
                {STATUS_CONFIG[status].label}
                <X className="w-3 h-3" />
              </button>
            ))}
            {filters.sources.map((source) => (
              <button
                key={source}
                onClick={() => onRemoveSource(source)}
                className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-primary-50 text-primary-600 dark:bg-primary-800 dark:text-primary-200 hover:bg-primary-100 dark:hover:bg-primary-700 transition-colors"
              >
                {SOURCE_LABELS[source]}
                <X className="w-3 h-3" />
              </button>
            ))}
            <button
              onClick={onClearFilters}
              className="text-xs text-danger hover:underline ml-1"
            >
              Hapus semua
            </button>
            <div className="flex-1" />
            <span className="text-xs text-muted">
              {filteredCount} dari {totalCount} link
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
