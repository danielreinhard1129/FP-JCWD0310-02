import {
  BookOpenCheck,
  CalendarPlus2,
  LayoutDashboard,
  Banknote,
  Package,
  Home,
  Bell,
  FileText,
  ArrowLeftRight,
  SquarePlus,
  Bolt,
  Barcode,
  Warehouse,
  User,
} from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

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
    title: 'Dashboard',
    icon: Home,
    href: '/admin',
    color: '',
  },
  {
    title: 'Notification',
    icon: Bell,
    href: '/admin/notifications',
    color: '',
  },
  {
    title: 'Orders',
    icon: FileText,
    href: '/admin/orders',
    color: '',
  },
  {
    title: 'Stock Mutation',
    icon: ArrowLeftRight,
    href: '/admin/stocks',
    color: '',
  },
  {
    title: 'Product',
    icon: Package,
    href: '/admin/products',
    color: '',
    isChidren: true,
    children: [
      {
        title: 'Create Product',
        icon: SquarePlus,
        color: '',
        href: '/admin/products/create',
      },
      {
        title: 'Manage Product',
        icon: Bolt,
        color: '',
        href: '/admin/products',
      },
    ],
  },
  {
    title: 'Warehouse',
    icon: Warehouse,
    href: '/admin/warehouses',
    color: '',
  },
  {
    title: 'User & Admin',
    icon: User,
    href: '/admin/users',
    color: '',
  },
];
