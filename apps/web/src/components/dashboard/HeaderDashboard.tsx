'use client';
import { cn } from '@/lib/utils';
import { MobileSidebar } from '@/components/dashboard/MobileSidebar';
import Link from 'next/link';
import { Boxes } from 'lucide-react';
import { UserNav } from '@/components/dashboard/UserNavDashboard';
import { Label } from '@/components/ui/label';
import { useAppSelector } from '@/redux/hooks';
import ThemeButton from '@/components/ThemeButton';
import { ThemeToggle } from '../ThemeToggle';

export default function HeaderDashboard() {
  //   const currentTheme = localStorage.getItem('theme');
  //   const userData = useAppSelector((state) => state.user);
  //   const user = {
  //     name: `${userData.firstName} ${userData.lastName}`,
  //     email: userData.email,
  //     image: userData.pictureId,
  //   };

  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex h-16 items-center justify-between px-4">
        <Link
          href={'/'}
          className="hidden items-center justify-between gap-2 md:flex"
        >
          <Boxes className="h-6 w-6" />
          <h1 className="text-lg font-semibold">Stock.In</h1>
        </Link>
        <div className={cn('block md:!hidden')}>
          <MobileSidebar />
        </div>
        <div className="flex gap-4 flex-row">
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {
              // TODO Users Redux for User Nav
            }
            {/* <Label>sadam@email.com</Label>
            <UserNav user={user} /> */}
          </div>
          <ThemeButton />
        </div>
      </nav>
    </div>
  );
}
