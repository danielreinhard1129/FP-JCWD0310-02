'use client';
import HeaderDashboard from '@/components/dashboard/HeaderDashboard';
import SidebarDashboard from '@/components/dashboard/SidebarDashboard';

import AuthGuard from '@/hoc/AuthGuard';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const user = useAppSelector((state) => state.user);
  const token = localStorage.getItem('token');

  if (user.role == 'CUSTOMER') {
    router.push('/');
  }

  if (!token) {
    router.push('/');
  }

  return (
    <QueryClientProvider client={queryClient}>
      <HeaderDashboard />
      <div className="flex h-screen border-collapse overflow-hidden">
        <SidebarDashboard className="bg-[#FAFAFA]" />
        <main className="flex-1 overflow-y-auto overflow-x-hidden pt-16 bg-[#E7E7E3] pb-1">
          {children}
        </main>
      </div>
    </QueryClientProvider>
  );
};
const ProtectedAdminLayout = AuthGuard(AdminLayout);
// const ProtectedAdminLayout = AdminLayout;

export default ProtectedAdminLayout;
