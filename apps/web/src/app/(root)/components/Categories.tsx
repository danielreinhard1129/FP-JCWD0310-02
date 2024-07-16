'use client';
import { useState } from 'react';
import { ArrowUpRight, ChevronRight, MoveUpRight } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useGetCategories } from '@/hooks/categories/useGetCategories';
import Link from 'next/link';
export default function Categories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data } = useGetCategories();
  const images = ['/landing_page/lifestyle.jpg', '/landing_page/sports.webp'];
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };
  return (
    <div className="bg-[#232321] font-rubik flex flex-col pt-20 gap-12 text-white h-fit md:w-[calc(100vw-16px)] w-[calc(100vw)] md:-ml-[33px] -ml-[16px]">
      <div className="flex justify-between w-full px-8">
        <div className="uppercase">
          <Label className="md:text-[60px] text-[30px] font-rubik font-bold">
            Categories
          </Label>
        </div>
        <div className="flex text-black gap-4">
          <div
            className="h-10 w-10 bg-[#E7E7E3] bg-opacity-50 rounded-lg flex justify-center items-center cursor-pointer"
            onClick={handlePrev}
          >
            <ChevronLeft />
          </div>
          <div
            className="h-10 w-10 bg-[#E7E7E3] rounded-lg flex justify-center items-center cursor-pointer"
            onClick={handleNext}
          >
            <ChevronRight />
          </div>
        </div>
      </div>

      <div className="pl-8">
        <div className="md:h-[400px] h-[600px] lg:h-[500px] uppercase rounded-tl-3xl overflow-hidden grid md:grid-cols-2">
          <div
            className="bg-center bg-no-repeat bg-cover relative"
            style={{
              backgroundImage: `url(${images[currentIndex]})`,
            }}
          >
            <div className="absolute text-black bottom-0 w-full flex justify-between items-center pb-4 px-8">
              <Label className="text-3xl cursor-pointer font-semibold">
                {data.categories[currentIndex].name}
              </Label>
              <Link
                href={'/products'}
                className="bg-black w-10 h-10 flex justify-center items-center rounded-lg p-2 cursor-pointer"
              >
                <ArrowUpRight className="text-white" />
              </Link>
            </div>
          </div>
          <div
            className="bg-center bg-no-repeat bg-cover relative"
            style={{
              backgroundImage: `url(${images[(currentIndex + 1) % images.length]})`,
            }}
          >
            <div className="absolute text-black bottom-0 w-full flex justify-between items-center pb-4 px-8">
              <Label className="text-3xl cursor-pointer font-semibold">
                {data.categories[(currentIndex + 1) % images.length].name}
              </Label>
              <Link
                href={'/products'}
                className="bg-black w-10 h-10 flex justify-center items-center rounded-lg p-2 cursor-pointer"
              >
                <ArrowUpRight className="text-white" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
