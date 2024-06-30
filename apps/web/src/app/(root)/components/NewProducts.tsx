'use client';
import { useGetProducts } from '@/hooks/products/useGetProducts';
import { BASE_API_URL } from '@/utils/config';
import Image from 'next/image';
import Link from 'next/link';

export default function NewProducts() {
  const { data } = useGetProducts({
    page: 1,
    take: 4,
  });
  return (
    <>
      <div className="flex flex-wrap justify-center lg:justify-between gap-6">
        {data &&
          data?.data?.map((product, index) => {
            return (
              <Link
                href={'/products' + product.id}
                key={index}
                className="flex flex-col gap-y-6  sm:w-6  lg:w-72"
              >
                <div className="relative bg-white w-full h-80 p-3 rounded-3xl">
                  <Image
                    width={400}
                    height={400}
                    src={`${BASE_API_URL}assets/${product.productImages[0].url}`}
                    alt=""
                    className="w-full h-full object-cover object-center rounded-3xl"
                  />
                  <div className="absolute p-2 px-8 top-3 left-3 text-lg text-white font-semibold bg-indigo-500 rounded-tl-xl rounded-br-xl">
                    New
                  </div>
                </div>
                <div className="text-2xl font-semibold">{product.name}</div>
                <button className="p-4 rounded-xl bg-neutral-800 text-white font-semibold">
                  View Products
                </button>
              </Link>
            );
          })}
      </div>
    </>
  );
}
