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

// import Categories from './components/Categories';
// import HeroPage from './components/Hero';
// import NewProducts from './components/NewProducts';
// import ProductsPage from './components/Products';

// const page = () => (
//   <section>
//     <div className="flex flex-col gap-y-8 w-[90vw] mx-auto max-md:p-5">
//       <div className="text-neutral-800 uppercase font-bold  lg:text-[220px] w-full flex justify-between text-center max-md:text-5xl ">
//         <span>DO</span>
//         <span>IT</span>
//         <span className="text-indigo-500">RIGHT</span>
//       </div>

//       <HeroPage />

//       <div className="flex justify-between items-end mb-8">
//         <div className="uppercase flex flex-col">
//           <div className="text-[74px] font-bold">Don’t miss out</div>
//           <div className="text-[74px] font-bold">new drops</div>
//         </div>
//         <div className="h-12 px-8 py-2 bg-indigo-500 rounded-lg justify-center items-center inline-flex">
//           <div className="text-white text-sm font-medium uppercase">
//             Shop New Drops
//           </div>
//         </div>
//       </div>
//       <NewProducts />
//     </div>
//     <div className="bg-black lg:w-[1440px] w-[90vw] my-8">
//       <Categories />
//     </div>
//     {/* <div className="flex flex-col gap-y-8 w-[1320px] mx-auto">
//       <div className="flex justify-between items-end mb-8">
//         <div className="uppercase  flex flex-col ">
//           <div className="text-[74px] font-bold ">Product</div>
//         </div>
//         <div className=" h-12 px-8 py-2 bg-indigo-500 rounded-lg justify-center items-center inline-flex ">
//           <div className="text-white text-sm font-medium  uppercase   ">
//             Shop New Drops
//           </div>
//         </div>
//       </div>
//       <ProductsPage />
//     </div> */}
//     <div className="flex flex-col gap-y-8 w-full md:w-[1320px] mx-auto px-4 sm:px-8 md:px-0">
//       <div className="flex flex-row justify-between items-end mb-8">
//         <div className="uppercase flex flex-col mb-4 md:mb-0">
//           <div className="text-4xl sm:text-[40px] md:text-[50px] lg:text-[60px] xl:text-[74px] font-bold">
//             Product
//           </div>
//         </div>
//         <div className="h-12 px-4 sm:px-6 md:px-8 py-2 bg-indigo-500 rounded-lg justify-center items-center inline-flex">
//           <div className="text-white text-xs sm:text-sm font-medium uppercase">
//             Shop New Drops
//           </div>
//         </div>
//       </div>
//       <ProductsPage />
//     </div>
//   </section>
// );

// export default page;
