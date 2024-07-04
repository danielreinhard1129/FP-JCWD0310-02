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
const hiddenButton = 'hidden';
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
    title: 'Stocks',
    icon: ArrowLeftRight,
    href: '/admin/stocks',
    color: '',
    isChidren: true,
    children: [
      {
        title: 'Stock management',
        href: '/admin/stocks',
        icon: ArrowLeftRight,
      },
      {
        title: 'Stock mutations',
        href: '/admin/stocks/mutations',
        icon: ArrowLeftRight,
      },
      {
        title: 'Stock journal',
        href: '/admin/stocks/journal',
        icon: ArrowLeftRight,
      },
    ],
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
    isChidren: false,
    children: [
      {
        title: 'Create Warehouse',
        icon: SquarePlus,
        color: '',
        href: '/admin/warehouses/create',
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
    title: 'User & Admin',
    icon: User,
    href: '/admin/manage-data',
    color: '',
    isChidren: true,

    children: [
      {
        title: 'Manage Admin',
        icon: SquarePlus,
        color: '',
        href: '/admin/manage-data',
      },
      {
        title: 'Manage User',
        icon: Bolt,
        color: '',
        href: 'admin/manage-data/edit',
      },
    ],
  },
];
