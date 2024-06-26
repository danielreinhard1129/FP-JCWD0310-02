'use client';
import HeaderDashboard from '@/components/dashboard/HeaderDashboard';
import SidebarDashboard from '@/components/dashboard/SidebarDashboard';
import AuthGuard from '@/hoc/AuthGuard';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HeaderDashboard />
      <div className="flex h-screen border-collapse overflow-hidden">
        <SidebarDashboard className="bg-[#FAFAFA]" />
        <main className="flex-1 overflow-y-auto overflow-x-hidden pt-16 bg-[#E7E7E3] pb-1">
          {children}
        </main>
      </div>
    </>
  );
};
// const ProtectedAdminLayout = AuthGuard(AdminLayout);
const ProtectedAdminLayout = AdminLayout;

export default ProtectedAdminLayout;
