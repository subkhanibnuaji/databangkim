import type { LinkItem, FilterState } from "@/types";

export function relativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Hari ini";
  if (diffDays === 1) return "Kemarin";
  if (diffDays < 7) return `${diffDays} hari lalu`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu lalu`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} bulan lalu`;
  return `${Math.floor(diffDays / 365)} tahun lalu`;
}

export function flattenLinks(links: LinkItem[]): LinkItem[] {
  const result: LinkItem[] = [];
  for (const link of links) {
    result.push(link);
    if (link.children) {
      result.push(...flattenLinks(link.children));
    }
  }
  return result;
}

export function countAllLinks(links: LinkItem[]): number {
  return flattenLinks(links).length;
}

export function countActiveLinks(links: LinkItem[]): number {
  return flattenLinks(links).filter((l) => l.status === "active").length;
}

export function matchesSearch(link: LinkItem, search: string): boolean {
  if (!search) return true;
  const q = search.toLowerCase();
  return (
    link.title.toLowerCase().includes(q) ||
    link.description.toLowerCase().includes(q) ||
    link.tags.some((t) => t.toLowerCase().includes(q)) ||
    link.id.toLowerCase().includes(q)
  );
}

export function filterLinks(links: LinkItem[], filters: FilterState): LinkItem[] {
  return links
    .filter((link) => {
      if (!matchesSearch(link, filters.search)) return false;
      if (filters.categories.length > 0 && !filters.categories.includes(link.category)) return false;
      if (filters.statuses.length > 0 && !filters.statuses.includes(link.status)) return false;
      if (filters.sources.length > 0 && link.source && !filters.sources.includes(link.source)) return false;
      return true;
    })
    .map((link) => {
      if (link.children) {
        const filteredChildren = filterLinks(link.children, filters);
        return { ...link, children: filteredChildren };
      }
      return link;
    });
}

export function sortLinks(links: LinkItem[], sort: string): LinkItem[] {
  const sorted = [...links];
  sorted.sort((a, b) => {
    // Pinned items always first
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;

    switch (sort) {
      case "priority":
        return a.priority - b.priority;
      case "newest":
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      case "az":
        return a.title.localeCompare(b.title);
      default:
        return a.priority - b.priority;
    }
  });
  return sorted;
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  }
  // Fallback
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  return Promise.resolve();
}

export function exportAsJson(data: unknown, filename: string): void {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
