import Navbar from '@/components/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {' '}
      <Navbar />
      <div className="w-full flex justify-center">
        <div className="flex w-screen px-8 max-w-[1141px] justify-center">
          {children}
        </div>
      </div>
    </>
  );
}
