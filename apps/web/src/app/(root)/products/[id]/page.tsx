'use client';
import React, { useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { useGetProduct } from '@/hooks/products/useGetProduct';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetProducts } from '@/hooks/products/useGetProducts';

const ProductDetailPage = ({ params }: { params: { id: number } }) => {
  const { data, isLoading } = useGetProduct(params.id);
  const {
    data: dataSuggestion,
    isLoading: isLoadingSuggestion,
    query,
    setQuery,
  } = useGetProducts({ take: 3, page: 1 });
  const priceFormat = new Intl.NumberFormat('id-Id', {
    style: 'currency',
    currency: 'IDR',
  });
  return (
    <>
      <title>Jaket Kulit</title>
      <section className="w-full bg-gray-300 py-8">
        <div
          id="content"
          className="p-4 grid md:grid-flow-col-dense grid-flow-row-dense gap-8"
        >
          <div
            id="left-content"
            className="w-full h-fit grid grid-cols-2 gap-4"
          >
            {isLoading ? (
              <>
                <Skeleton className="w-40 h-40" />
                <Skeleton className="w-40 h-40" />
                <Skeleton className="w-40 h-40" />
                <Skeleton className="w-40 h-40" />
              </>
            ) : (
              data?.data.productImages.map((val) => {
                return (
                  <>
                    <img
                      alt="image"
                      src={`http://localhost:3000/api/${val.url}`}
                      className=""
                      width={100}
                      height={100}
                    />
                  </>
                );
              })
            )}
          </div>
          <div
            id="right-content"
            className="md:w-[30vw] w-full flex flex-col gap-4"
          >
            {isLoading ? (
              <>
                <Skeleton className="cursor-none text-xs w-28 p-2 h-10" />
                <Skeleton className="cursor-none text-xs w-full p-2 h-8" />
                <Skeleton className="cursor-none text-xs w-full p-2 h-8" />
                <Skeleton className="cursor-none text-xs w-28 p-2 h-8" />
              </>
            ) : (
              <>
                <Button className="cursor-none text-xs w-28 p-2 h-10 bg-blue-500">
                  New Release
                </Button>
                <Label className="font-bold text-2xl">{data?.data.name}</Label>
                <Label className="font-bold text-lg text-blue-500">
                  {data ? priceFormat.format(0) : 'Rp Nan'}
                </Label>
              </>
            )}

            <div className="flex flex-col">
              {isLoading ? (
                <>
                  <div className="flex justify-between mt-2 items-center">
                    <Skeleton className="w-12 h-6" />
                    <Skeleton className="w-20 h-6" />
                  </div>
                  <Skeleton className="w-full h-8 mt-1" />
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <Label className="text-base">SIZE</Label>
                    <Label className="underline font-medium text-xs">
                      SIZE CHART
                    </Label>
                  </div>
                  <div
                    id="size-select"
                    className="grid grid-cols-[repeat(auto-fit,minmax(32px,32px))] gap-[4px] text-xs"
                  >
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-md flex justify-center items-center">
                      XS
                    </div>
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-md flex justify-center items-center">
                      S
                    </div>
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-md flex justify-center items-center">
                      M
                    </div>
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-md flex justify-center items-center">
                      L
                    </div>
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-md flex justify-center items-center">
                      XL
                    </div>
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-md flex justify-center items-center">
                      XXL
                    </div>
                  </div>
                </>
              )}
            </div>
            <div id="button-group" className="gap-1 flex flex-col">
              {isLoading ? (
                <>
                  <div className="flex gap-1 w-full">
                    <Skeleton className="h-8 w-full basis-full" />
                    <Skeleton className="h-8 w-8 basis-10" />
                  </div>
                  <Skeleton className="w-full h-8" />
                </>
              ) : (
                <>
                  <div className="flex gap-1 w-full">
                    <div className="basis-full font-bold text-sm flex justify-center items-center bg-primary text-primary-foreground rounded-md">
                      Add To Cart
                    </div>
                    <div className="w-8 h-8 basis-10 bg-primary grid justify-center rounded-md items-center">
                      <Heart className="text-primary-foreground" width={16} />
                    </div>
                  </div>
                  <div className="w-full h-8 bg-blue-500 text-sm rounded-md flex justify-center items-center font-bold text-primary-foreground">
                    BUY IT NOW
                  </div>
                </>
              )}
            </div>
            <div>
              {isLoading ? (
                <>
                  <Skeleton className="w-full h-40" />
                </>
              ) : (
                <>
                  <p>{data?.data.description}</p>
                </>
              )}
            </div>
          </div>
        </div>
        <div id="suggestion" className="grid w-full md:px-8 px-1">
          <div id="title-suggestion" className="px-4 flex w-full py-2">
            <Label className="text-2xl">You may also like</Label>
          </div>
          <div
            id="suggestion-carousell"
            className="grid grid-cols-[repeat(auto-fit,minmax(180px,200px))] justify-around w-full"
          >
            {isLoading ? (
              <>
                <>
                  <ProductCard
                    category="baju"
                    price={125000}
                    title="ADIDAS 4DFWD X PARLEY RUNNING SHOES"
                    skeleton={isLoadingSuggestion}
                  />
                  <ProductCard
                    category="baju"
                    price={125000}
                    title="ADIDAS 4DFWD X PARLEY RUNNING SHOES"
                    skeleton={isLoadingSuggestion}
                  />
                  <ProductCard
                    category="baju"
                    price={125000}
                    title="ADIDAS 4DFWD X PARLEY RUNNING SHOES"
                    skeleton={isLoadingSuggestion}
                  />
                </>
              </>
            ) : dataSuggestion?.data.length ? (
              dataSuggestion.data.map((val, indx) => {
                return (
                  <>
                    <ProductCard
                      key={indx}
                      title={val.name}
                      price={0}
                      category="baju"
                      skeleton={false}
                    />
                  </>
                );
              })
            ) : (
              <>
                <div className="w-full flex justify-center items-center">
                  <Label>Product is not available</Label>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetailPage;
