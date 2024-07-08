'use client';
import { cn } from '@/lib/utils';
import { MobileSidebar } from '@/components/dashboard/MobileSidebar';
import Link from 'next/link';
import logo from '../../../public/logo-dark.png';
import { ArrowDown } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { useAppSelector } from '@/redux/hooks';

export default function HeaderDashboard() {
  const user = useAppSelector((state) => state.user);
  return (
    <div className="bg-[#FAFAFA] fixed left-0 right-0 top-0 z-20 border-b backdrop-blur">
      <nav className="flex h-16 items-center justify-between px-7">
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
            <Label>{user.email}</Label>
            <Button className="bg-transparent border h-8 w-auto border-black rounded-lg text-black flex gap-1">
              <p className="text-xs">ADMIN</p>
              <ArrowDown width={12} />
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
}
