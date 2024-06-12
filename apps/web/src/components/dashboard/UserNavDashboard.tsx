'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Home, LogOut } from 'lucide-react';
import { UserAvatar } from '@/components/dashboard/UserAvatarDashboard';
import { useRouter } from 'next/navigation';

// Log out
// import useLogout from '@/app/hooks/api/auth/useLogout';

type Props = {
  user: {
    name: string;
    image: string | undefined;
    email: string;
  };
};

export function UserNav({ user }: Props) {
  const router = useRouter();
  // Logout
//   const { logout } = useLogout();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: user.name || null, image: user.image || null }}
          className="h-8 w-8 cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-4 p-2 pb-8">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm">
                {user.email}
              </p>
            )}
          </div>
        </div>
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuItem asChild>
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => {
              router.push('/');
            }}
          >
            <Home className="mr-2 h-4 w-4" aria-hidden="true" />
            Home Page
          </Button>
        </DropdownMenuItem>
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuItem asChild>
          <Button variant="ghost" className="w-full" 
          //onClick={() => logout()}
          //Logout Handler
          >
            <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
