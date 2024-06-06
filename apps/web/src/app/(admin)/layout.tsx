import HeaderDashboard from "@/components/dashboard/HeaderDashboard";
import SidebarDashboard from "@/components/dashboard/SidebarDashboard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderDashboard />
      <div className="flex h-screen border-collapse overflow-hidden">
        <SidebarDashboard />
        <main className="flex-1 overflow-y-auto overflow-x-hidden pt-16 bg-secondary/10 pb-1">
          {children}
        </main>
      </div>
    </>
  );
}
