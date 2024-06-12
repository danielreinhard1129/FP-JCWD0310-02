'use client';
import ProductCard from '@/components/ProductCard';
import SearchBarDebounce from '@/components/SearchBarDebounce';
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

import { useGetProducts } from '@/hooks/product/useGetProducts';
import { ArrowLeft, ArrowRight, ArrowUp, Check } from 'lucide-react';
import React from 'react';

const Loading = () => {
  const index = '123456789';
  const elementLoading = index.split('').map((val, index) => {
    return (
      <>
        <ProductCard category="" key={index} price={0} title="" skeleton />
      </>
    );
  });
  return elementLoading;
};

const ProductsPage = () => {
  const { data, isLoading, query, setQuery, setSearch } = useGetProducts();
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
        <SearchBarDebounce onValueChange={(e) => setSearch(e)} />
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
              className="grid grid-cols-[repeat(auto-fit,minmax(200px,230px))] justify-around"
            >
              {isLoading ? (
                Loading()
              ) : data?.dataWithStock?.productWithStock.length ? (
                data.dataWithStock.productWithStock.map((val, indx) => {
                  return (
                    <>
                      <ProductCard
                        key={indx}
                        title={val.name}
                        price={val.price}
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
