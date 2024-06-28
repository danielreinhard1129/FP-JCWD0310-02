import { Header } from './components/Header';
import Sidebar from './components/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="flex h-screen flex-row">
        <>
          <Sidebar />
          <div className="flex w-full flex-col h-full">
            <div className="flex-1 bg-gray-100 py-8 font-bold h-full  max-md:px-4 md:px-12">
              {children}
            </div>
          </div>
        </>
      </section>
    </>
  );
}
