'use client';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full flex justify-center bg-[#E7E7E3]">
        <div className="flex flex-col w-full px-8">
          <Navbar />
          <div className="w-full mt-8">
            <div>{children}</div>
          </div>
          <Footer />
        </div>
      </div>
    </QueryClientProvider>
  );
}
