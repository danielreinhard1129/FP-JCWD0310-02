import { Label } from '@/components/ui/label';
import Categories from './components/Categories';
import HeroPage from './components/Hero';
import NewProducts from './components/NewProducts';
import ProductsPage from './components/Products';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const page = () => (
  <section>
    <div className="flex font-rubik flex-col md:gap-y-8 gap-y-4 mx-auto max-md:p-5">
      <div className="text-neutral-800 font-extrabold text-[10vw] uppercase w-full flex justify-between text-center">
        <span>DO</span>
        <span>IT</span>
        <span className="text-indigo-500">RIGHT</span>
      </div>
      <HeroPage />
      <div className="flex flex-col gap-8 font-rubik mt-2 md:mb-12">
        <div className="flex justify-between items-center">
          <div className="uppercase flex flex-col">
            <div className="md:text-4xl text-xl font-bold">Don’t miss out</div>
            <div className="md:text-3xl text-xl font-bold">new drops</div>
          </div>
          <Link
            href="/products"
            className="h-12 w-30 md:px-8 px-2 py-2 bg-indigo-500 rounded-lg justify-center items-center inline-flex"
          >
            <div className="text-white text-sm font-medium uppercase">
              Shop New Drops
            </div>
          </Link>
        </div>
        <NewProducts />
      </div>
    </div>
    <div className="bg-black">
      <Categories />
    </div>
    <div className="flex flex-col mt-12 gap-8 font-rubik">
      <div className="uppercase flex justify-between items-center">
        <Label className="text-[60px] text-3xl font-bold">PRODUCT</Label>
        <Button className="bg-blue-500 flex justify-center items-center text-center">
          <Link href="/products">
            <Label>SEE ALL</Label>
          </Link>
        </Button>
      </div>
      <ProductsPage />
    </div>
  </section>
);

export default page;
