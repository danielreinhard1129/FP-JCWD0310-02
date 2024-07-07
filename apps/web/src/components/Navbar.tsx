'use client';
import { ShoppingBag } from 'lucide-react';
import { Search } from 'lucide-react';
import { User } from 'lucide-react';
import { AlignJustify } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/logo-dark.png';
import { useAppSelector } from '@/redux/hooks';
import useVerifyEmail from '@/hooks/api/auth/useVerifyEmail';

interface User {
  id: number;
  email: string;
  role: string;
}
export const Navbar = () => {
  const { isVerify, email } = useAppSelector((state) => state.user);
  const [emails, setEmail] = useState('');
  const { verifyEmail } = useVerifyEmail();
  const router = useRouter();
  useEffect(() => {
    const storeUser = localStorage.getItem('persist:shoes');
    if (storeUser) {
      const parseUser = JSON.parse(storeUser as string);
      const findEmail = JSON.parse(parseUser?.user).email;
      setEmail(findEmail);
    }
  }, []);
  console.log(email);
  const handleLogout = () => {
    localStorage.removeItem('persist:shoes');
    setEmail('');
  };
  return (
    <>
      {/* Mobile */}
      <div>
        <div className="w-full p-4 bg-neutral-50 rounded-xl flex justify-between items-start mt-4 md:hidden">
          <div className="flex items-start">
            <AlignJustify className="w-5 h-5" />
          </div>
          <div className="w-20 h-5 flex justify-center items-center font-bold font-rubik">
            <Image src={logo} alt="logo" width={400} height={400} />
          </div>
          <div
            onClick={() => router.push('/carts')}
            className="flex items-center cursor-pointer gap-4"
          >
            <User className="w-5 h-5" />
            <ShoppingBag className="w-5 h-5 cursor-pointer " />
          </div>
        </div>
      </div>
      {/* Dektop */}
      <div className="w-full h-24 p-8 bg-white rounded-3xl flex justify-between items-center mt-4 text-lg max-md:hidden">
        <Link href={'/products'} className="flex items-start gap-10">
          <div className="text-neutral-800 font-semibold font-rubik">
            New Drops 🔥
          </div>
        </Link>
        <div className="w-32 h-8 flex justify-center items-center font-extrabold text-center font-rubik">
          <Image src={logo} alt="logo" width={400} height={400} />
        </div>
        <div className="flex items-center gap-8">
          <Search className="w-7 h-7" />
          <div className="w-6 h-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <User className="md:w-6 md:h-6" />
              </DropdownMenuTrigger>
              {!emails ? (
                <DropdownMenuContent className="  mt-2 px-1">
                  <DropdownMenuLabel
                    className="text-center  font-bold text-base cursor-pointer"
                    onClick={() => router.push('/login')}
                  >
                    Login
                  </DropdownMenuLabel>
                  <DropdownMenuLabel
                    className="text-center  font-bold text-base cursor-pointer"
                    onClick={() => router.push('/register')}
                  >
                    Register
                  </DropdownMenuLabel>
                </DropdownMenuContent>
              ) : (
                <DropdownMenuContent className=" mt-2 px-1">
                  <DropdownMenuLabel className="pb-0">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuItem disabled className="pt-0 ">
                    {emails}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {isVerify === false ? (
                      <DropdownMenuItem onClick={() => verifyEmail({ email })}>
                        Verify
                      </DropdownMenuItem>
                    ) : (
                      <>
                        <DropdownMenuItem
                          onClick={() => router.push('/profile')}
                        >
                          Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleLogout()}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          </div>
          <button
            onClick={() => router.push('/carts')}
            className="cursor-pointer"
          >
            <ShoppingBag className="w-6 h-6" />
          </button>
        </div>
      </div>
    </>
  );
};
