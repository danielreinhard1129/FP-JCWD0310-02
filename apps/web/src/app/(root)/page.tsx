import Categories from './components/Categories';
import HeroPage from './components/Hero';
import NewProducts from './components/NewProducts';
import ProductsPage from './components/Products';

const page = () => (
  <section>
    <div className="flex flex-col gap-y-8 md:w-[1320px] max-md:w-[358px] mx-auto max-md:p-5">
      <div className="text-neutral-800 uppercase font-bold  lg:text-[220px] w-full flex justify-between text-center max-md:text-5xl ">
        <span>DO</span>
        <span>IT</span>
        <span className="text-indigo-500">RIGHT</span>
      </div>

      <HeroPage />

      <div className="flex justify-between items-end">
        <div className="uppercase flex flex-col">
          <div className="text-[74px] font-bold">Don’t miss out</div>
          <div className="text-[74px] font-bold">new drops</div>
        </div>
        <div className="h-12 px-8 py-2 bg-indigo-500 rounded-lg justify-center items-center inline-flex">
          <div className="text-white text-sm font-medium uppercase">
            Shop New Drops
          </div>
        </div>
      </div>
      <NewProducts />
    </div>
    <div className="bg-black w-[1440px] my-8">
      <Categories />
    </div>
    <div className="flex flex-col gap-y-8 w-[1320px] mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div className="uppercase  flex flex-col ">
          <div className="text-[74px] font-bold ">Product</div>
        </div>
        <div className=" h-12 px-8 py-2 bg-indigo-500 rounded-lg justify-center items-center inline-flex ">
          <div className="text-white text-sm font-medium  uppercase   ">
            Shop New Drops
          </div>
        </div>
      </div>
      <ProductsPage />
    </div>
  </section>
);

export default page;

{
  /* <div className="text-neutral-800 uppercase font-bold text-center w-full flex  :justify-between lg:text-[240px]">
<span className="max-md:text-xl">DO</span>
<span className="max-md:text-xl ">IT</span>
<span className="text-indigo-500 max-md:text-xl">RIGHT</span>
</div> */
}
