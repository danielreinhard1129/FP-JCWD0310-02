import { useState, useEffect } from 'react';
import { MenuIcon } from 'lucide-react';
import logo from '../../../public/logo-dark.png';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SideNav } from '@/components/dashboard/SideNav';
import { NavItems } from '@/components/dashboard/constants/SideNavItems';
import Image from 'next/image';

export const MobileSidebar = () => {
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="max-h-screen">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <div className="flex items-center justify-center gap-4">
              <MenuIcon />
              <Image alt="logo" src={logo} className="w-20" />
            </div>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-72 overflow-y-scroll no-scrollbar::-webkit-scrollbar no-scrollbar"
          >
            <Image alt="logo" src={logo} className="w-20" />
            <div className="py-4">
              <SideNav items={NavItems} setOpen={setOpen} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};
