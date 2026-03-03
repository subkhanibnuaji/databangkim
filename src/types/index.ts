export type CategoryType =
  | "data-statistik"
  | "regulasi"
  | "monitoring"
  | "dokumen"
  | "kolaborasi"
  | "referensi"
  | "tools"
  | "media"
  | "data-rentek"
  | "lainnya";

export type StatusType = "active" | "maintenance" | "deprecated" | "coming-soon";
export type SourceType = "internal" | "external" | "google-sheet" | "drive";
export type AccessLevel = "public" | "internal" | "restricted";
export type ViewMode = "grid" | "list" | "compact";
export type SortMode = "priority" | "newest" | "az";

export interface LinkItem {
  id: string;
  title: string;
  description: string;
  url?: string;
  category: CategoryType;
  icon: string;
  tags: string[];
  status: StatusType;
  priority: number;
  addedAt: string;
  updatedAt: string;
  source?: SourceType;
  accessLevel?: AccessLevel;
  notes?: string;
  pinned?: boolean;
  children?: LinkItem[];
}

export interface Category {
  id: CategoryType;
  label: string;
  icon: string;
  description: string;
  color: string;
}

export interface SiteConfig {
  title: string;
  subtitle: string;
  description: string;
  lastUpdated: string;
  maintainer: string;
}

export interface LinksData {
  config: SiteConfig;
  categories: Category[];
  links: LinkItem[];
}

export interface FilterState {
  search: string;
  categories: CategoryType[];
  statuses: StatusType[];
  sources: SourceType[];
  sort: SortMode;
  view: ViewMode;
}
