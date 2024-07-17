'use client';
import { useEffect, useState } from 'react';
import 'swiper/css';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HeroPage() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([
    '/landing_page/image15.png',
    '/landing_page/lifestyle.jpg',
    '/landing_page/sports.webp',
  ]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat w-full md:h-[700px] h-[450px] rounded-[30px] text-white"
      style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 rounded-[30px] font-sans z-20"></div>

      <div className="md:flex items-end justify-between h-full p-8 py-14 z-50 hidden">
        <div className="flex-col flex justify-start items-start font-rubik z-50">
          <div className="font-semibold md:text-[50px] text-3xl">
            NIKE AIR MAX
          </div>
          <div className="w-[400px] text-stone-200 text-2xl font-semibold mb-6">
            <p>Nike introducing the new air max for everyone&apos;s comfort</p>
          </div>
          <Link
            href="/products"
            className="p-4 rounded-xl bg-[#3252DF] text-white font-semibold"
          >
            <span className="font-rubik">View All Products</span>
          </Link>
        </div>
        <div className="z-50 flex flex-col gap-4">
          <div className="rounded-xl overflow-hidden border-2 border-white aspect-square">
            <Image
              alt="product"
              src={images[currentImageIndex]}
              className="object-cover object-center h-full"
              width={200}
              height={400}
            />
          </div>
          <div className="rounded-xl overflow-hidden border-2 border-white aspect-square">
            <Image
              alt="product"
              src={images[currentImageIndex]}
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
          Nike introducing the new air max for everyone&apos;s comfort
        </Label>
        <Button className="bg-blue-500 w-40">SHOP NOW</Button>
      </div>
    </div>
  );
}
