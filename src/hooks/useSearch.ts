"use client";

import { useState, useMemo, useCallback } from "react";
import type { LinkItem, FilterState, CategoryType, StatusType, SourceType, SortMode, ViewMode } from "@/types";
import { filterLinks, sortLinks } from "@/lib/utils";

const initialFilters: FilterState = {
  search: "",
  categories: [],
  statuses: [],
  sources: [],
  sort: "priority",
  view: "list",
};

export function useSearch(links: LinkItem[]) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  const toggleCategory = useCallback((cat: CategoryType) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat],
    }));
  }, []);

  const toggleStatus = useCallback((status: StatusType) => {
    setFilters((prev) => ({
      ...prev,
      statuses: prev.statuses.includes(status)
        ? prev.statuses.filter((s) => s !== status)
        : [...prev.statuses, status],
    }));
  }, []);

  const toggleSource = useCallback((source: SourceType) => {
    setFilters((prev) => ({
      ...prev,
      sources: prev.sources.includes(source)
        ? prev.sources.filter((s) => s !== source)
        : [...prev.sources, source],
    }));
  }, []);

  const setSort = useCallback((sort: SortMode) => {
    setFilters((prev) => ({ ...prev, sort }));
  }, []);

  const setView = useCallback((view: ViewMode) => {
    setFilters((prev) => ({ ...prev, view }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const removeCategory = useCallback((cat: CategoryType) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c !== cat),
    }));
  }, []);

  const removeStatus = useCallback((status: StatusType) => {
    setFilters((prev) => ({
      ...prev,
      statuses: prev.statuses.filter((s) => s !== status),
    }));
  }, []);

  const removeSource = useCallback((source: SourceType) => {
    setFilters((prev) => ({
      ...prev,
      sources: prev.sources.filter((s) => s !== source),
    }));
  }, []);

  const filteredLinks = useMemo(() => {
    const filtered = filterLinks(links, filters);
    return sortLinks(filtered, filters.sort);
  }, [links, filters]);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.search !== "" ||
      filters.categories.length > 0 ||
      filters.statuses.length > 0 ||
      filters.sources.length > 0
    );
  }, [filters]);

  return {
    filters,
    filteredLinks,
    hasActiveFilters,
    setSearch,
    toggleCategory,
    toggleStatus,
    toggleSource,
    setSort,
    setView,
    clearFilters,
    removeCategory,
    removeStatus,
    removeSource,
  };
}
