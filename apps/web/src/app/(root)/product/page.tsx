'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

import { useGetProduct } from '@/hooks/product/useGetProduct';
import { ArrowLeft, ArrowRight, ArrowUp, Check } from 'lucide-react';
import React from 'react';

const Loading = () => {
  const index = '123456789';
  const elementLoading = index.split('').map((val, index) => {
    return (
      <>
        <div
          id="product-1"
          className="w-full relative my-2 flex flex-col items-center justify-start gap-5 text-left text-xs text-white"
        >
          <div className="w-[180px] rounded-[28px] bg-gray-400 h-[180px] flex flex-row items-start justify-start p-1 box-border relative gap-2">
            <Skeleton className="self-stretch w-[180px] relative rounded-3xl max-h-full object-cover z-0" />
          </div>
          <div className="flex flex-col items-start justify-start gap-[16px] text-lg">
            <div className="flex flex-col items-start justify-start gap-2">
              <Skeleton className="w-[180px] text-primary rounded-xl relative font-semibold inline-block h-6 shrink-0" />
              <Skeleton className="w-[180px] text-primary rounded-xl relative font-semibold inline-block h-6 shrink-0" />
            </div>
            <div className="self-stretch flex flex-col items-start justify-start text-[10px] text-pure-white">
              <div className="self-stretch rounded-lg bg-black h-12 flex flex-row items-center justify-center py-2 px-4 box-border">
                <Skeleton className="relative tracking-[0.25px] uppercase font-medium" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  });
  return elementLoading;
};

const ProductsPage = () => {
  const { data, isLoading, query, setQuery, setSearch } = useGetProduct();
  const priceFormat = new Intl.NumberFormat('id-ID', {
    currency: 'IDR',
    style: 'currency',
  });
  const handlePrevPage = () => {
    if (query.page >= 2) {
      setQuery({
        ...query,
        page: query.page - 1,
      });
    }
  };
  const handleNextPage = () => {
    if (data?.dataWithStock) {
      setQuery({
        ...query,
        page: query.page + 1,
      });
    }
  };
  return (
    <>
      <div className="w-full">
        <div id="title">
          <div id="top" className="flex flex-col">
            <div
              id="title-summary"
              className="flex flex-row justify-between items-center"
            >
              <Label className="md:text-3xl text-xl">Life Style Shoes</Label>
              <div className="flex items-center">
                <Select onValueChange={(e) => alert(e)}>
                  <SelectTrigger className="w-56">
                    <SelectValue
                      placeholder="Select category"
                      style={{ color: 'red' }}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Baju">Baju</SelectItem>
                      <SelectItem value="Jeans">Jeans</SelectItem>
                      <SelectItem value="Jaket">Jaket</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Label className="text-xs">122 Items</Label>
          </div>
        </div>
        <div id="content-product" className="flex gap-8 pt-8">
          <div id="sidebar" className="w-[30vw] md:flex flex-col gap-4 hidden">
            <Label>Filters</Label>
            <div id="filter-size" className="font-semibold">
              <div className="flex justify-between my-2">
                <Label>SIZE</Label>
                <ArrowUp width={20} />
              </div>
              <div
                id="size-icon"
                className="grid grid-cols-[repeat(auto-fit,minmax(25px,35px))] gap-2"
              >
                <div className="w-8 h-8 bg-red-400 rounded-md flex justify-center items-center text-sm">
                  XS
                </div>
                <div className="w-8 h-8 bg-red-400 rounded-md flex justify-center items-center text-sm">
                  S
                </div>
                <div className="w-8 h-8 bg-red-400 rounded-md flex justify-center items-center text-sm">
                  M
                </div>
                <div className="w-8 h-8 bg-red-400 rounded-md flex justify-center items-center text-sm">
                  L
                </div>
                <div className="w-8 h-8 bg-red-400 rounded-md flex justify-center items-center text-sm">
                  XL
                </div>
                <div className="w-8 h-8 bg-red-400 rounded-md flex justify-center items-center text-sm">
                  XXL
                </div>
              </div>
            </div>
            <div id="filter-color">
              <div className="flex justify-between my-2">
                <Label>COLOR</Label>
                <ArrowUp width={20} />
              </div>
              <div
                id="size-icon"
                className="grid grid-cols-[repeat(auto-fit,minmax(25px,35px))] gap-2"
              >
                <div className="w-8 h-8 bg-red-400 rounded-md flex justify-center items-center text-sm"></div>
                <div className="w-8 h-8 bg-blue-400 rounded-md flex justify-center items-center text-sm"></div>
                <div className="w-8 h-8 bg-yellow-400 rounded-md flex justify-center items-center text-sm"></div>
                <div className="w-8 h-8 bg-black rounded-md flex justify-center items-center text-sm"></div>
                <div className="w-8 h-8 bg-slate-400 rounded-md flex justify-center items-center text-sm"></div>
                <div className="w-8 h-8 bg-purple-400 rounded-md flex justify-center items-center text-sm"></div>
              </div>
            </div>
            <div id="filter-category" className="font-medium text-xs my-2">
              <Label>CATEGORY</Label>
              <div className="flex flex-col my-2 gap-1">
                <div
                  onClick={() => setQuery({ ...query, filter: 'Baju' })}
                  className="flex gap-2 items-center cursor-pointer"
                >
                  <div className="w-[10px] h-[10px] border border-black flex justify-center items-center">
                    {query.filter == 'Baju' ? <Check width={8} /> : ''}
                  </div>
                  <p>Baju</p>
                </div>
                <div
                  onClick={() => setQuery({ ...query, filter: 'Jaket' })}
                  className="flex gap-2 items-center cursor-pointer"
                >
                  <div className="w-[10px] h-[10px] border border-black flex justify-center items-center">
                    {query.filter == 'Jaket' ? <Check width={8} /> : ''}
                  </div>
                  <p>Jaket</p>
                </div>
                <div
                  onClick={() => setQuery({ ...query, filter: 'Tank Top' })}
                  className="flex gap-2 items-center cursor-pointer"
                >
                  <div className="w-[10px] h-[10px] border border-black flex justify-center items-center">
                    {query.filter == 'Tank Top' ? <Check width={8} /> : ''}
                  </div>
                  <p>Tank Top</p>
                </div>
              </div>
            </div>
            <div id="filter-gender" className="font-medium text-xs">
              <Label>GENDER</Label>
              <div className="flex flex-col my-2 gap-1">
                <div className="flex gap-2 items-center">
                  <div className="w-2 h-2 border border-black"></div>
                  <p>Men</p>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="w-2 h-2 border border-black"></div>
                  <p>Women</p>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="w-2 h-2 border border-black"></div>
                  <p>Kid</p>
                </div>
              </div>
            </div>
            <div id="filter-price">
              <Label>PRICE</Label>
              <Input className="w-36 my-2" placeholder="Minimum price" />
              <Input className="w-36" placeholder="Maximum price" />
            </div>
          </div>

          <div className="w-full flex-col">
            <div
              id="product-list"
              className="grid grid-cols-[repeat(auto-fit,minmax(180px,200px))] justify-around gap-2"
            >
              {isLoading ? (
                Loading()
              ) : data?.dataWithStock?.productWithStock.length ? (
                data.dataWithStock.productWithStock.map((val) => {
                  return (
                    <>
                      <div
                        id="product-1"
                        className="w-full my-2 relative flex flex-col items-center justify-start gap-5 text-left text-xs text-white"
                      >
                        <div className="w-[180px] rounded-[28px] bg-gray-400 h-[180px] flex flex-row items-start justify-start p-1 box-border relative gap-2">
                          <img
                            className="self-stretch w-[180px] relative rounded-3xl max-h-full object-cover z-0"
                            alt=""
                            src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png"
                          />
                          <div className="m-0 absolute rounded-tl-3xl rounded-tr-none rounded-br-3xl rounded-bl-none bg-yellow-500 flex flex-row items-start justify-start py-3 px-4 z-10">
                            <div className="relative font-semibold">New</div>
                          </div>
                        </div>
                        <div className="flex flex-col items-start justify-start gap-[16px] text-lg">
                          <div className="flex flex-col items-start justify-start">
                            <div className="w-[180px] text-primary relative font-semibold inline-block h-14 shrink-0">
                              {val.name}
                            </div>
                          </div>
                          <div className="self-stretch flex flex-col items-start justify-start text-[10px] text-pure-white">
                            <div className="self-stretch rounded-lg bg-black h-12 flex flex-row items-center justify-center py-2 px-4 box-border">
                              <div className="relative tracking-[0.25px] uppercase font-medium">
                                View Product - {priceFormat.format(val.price)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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
            <div
              id="pagination-page"
              className="flex w-full justify-center mt-8 mb-16 gap-3"
            >
              <div
                id="prev-page"
                onClick={handlePrevPage}
                className="rounded-lg border cursor-pointer border-black w-24 h-6 px-2 flex justify-between items-center"
              >
                <ArrowLeft width={10} />
                <p className="text-sm h-full">Previous</p>
              </div>
              <div
                id="select-page-active"
                className="rounded-lg bg-black text-white w-6 h-6 text-center flex justify-between items-center"
              >
                <p className="text-sm w-full h-full">{query.page}</p>
              </div>
              <div
                id="next-page"
                onClick={handleNextPage}
                className="rounded-lg border cursor-pointer border-black w-24 h-6 px-2 flex justify-between items-center"
              >
                <p className="text-sm h-full">Previous</p>
                <ArrowRight width={10} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
