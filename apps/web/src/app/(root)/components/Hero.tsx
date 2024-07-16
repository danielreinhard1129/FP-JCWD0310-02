'use client';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useState } from 'react';
import Image from 'next/image';
import { BASE_API_URL } from '@/utils/config';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function HeroPage() {
  const [images, setImages] = useState<string[]>([
    '/landing_page/image15.png',
    '/landing_page/lifestyle.jpg',
    '/landing_page/sports.webp',
  ]);
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat w-full md:h-[700px] h-[450px] rounded-[30px] text-white"
      style={{ backgroundImage: `url(${images[0]})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 rounded-[30px] font-sans z-20"></div>

      <div className="md:flex items-end justify-between h-full p-8 py-14 z-50 hidden">
        <div className="flex-col flex justify-start items-start font-rubik z-50">
          <div className="font-semibold md:text-[50px] text-3xl">
            NIKE AIR MAX
          </div>
          <div className="w-[400px] text-stone-200 text-2xl font-semibold mb-6">
            <p>Nike introducing the new air max for everyone's comfort</p>
          </div>
          <Link
            href={''}
            className="p-4 rounded-xl bg-[#3252DF] text-white font-semibold"
          >
            <Label className="font-rubik">View All Products</Label>
          </Link>
        </div>
        <div className="z-50 flex flex-col gap-4">
          <div className="rounded-xl overflow-hidden border-2 border-white aspect-square">
            <Image
              alt="product"
              src={images[0]}
              className="object-cover object-center h-full"
              width={200}
              height={400}
            />
          </div>
          <div className="rounded-xl overflow-hidden border-2 border-white aspect-square">
            <Image
              alt="product"
              src={images[0]}
              className="object-cover object-center h-full"
              width={200}
              height={400}
            />
          </div>
        </div>
      </div>
      <div className="md:hidden font-rubik absolute flex flex-col gap-4 bottom-0 z-50 px-4 py-4">
        <Label className="text-3xl font-bold font-rubik">Nike Air Max</Label>
        <Label className="text-xl font-semibold font-rubik">
          Nike introducing the new air max for everyone's comfort
        </Label>
        <Button className="bg-blue-500 w-40">SHOP NOW</Button>
      </div>
    </div>
  );
}

// export default function HeroPage() {
//   return (
//     <Swiper
//       spaceBetween={30}
//       slidesPerView={1}
//       navigation
//       pagination={{ clickable: true }}
//       className="w-full"
//     >
//       {images.map((image, index) => (
//         <SwiperSlide key={index}>
//           <div
//             className="relative bg-cover bg-center bg-no-repeat w-full max-md:h-[382px] h-[750px] rounded-[65px] text-white"
//             style={{ backgroundImage: `url(${image})` }}
//           >
//             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 rounded-[65px] font-sans"></div>
//             <div className="absolute max-md:bottom-4 max-md:left-4 md:bottom-12 md:left-12 flex-col justify-start items-start inline-flex font-sans max-md:text-sm">
//               <div className="md:text-[74px] font-semibold max-md:text-2xl">
//                 NIKE AIR MAX
//               </div>
//               <div className="w-[490px] text-stone-200 md:text-2xl font-semibold">
//                 <p>Nike introducing the new air max for everyone's comfort</p>
//               </div>
//               <button className="p-4 rounded-xl bg-[#3252DF] text-white mt-7 font-semibold">
//                 View All Products
//               </button>
//             </div>
//             <div className="absolute bottom-12 right-12 space-y-6">
//               <div
//                 className="relative bg-cover bg-center bg-no-repeat w-40 h-40 rounded-3xl text-white border-2 border-white hidden md:block"
//                 style={{ backgroundImage: `url(${image})` }}
//               ></div>
//               <div
//                 className="relative bg-cover bg-center bg-no-repeat w-40 h-40 rounded-3xl text-white border-2 border-white hidden md:block"
//                 style={{ backgroundImage: `url(${image})` }}
//               ></div>
//             </div>
//           </div>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// }

// return (
//   <div className="relative bg-[url('/landing_page/image15.png')] w-full max-md:h-[382px] h-[750px] rounded-[65px] text-white bg-cover bg-center bg-no-repeat">
//     <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 rounded-[65px] font-sans"></div>

//     <div className="absolute max-md:bottom-4 max-md:left-4 md:bottom-12 md:left-12 flex-col justify-start items-start inline-flex font-sans max-md:text-sm">
//       <div className="md:text-[74px] font-semibold max-md:text-2xl">
//         NIKE AIR MAX
//       </div>
//       <div className="w-[490px] text-stone-200 md:text-2xl font-semibold">
//         <p>Nike introducing the new air max for everyone&apos;s comfort</p>
//       </div>
//       <button className="p-4 rounded-xl bg-[#3252DF] text-white mt-7 font-semibold">
//         View All Products
//       </button>
//     </div>

//     <div className="absolute bottom-12 right-12 space-y-6">
//       <div className="relative bg-[url('/landing_page/image15.png')] w-40 h-40 rounded-3xl text-white bg-cover bg-repeat bg-center border-2 border-white hidden md:block"></div>
//       <div className="relative bg-[url('/landing_page/image15.png')] w-40 h-40 rounded-3xl text-white bg-cover bg-repeat bg-center border-2 border-white hidden md:block"></div>
//     </div>
//   </div>
// );

// import { Swiper, SwiperSlide } from 'swiper/react';

// const images: string[] = [
//   '/landing_page/image1.png',
//   '/landing_page/image2.png',
//   '/landing_page/image3.png',
//   '/landing_page/image4.png',
// ];
// export default function HeroPage() {
//   return (
//     <Swiper
//       spaceBetween={30}
//       slidesPerView={1}
//       navigation
//       pagination={{ clickable: true }}
//       className="w-full"
//     >
//       {images.map((image, index) => (
//         <SwiperSlide key={index}>
//           <div
//             className="relative bg-cover bg-center bg-no-repeat w-full max-md:h-[382px] h-[750px] rounded-[65px] text-white"
//             style={{ backgroundImage: `url(${image})` }}
//           >
//             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 rounded-[65px] font-sans"></div>
//             <div className="absolute max-md:bottom-4 max-md:left-4 md:bottom-12 md:left-12 flex-col justify-start items-start inline-flex font-sans max-md:text-sm">
//               <div className="md:text-[74px] font-semibold max-md:text-2xl">
//                 NIKE AIR MAX
//               </div>
//               <div className="w-[490px] text-stone-200 md:text-2xl font-semibold">
//                 <p>Nike introducing the new air max for everyone's comfort</p>
//               </div>
//               <button className="p-4 rounded-xl bg-[#3252DF] text-white mt-7 font-semibold">
//                 View All Products
//               </button>
//             </div>
//             <div className="absolute bottom-12 right-12 space-y-6">
//               <div
//                 className="relative bg-cover bg-center bg-no-repeat w-40 h-40 rounded-3xl text-white border-2 border-white hidden md:block"
//                 style={{ backgroundImage: `url(${image})` }}
//               ></div>
//               <div
//                 className="relative bg-cover bg-center bg-no-repeat w-40 h-40 rounded-3xl text-white border-2 border-white hidden md:block"
//                 style={{ backgroundImage: `url(${image})` }}
//               ></div>
//             </div>
//           </div>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// }

// // return (
// //   <div className="relative bg-[url('/landing_page/image15.png')] w-full max-md:h-[382px] h-[750px] rounded-[65px] text-white bg-cover bg-center bg-no-repeat">
// //     <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 rounded-[65px] font-sans"></div>

// //     <div className="absolute max-md:bottom-4 max-md:left-4 md:bottom-12 md:left-12 flex-col justify-start items-start inline-flex font-sans max-md:text-sm">
// //       <div className="md:text-[74px] font-semibold max-md:text-2xl">
// //         NIKE AIR MAX
// //       </div>
// //       <div className="w-[490px] text-stone-200 md:text-2xl font-semibold">
// //         <p>Nike introducing the new air max for everyone&apos;s comfort</p>
// //       </div>
// //       <button className="p-4 rounded-xl bg-[#3252DF] text-white mt-7 font-semibold">
// //         View All Products
// //       </button>
// //     </div>

// //     <div className="absolute bottom-12 right-12 space-y-6">
// //       <div className="relative bg-[url('/landing_page/image15.png')] w-40 h-40 rounded-3xl text-white bg-cover bg-repeat bg-center border-2 border-white hidden md:block"></div>
// //       <div className="relative bg-[url('/landing_page/image15.png')] w-40 h-40 rounded-3xl text-white bg-cover bg-repeat bg-center border-2 border-white hidden md:block"></div>
// //     </div>
// //   </div>
// // );
