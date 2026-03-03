"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import Header from "@/components/Header";
import StatsBar from "@/components/StatsBar";
import SearchFilter from "@/components/SearchFilter";
import CategorySection from "@/components/CategorySection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import EmptyState from "@/components/EmptyState";
import { useSearch } from "@/hooks/useSearch";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";
import { countAllLinks, countActiveLinks } from "@/lib/utils";
import linksData from "@/data/links.json";
import type { LinksData } from "@/types";

const data = linksData as LinksData;

export default function Home() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.getAttribute("data-theme") || "light";
    }
    return "light";
  });

  const searchInputRef = useRef<HTMLInputElement>(null);

  const {
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
  } = useSearch(data.links);

  const { isBookmarked, toggleBookmark } = useBookmarks();

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("databangkim-theme", next);
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const focusSearch = useCallback(() => {
    searchInputRef.current?.focus();
  }, []);

  const categoryIds = useMemo(
    () => data.categories.map((c) => c.id),
    []
  );

  const { showShortcuts, closeShortcuts } = useKeyboardNav(
    focusSearch,
    toggleTheme,
    categoryIds
  );

  // Group filtered links by category
  const groupedLinks = useMemo(() => {
    const groups: Record<string, typeof filteredLinks> = {};
    for (const cat of data.categories) {
      groups[cat.id] = filteredLinks.filter((l) => l.category === cat.id);
    }
    return groups;
  }, [filteredLinks]);

  // Stats
  const totalLinks = countAllLinks(data.links);
  const activeLinks = countActiveLinks(data.links);
  const filteredCount = countAllLinks(filteredLinks);

  const hasResults = filteredLinks.length > 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        searchValue={filters.search}
        onSearch={setSearch}
        searchInputRef={searchInputRef}
      />

      <StatsBar
        totalLinks={totalLinks}
        totalCategories={data.categories.length}
        activeLinks={activeLinks}
        lastUpdated={data.config.lastUpdated}
      />

      <SearchFilter
        filters={filters}
        categories={data.categories}
        filteredCount={filteredCount}
        totalCount={totalLinks}
        filteredLinks={filteredLinks}
        hasActiveFilters={hasActiveFilters}
        onToggleCategory={toggleCategory}
        onToggleStatus={toggleStatus}
        onToggleSource={toggleSource}
        onSetSort={setSort}
        onSetView={setView}
        onClearFilters={clearFilters}
        onRemoveCategory={removeCategory}
        onRemoveStatus={removeStatus}
        onRemoveSource={removeSource}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6">
        {hasResults ? (
          <div className="space-y-4">
            {data.categories.map((category) => (
              <CategorySection
                key={category.id}
                category={category}
                links={groupedLinks[category.id] || []}
                view={filters.view}
                isBookmarked={isBookmarked}
                onToggleBookmark={toggleBookmark}
              />
            ))}
          </div>
        ) : (
          <EmptyState onClear={clearFilters} />
        )}
      </main>

      <Footer />
      <BackToTop />

      {showShortcuts && <KeyboardShortcuts onClose={closeShortcuts} />}
    </div>
  );
}
