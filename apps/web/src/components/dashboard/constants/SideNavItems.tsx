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
    href: '/dashboard',
    color: '',
  },
  {
    title: 'Notification',
    icon: Bell,
    href: '/dashboard',
    color: '',
  },
  {
    title: 'Orders',
    icon: FileText,
    href: '/dashboard',
    color: '',
  },
  {
    title: 'Stock Mutation',
    icon: ArrowLeftRight,
    href: '/dashboard',
    color: '',
  },
  {
    title: 'Product',
    icon: Package,
    href: '/dashboard',
    color: '',
    isChidren: true,
    children: [
      {
        title: 'Create Events',
        icon: SquarePlus,
        color: '',
        href: '/dashboard',
      },
      {
        title: 'Manage Event',
        icon: Bolt,
        color: '',
        href: '/dashboard',
      },
      {
        title: 'Transaction',
        icon: Barcode,
        color: '',
        href: '/dashboard',
      },
    ],
  },
  {
    title: 'Warehouse',
    icon: Warehouse,
    href: '/dashboard',
    color: '',
  },
  {
    title: 'User & Admin',
    icon: User,
    href: '/dashboard',
    color: '',
  },
];
