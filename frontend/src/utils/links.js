import { FileInput, Home, Rss, Settings, Users } from "lucide-react";

export const sidebarLinks = [
  { label: "Home", href: "/admin/dashboard", icon: Home },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Form Builder", href: "/admin/form-builder", icon: FileInput },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Posts", href: "/admin/posts", icon: Rss },
];
