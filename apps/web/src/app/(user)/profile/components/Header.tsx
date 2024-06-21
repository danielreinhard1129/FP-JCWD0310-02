import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useAppSelector } from '@/redux/hooks';
import { AlignJustify } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type title = {
  title: string;
};

export const Header = () => {
  // const { username } = useAppSelector((state) => state.user);
  return (
    <nav className="p-4 max-md:justify-between max-md:rounded-b-lg  max-md:bg-eastern-blue-500 md:mx-2 md:px-12 md:pb-4 md:pt-8">
      <div className=" left-0 flex place-items-center justify-between font-sans font-semibold capitalize max-md:flex-row-reverse md:-mt-4  text-black">
        <div className="max-md:block md:hidden ">
          <div className="  md:hidden ">
            <Sheet>
              <SheetTrigger>
                <AlignJustify className="" size="24" />
              </SheetTrigger>
              <SheetContent className="bg-transparent backdrop-blur-lg">
                <div>
                  <div className="flex flex-col gap-4 p-4">
                    <p className=" hover:underline">
                      <SheetClose asChild>
                        <Link href={'/'}>Home</Link>
                      </SheetClose>
                    </p>
                    <p className=" hover:underline">
                      <SheetClose asChild>
                        <Link href={'/dashboard/event'}>Event</Link>
                      </SheetClose>
                    </p>
                    <p className="text-white hover:underline">
                      <SheetClose asChild>
                        <Link href={'/dashboard/order'}>Order</Link>
                      </SheetClose>
                    </p>
                    <p className="text-white hover:underline">
                      <SheetClose asChild>
                        <Link href={'/dashboard/setting'}>setting</Link>
                      </SheetClose>
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          {/* <AlignJustify /> */}
        </div>
        <div>
          <h3 className="font-semibold max-md:-ml-20  md:text-3xl">
            {/* Welcome back, {username} */}
          </h3>
          <h1 className=" text-gray-500 max-md:hidden">
            Here are todays stats from your dashboard
          </h1>
        </div>

        {/* {pathname.search("/dashboard/")
              ? "Dashboard"
              : pathname.replace("/dashboard/", "")} */}
        <img
          className="inline-block h-12 w-12  rounded-full shadow-lg ring-2 ring-white"
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
    </nav>
  );
};
