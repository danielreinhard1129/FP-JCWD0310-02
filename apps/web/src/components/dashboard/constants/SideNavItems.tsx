import { BookOpenCheck, CalendarPlus2, LayoutDashboard , Banknote, Package, Boxes, PackageOpen, Blocks } from "lucide-react";
import { type LucideIcon } from 'lucide-react'

export interface NavItem {
    title: string;
    href: string;
    icon: LucideIcon;
    color?: string;
    isChidren?: boolean;
    children?: NavItem[];
}

export const NavItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    title: "Product",
    icon: Package,
    href: "/dashboard/product",
    color: "text-orange-500",
    isChidren: true,
    children: [
      {
        title: "List Products",
        icon: Boxes,
        color: "text-yellow-500",
        href: "/dashboard/product/list",
      },
      {
        title: "Manage Products",
        icon: PackageOpen,
        color: "text-blue-500",
        href: "/dashboard/product/manage",
      },
      {
        title: "Product Mutations",
        icon: Blocks,
        color: "text-green-500",
        href: "/dashboard/product/mutation",
      },
    ],
  },
];