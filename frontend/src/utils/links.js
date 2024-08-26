import { FileInput, Home, ListChecks, Rss, Users } from "lucide-react";

export const sidebarLinks = [
  { label: "Home", href: "/admin/dashboard", icon: Home },
  { label: "Categories", href: "/admin/categories", icon: ListChecks },
  { label: "Form Builder", href: "/admin/form-builder", icon: FileInput },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Posts", href: "/admin/posts", icon: Rss },
];
