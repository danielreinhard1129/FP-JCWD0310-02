import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <div className="w-full flex justify-center">
        <div className="flex w-screen px-8 max-w-[1141px] justify-center">
          {children}
        </div>
      </div>{' '} */}

      <div className="w-full flex justify-center bg-[#E7E7E3]">
        {' '}
        <div className=" flex justify-center flex-col items-center max-w-[1440px]  w-screen  ">
          <Navbar />
          <div>{children}</div>

          {/* <Footer /> */}
        </div>
      </div>
    </>
  );
}
