'use client';
import React from 'react';
import Image from 'next/image';
import {
  LayoutDashboard,
  FileBarChart,
  LogOut,
  Settings,
  Theater,
  Ticket,
  UserRound,
} from 'lucide-react';
import logo from '../../../../../public/logo-dark.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface NavigationBarProps {
  href: string;
  children: React.ReactNode;
}

export const NavigationBar = ({ href, children }: NavigationBarProps) => {
  return (
    <Link href={href}>
      <p className="flex cursor-pointer items-center gap-x-2 py-2 transition duration-300 hover:text-gray-600">
        {children}
      </p>
    </Link>
  );
};

const Sidebar = () => {
  const route = useRouter();
  return (
    <>
      <section className="  flex h-screen w-80 flex-col justify-between rounded-r-xl  bg-eastern-blue-500 px-4 pb-4 max-md:hidden">
        <div className=" ">
          <div className="pb-4 pt-8 text-center text-3xl flex justify-center">
            <Image src={logo} alt="logo" width={100} height={100} />
          </div>
          <div className="m-4 mt-8 flex flex-col gap-y-4 px-4">
            <NavigationBar href={'/'}>
              <LayoutDashboard />
              Home
            </NavigationBar>
            <NavigationBar href={'/profile'}>
              <Theater />
              Profile
            </NavigationBar>

            {/* <NavigationBar href={'/dashboard/setting'}>
              <Settings />
              setting
            </NavigationBar> */}
          </div>
        </div>
        <div
          onClick={() => {
            route.push('/login');
            localStorage.clear();
          }}
          className="m-4 flex cursor-pointer items-center p-4 transition duration-300 hover:text-gray-600"
        >
          <LogOut />
          <p>Logout</p>
        </div>
      </section>
    </>
  );
};

export default Sidebar;
