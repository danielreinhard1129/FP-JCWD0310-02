'use client';
import React, { useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { useGetProduct } from '@/hooks/products/useGetProduct';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetProducts } from '@/hooks/products/useGetProducts';
import Image from 'next/image';
import { NEXT_PUBLIC_BASE_API_URL } from '@/utils/config';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

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
      <section className="w-[80vw] bg-gray-300 py-8 rounded-xl">
        <div
          id="content"
          className="p-4 flex flex-col md:flex-row w-full h-full gap-8"
        >
          <div id="left-content" className="w-full gap-4">
            {isLoading ? (
              <>
                <Skeleton className="w-40 h-40" />
                <Skeleton className="w-40 h-40" />
                <Skeleton className="w-40 h-40" />
                <Skeleton className="w-40 h-40" />
              </>
            ) : data?.data.productImages.length ? (
              <div className="grid">
                <Carousel className="w-full border border-input rounded-xl p-2 bg-slate-200">
                  <CarouselContent>
                    {data && data.data.productImages.length ? (
                      data.data.productImages.map((val, index) => (
                        <CarouselItem key={index}>
                          <div className="p-1">
                            <Card>
                              <CardContent className="flex aspect-square items-center justify-center p-6 relative">
                                <Image
                                  src={`${NEXT_PUBLIC_BASE_API_URL}assets/${val.url}`}
                                  alt="image"
                                  width={200}
                                  height={200}
                                  className="w-full h-full rounded-lg"
                                />
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))
                    ) : (
                      <CarouselItem>
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center">
                            <Label>
                              No Images....Please upload your images
                            </Label>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    )}
                  </CarouselContent>
                  <CarouselPrevious className="left-4 border-black" />
                  <CarouselNext className="right-4 border-black" />
                </Carousel>
              </div>
            ) : (
              <div className="w-full col-span-2 flex justify-center items-center rounded-lg h-full bg-white">
                <Label>No images for this product</Label>
              </div>
            )}
          </div>
          <div
            id="right-content"
            className="max-w-[400px] w-full flex flex-col gap-4"
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
                  {data ? priceFormat.format(data.data.price) : 'Rp Nan'}
                </Label>
              </>
            )}

            <div className="flex flex-col gap-4">
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
                  <div>
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
                      {data
                        ? data.data.variant.map((variant, idx) => {
                            return (
                              <div
                                key={idx}
                                className="w-8 h-8 bg-primary text-primary-foreground rounded-md flex justify-center items-center"
                              >
                                {variant.size}
                              </div>
                            );
                          })
                        : null}
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <Label className="text-base">COLOR</Label>
                      <Label className="underline font-medium text-xs">
                        SIZE CHART
                      </Label>
                    </div>
                    <div
                      id="size-select"
                      className="grid grid-cols-[repeat(auto-fit,minmax(32px,32px))] gap-[4px] text-xs"
                    >
                      {data
                        ? data.data.variant.map((variant, idx) => {
                            return (
                              <div
                                key={idx}
                                style={{ backgroundColor: variant.color }}
                                className="w-8 h-8 text-primary-foreground rounded-md flex justify-center items-center text-xs"
                              ></div>
                            );
                          })
                        : null}
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
                    created={new Date()}
                    title="ADIDAS 4DFWD X PARLEY RUNNING SHOES"
                    skeleton={isLoadingSuggestion}
                  />
                  <ProductCard
                    category="baju"
                    price={125000}
                    created={new Date()}
                    title="ADIDAS 4DFWD X PARLEY RUNNING SHOES"
                    skeleton={isLoadingSuggestion}
                  />
                  <ProductCard
                    category="baju"
                    price={125000}
                    created={new Date()}
                    title="ADIDAS 4DFWD X PARLEY RUNNING SHOES"
                    skeleton={isLoadingSuggestion}
                  />
                </>
              </>
            ) : dataSuggestion?.data.length ? (
              dataSuggestion.data.map((val, indx) => {
                return (
                  <Link href={'/products/' + val.id} key={indx}>
                    <ProductCard
                      key={indx}
                      title={val.name}
                      price={val.price}
                      created={val.createdAt}
                      images={val.productImages[0].url}
                      category="baju"
                      skeleton={false}
                    />
                  </Link>
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
