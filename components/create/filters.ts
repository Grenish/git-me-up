import type { LucideIcon } from "lucide-react";
import {
  Code,
  Box,
  Monitor,
  Server,
  Database,
  GitBranch,
  Bug,
  Smartphone,
  Brain,
  Palette,
  Cloud,
  Wrench,
  Gamepad2,
  FileText,
  ShoppingCart,
  BarChart3,
  Shield,
  Package,
  Sparkles,
} from "lucide-react";

export type FilterItem = {
  key: string;
  label: string;
  Icon: LucideIcon;
};

export const FILTERS: FilterItem[] = [
  { key: "language", label: "Language", Icon: Code },
  { key: "framework", label: "Framework", Icon: Box },
  { key: "frontend", label: "Frontend", Icon: Monitor },
  { key: "backend", label: "Backend", Icon: Server },
  { key: "database", label: "Database", Icon: Database },
  { key: "devops", label: "DevOps", Icon: GitBranch },
  { key: "testing", label: "Testing", Icon: Bug },
  { key: "mobile", label: "Mobile", Icon: Smartphone },
  { key: "ai", label: "AI/ML", Icon: Brain },
  { key: "design", label: "Design", Icon: Palette },
  { key: "BAAS", label: "BaaS", Icon: Cloud },
  { key: "tools", label: "Tools", Icon: Wrench },
  { key: "gamedev", label: "Game Dev", Icon: Gamepad2 },
  { key: "cms", label: "CMS", Icon: FileText },
  { key: "ecommerce", label: "E-commerce", Icon: ShoppingCart },
  { key: "data", label: "Data", Icon: BarChart3 },
  { key: "security", label: "Security", Icon: Shield },
  { key: "other", label: "Other", Icon: Package },
  { key: "i use arch btw", label: "i use arch btw", Icon: Sparkles },
];
