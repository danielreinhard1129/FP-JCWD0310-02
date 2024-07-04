'use client';
import React, { useState } from 'react';
import { SideNav } from '@/components/dashboard/SideNav';
import { NavItems } from '@/components/dashboard/constants/SideNavItems';

import { cn } from '@/lib/utils';
import { useSidebar } from '@/hooks/useSidebar';
import { BsArrowLeftShort } from 'react-icons/bs';
import { useAppSelector } from '@/redux/hooks';

interface SidebarProps {
  className?: string;
}

export default function SidebarDashboard({ className }: SidebarProps) {
  const user = useAppSelector((state) => state.user);
  const { isOpen, toggle } = useSidebar();
  const [status, setStatus] = useState(false);

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };
  return (
    <nav
      className={cn(
        `relative hidden h-screen border-r pt-16 md:block`,
        status && 'duration-500',
        isOpen ? 'w-72' : 'w-[78px]',
        className,
      )}
    >
      <BsArrowLeftShort
        size={30}
        className={cn(
          'absolute -right-4 top-[80px] cursor-pointer z-50 rounded-full border bg-background text-3xl text-foreground',
          !isOpen && 'rotate-180',
        )}
        onClick={handleToggle}
      />
      <div className="">
        <div className="">
          <div className="pt-16">
            <SideNav
              className="text-background opacity-0 transition-all duration-300 group-hover:z-50 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 "
              items={
                user.role == 'SUPER_ADMIN'
                  ? NavItems
                  : NavItems.filter(
                      (val) =>
                        val.title != 'Warehouse' &&
                        val.href != '/admin/manage-data',
                    )
              }
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
