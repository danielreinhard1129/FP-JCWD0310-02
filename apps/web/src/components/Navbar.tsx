import { ShoppingBag } from 'lucide-react';
import { Search } from 'lucide-react';
import { User } from 'lucide-react';
import { AlignJustify } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Navbar() {
  return (
    <>
      {/* Mobile */}
      <div>
        <div className="w-[358px] p-4 px-6 bg-neutral-50 rounded-xl flex justify-between items-start mt-8 md:hidden">
          <div className="flex items-start gap-[90px]">
            <AlignJustify className="w-5 h-5" />
            <div className="w-20 h-5 flex justify-center items-center font-semibold">
              LOGO
            </div>
          </div>
          <div className="flex items-center gap-4">
            <User className="w-5 h-5" />
            <ShoppingBag className="w-5 h-5" />
          </div>
        </div>
      </div>
      {/* Dektop */}
      <div className="w-[1320px] h-24 p-8 bg-white rounded-3xl flex justify-between items-center my-8 text-lg max-md:hidden">
        <div className="flex items-start gap-10">
          <div className="text-neutral-800 font-semibold">New Drops 🔥</div>
          <div className="flex items-center gap-0.5 text-neutral-800 font-semibold">
            Men
          </div>
          <div className="flex items-center gap-0.5 text-neutral-800 font-semibold">
            Women
          </div>
        </div>
        <div className="w-32 h-8 flex justify-center items-center font-extrabold text-center">
          LOGO
        </div>
        <div className="flex items-center gap-8">
          <Search className="w-7 h-7" />
          <div className="w-6 h-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <User className="md:w-6 md:h-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="absolute -right-5 mt-2 w-32">
                <DropdownMenuLabel className="pb-0">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuItem disabled className="pt-0">
                  Email
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* <User className="md:w-6 md:h-6" /> */}
          <ShoppingBag className="w-6 h-6" />
        </div>
      </div>
    </>
  );
}
