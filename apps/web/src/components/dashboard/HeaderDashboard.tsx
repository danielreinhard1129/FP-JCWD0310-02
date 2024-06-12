'use client';
import { cn } from '@/lib/utils';
import { MobileSidebar } from '@/components/dashboard/MobileSidebar';
import Link from 'next/link';
import logo from '../../../public/logo-dark.png';
import { ArrowDown, Bell, Boxes, Search } from 'lucide-react';
import { UserNav } from '@/components/dashboard/UserNavDashboard';
import { Label } from '@/components/ui/label';
import { useAppSelector } from '@/redux/hooks';
import ThemeButton from '@/components/ThemeButton';
import { ThemeToggle } from '../ThemeToggle';
import Image from 'next/image';
import { Button } from '../ui/button';

export default function HeaderDashboard() {
  //   const currentTheme = localStorage.getItem('theme');
  //   const userData = useAppSelector((state) => state.user);
  //   const user = {
  //     name: `${userData.firstName} ${userData.lastName}`,
  //     email: userData.email,
  //     image: userData.pictureId,
  //   };

  return (
    <div className="bg-[#FAFAFA] fixed left-0 right-0 top-0 z-20 border-l border-[#E7E7E3] backdrop-blur">
      <nav className="flex h-16 items-center justify-between px-4">
        <Link
          href={'/'}
          className="hidden items-center justify-between gap-2 md:flex"
        >
          <Image src={logo} alt="logo" className="w-20" />
        </Link>
        <div className={cn('block md:!hidden')}>
          <MobileSidebar />
        </div>
        <div className="flex gap-4 flex-row">
          <div className="flex items-center gap-2">
            <Search width={20} />
            <Bell width={20} />
            <ThemeToggle />
            <Button className="bg-transparent border h-8 w-auto border-black rounded-lg text-black flex gap-1">
              <p className="text-xs">ADMIN</p>
              <ArrowDown width={12} />
            </Button>
            {/* <Label>sadam@email.com</Label>
            <UserNav user={user} /> */}
          </div>
          {/* <ThemeButton /> */}
        </div>
      </nav>
    </div>
  );
}
