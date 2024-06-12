import { Footer } from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {' '}
      <div className="w-full flex justify-center">
        <div className="flex flex-col w-screen px-8 max-w-[1141px] justify-center">
          <Navbar />
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
}
