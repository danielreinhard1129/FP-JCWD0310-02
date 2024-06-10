import React from 'react';
import { Skeleton } from './ui/skeleton';

interface ProductCardAttribute {
  title: string | '';
  category: string | 'baju';
  price: number | 0;
  skeleton: boolean | 'false';
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
        <div className="w-[180px] rounded-[28px] bg-gray-400 h-[180px] flex flex-row items-start justify-start p-1 box-border relative gap-2">
          {param.skeleton ? (
            <>
              <Skeleton className="self-stretch w-[180px] relative rounded-3xl max-h-full object-cover z-0" />
            </>
          ) : (
            <>
              <img
                className="self-stretch w-[180px] relative rounded-3xl max-h-full object-cover z-0"
                alt=""
                src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png"
              />
              <div className="m-0 absolute rounded-tl-3xl rounded-tr-none rounded-br-3xl rounded-bl-none bg-yellow-500 flex flex-row items-start justify-start py-3 px-4 z-10">
                <div className="relative font-semibold">New</div>
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col items-start justify-start gap-[16px] text-lg">
          {param.skeleton ? (
            <>
              <div className="flex flex-col items-start justify-start gap-2">
                <Skeleton className="w-[180px] text-primary rounded-xl relative font-semibold inline-block h-6 shrink-0" />
                <Skeleton className="w-[180px] text-primary rounded-xl relative font-semibold inline-block h-6 shrink-0" />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-start justify-start">
                <div className="w-[180px] text-primary relative font-semibold inline-block h-14 shrink-0">
                  {param.title}
                </div>
              </div>
            </>
          )}
          <div className="self-stretch flex flex-col items-start justify-start text-[10px] text-pure-white">
            <div className="self-stretch rounded-lg bg-black h-12 flex flex-row items-center justify-center py-2 px-4 box-border">
              {param.skeleton ? (
                <>
                  <Skeleton className="relative tracking-[0.25px] uppercase font-medium" />
                </>
              ) : (
                <>
                  <div className="relative tracking-[0.25px] uppercase font-medium">
                    View Product - {priceFormat.format(param.price)}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
