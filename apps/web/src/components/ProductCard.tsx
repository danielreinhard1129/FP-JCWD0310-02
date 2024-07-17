import React from 'react';
import { Skeleton } from './ui/skeleton';
import Image from 'next/image';
import { BASE_API_URL } from '@/utils/config';
import { Label } from './ui/label';
import Link from 'next/link';

interface ProductCardAttribute {
  title: string | '';
  category: string | 'baju';
  price: number | 0;
  created: Date;
  images?: string;
  skeleton: boolean | Boolean | 'false';
  productId: number;
}

const ProductCard = (param: ProductCardAttribute) => {
  const priceFormat = new Intl.NumberFormat('id-ID', {
    currency: 'IDR',
    style: 'currency',
  });
  return (
    <>
      <div
        id="product-1"
        className="w-full my-2 relative flex flex-col items-center justify-start gap-5 text-left text-xs text-white"
      >
        <div className="md:w-[180px] w-40 rounded-[28px] bg-white md:h-[180px] h-40 flex flex-row items-start justify-start p-1 box-border relative gap-2">
          {param.skeleton ? (
            <>
              <Skeleton className="self-stretch w-[180px] relative rounded-3xl max-h-full object-cover z-0" />
            </>
          ) : param.images ? (
            <>
              <Image
                width={200}
                height={200}
                className="self-stretch w-[180px] relative rounded-3xl max-h-full object-cover z-0"
                alt="Images"
                src={`${BASE_API_URL}/assets/${param.images || ''}`}
              />
              {new Date().setMonth(new Date().getMonth() - 1) <
              +new Date(param.created) ? (
                <div className="absolute rounded-tl-3xl rounded-tr-none rounded-br-3xl rounded-bl-none bg-blue-500 flex flex-row items-start justify-start py-2 px-4 z-10">
                  <div className="relative text-xs font-semibold">New</div>
                </div>
              ) : null}
            </>
          ) : (
            <>
              <div className="flex justify-center items-center w-full h-full">
                <Label className="text-xs">No images for this product</Label>
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col items-start justify-start text-lg">
          {param.skeleton ? (
            <>
              <div className="flex flex-col items-start justify-start gap-2">
                <Skeleton className="md:w-[180px] w-40 text-primary rounded-xl relative font-semibold inline-block h-6 shrink-0" />
                <Skeleton className="md:w-[180px] w-40 text-primary rounded-xl relative font-semibold inline-block h-6 shrink-0" />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-start justify-start">
                <div className="md:w-[180px] w-40 text-primary relative text-base font-semibold font-rubik inline-block h-14">
                  {param.title}
                </div>
              </div>
            </>
          )}
          <div className="w-full flex flex-col items-start justify-start text-[10px] text-pure-white">
            <Link
              href={'/products/' + param.productId}
              className="self-stretch rounded-lg bg-black h-12 flex flex-row items-center justify-center py-2 px-4 box-border"
            >
              {param.skeleton ? (
                <>
                  <Skeleton className="relative tracking-[0.25px] uppercase font-medium" />
                </>
              ) : (
                <>
                  <div className="relative tracking-[0.25px] font-semibold font-rubik">
                    {priceFormat.format(param.price)}
                  </div>
                </>
              )}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
