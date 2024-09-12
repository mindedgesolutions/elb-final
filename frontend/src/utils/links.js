import {
  Home,
  ListChecks,
  Rss,
  Users,
  LockKeyhole,
  LogOut,
  ShoppingBasket,
  User2,
  Bike,
  BookOpen,
  CarFront,
  Plug2,
  Armchair,
  Shirt,
  Smartphone,
  MapPinHouse,
  ClipboardPlus,
  Settings,
  Star,
} from "lucide-react";

export const sidebarLinks = [
  { label: "Home", href: "/admin/dashboard", icon: Home },
  { label: "Categories", href: "/admin/categories", icon: ListChecks },
  { label: "Form Fields", href: "/admin/form-fields", icon: Settings },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Posts", href: "/admin/posts", icon: Rss },
  { label: "New Post", href: "/admin/post/new", icon: ClipboardPlus },
  { label: "Reviews", href: "/admin/post/reviews", icon: Star },
];

export const wbProfileLinks = [
  { label: "edit profile", href: "#", icon: User2 },
  { label: "change password", href: "#", icon: LockKeyhole },
  { label: "your orders", href: "#-builder", icon: ShoppingBasket },
  { label: "logout", href: "#", icon: LogOut },
];

export const wbSearchCategories = [
  { id: 24, category: "Bikes", slug: "bikes", icon: Bike },
  {
    id: 28,
    category: "Books, Sports & Hobbies",
    slug: "books-sports-hobbies",
    icon: BookOpen,
  },
  { id: 32, category: "Cars", slug: "cars", icon: CarFront },
  {
    id: 36,
    category: "Electronics & Appliances",
    slug: "electronics-appliances",
    icon: Plug2,
  },
  { id: 39, category: "Furnitures", slug: "furnutures", icon: Armchair },
  { id: 40, category: "Fashion", slug: "fashion", icon: Shirt },
  { id: 41, category: "Mobiles", slug: "mobiles", icon: Smartphone },
  { id: 42, category: "Properties", slug: "properties", icon: MapPinHouse },
];
