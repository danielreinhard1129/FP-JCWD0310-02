'use client';
import FilterProducts from '@/components/FilterProducts';
import PaginationPage from '@/components/PaginationPage';
import ProductCard from '@/components/ProductCard';
import SearchBarDebounce from '@/components/SearchBarDebounce';
import { Label } from '@/components/ui/label';
import { useGetProducts } from '@/hooks/products/useGetProducts';
import React, { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

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
  const [categories, setCategories] = useState<string[]>([]);
  const [size, setSize] = useState<string[]>([]);
  const [color, setColor] = useState<string[]>([]);
  const { data, isLoading, query, setQuery, setSearch } = useGetProducts({
    page: 1,
    take: 3,
  });
  const debounceCategory = useDebouncedCallback(() => {
    setQuery({
      ...query,
      filter: categories.join(','),
      size: size.join(','),
      color: color.join(','),
    });
  }, 800);
  useEffect(() => {
    debounceCategory();
  }, [size, categories, color]);
  return (
    <>
      <div className="w-screen px-20 py-8">
        <SearchBarDebounce onValueChange={(e) => setSearch(e)} />
        <div id="title">
          <div id="top" className="flex flex-col">
            <div
              id="title-summary"
              className="flex flex-row justify-between items-center"
            >
              <Label className="md:text-3xl text-xl">Life Style Shoes</Label>
            </div>
            <Label className="text-xs">122 Items</Label>
          </div>
        </div>
        <div id="content-product" className="flex gap-8 pt-8">
          <div id="sidebar" className="w-[30vw] md:flex flex-col gap-4 hidden">
            <FilterProducts
              handleCategories={(e) => setCategories(e)}
              handleSize={(e) => setSize(e)}
              handleColor={(e) => setColor(e)}
            />
          </div>

          <div className="w-full flex-col">
            <div
              id="product-list"
              className="grid grid-cols-[repeat(auto-fit,minmax(200px,200px))] justify-around"
            >
              {isLoading ? (
                Loading()
              ) : data?.data.length ? (
                data.data.map((val, indx) => {
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
            <div
              id="pagination-page"
              className="flex w-full justify-center mt-8 mb-16 gap-3"
            >
              <PaginationPage
                take={query.take}
                page={query.page}
                query={query}
                count={data?.count || 0}
                setQuery={setQuery}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;