import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="w-full flex justify-center bg-[#E7E7E3]">
        {' '}
        <div className="flex flex-col">
          <Navbar />
          <div className="w-[90vw] py-8">
            <div>{children}</div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
