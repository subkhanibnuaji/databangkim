"use client";

import {
  Database, Network, Gauge, LayoutDashboard, Mail, TrendingUp,
  Gavel, Folder, Globe, Megaphone, MessageCircle, Palette,
  Activity, BarChart3, Scale, FileText, Users, BookOpen,
  Wrench, Image, MoreHorizontal, MonitorSmartphone, MapPin,
  FileBadge, Map, Table, ClipboardList, Home, Store, Banknote,
  Building2, HardHat, Landmark, Route, Waves, Droplets,
  BarChart, Wallet, FileCheck, BookMarked, Scroll, Send,
  ListChecks, FileSpreadsheet, ShoppingCart, Youtube, Headphones,
  MessageSquare, Construction, Link, Search, type LucideProps,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  database: Database,
  network: Network,
  gauge: Gauge,
  "layout-dashboard": LayoutDashboard,
  mail: Mail,
  "trending-up": TrendingUp,
  gavel: Gavel,
  folder: Folder,
  globe: Globe,
  megaphone: Megaphone,
  "message-circle": MessageCircle,
  palette: Palette,
  activity: Activity,
  "bar-chart-3": BarChart3,
  scale: Scale,
  "file-text": FileText,
  users: Users,
  "book-open": BookOpen,
  wrench: Wrench,
  image: Image,
  "more-horizontal": MoreHorizontal,
  "monitor-smartphone": MonitorSmartphone,
  "map-pin": MapPin,
  "file-badge": FileBadge,
  map: Map,
  table: Table,
  "clipboard-list": ClipboardList,
  home: Home,
  store: Store,
  banknote: Banknote,
  "building-2": Building2,
  "hard-hat": HardHat,
  landmark: Landmark,
  route: Route,
  waves: Waves,
  droplets: Droplets,
  "bar-chart": BarChart,
  wallet: Wallet,
  "file-check": FileCheck,
  "book-marked": BookMarked,
  scroll: Scroll,
  send: Send,
  "list-checks": ListChecks,
  "file-spreadsheet": FileSpreadsheet,
  "shopping-cart": ShoppingCart,
  youtube: Youtube,
  headphones: Headphones,
  "message-square": MessageSquare,
  construction: Construction,
  search: Search,
};

interface DynamicIconProps extends LucideProps {
  name: string;
}

export default function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const Icon = iconMap[name] || Link;
  return <Icon {...props} />;
}
