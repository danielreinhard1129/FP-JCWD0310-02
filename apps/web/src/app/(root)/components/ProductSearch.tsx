'use client';
import { useGetProduct } from '@/hooks/products/useGetProduct';
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const StateData = (label: string) => {
  return (
    <>
      <TableRow>
        <TableCell className="w-full">
          <Label>{label}</Label>
        </TableCell>
      </TableRow>
    </>
  );
};

const ProductSearch = () => {
  const { data, isLoading, query, setQuery, setSearch } = useGetProduct();
  const handlePrevPage = () => {
    if (query.page == 1) {
      return;
    }
    setQuery({ take: 10, page: query.page - 1 });
  };
  const handleNextPage = () => {
    setQuery({ take: 10, page: query.page + 1 });
  };
  return (
    <>
      <div>
        <Table>
          <TableCaption>Page {query.page}.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Warehouse ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data
              ? data.dataWithStock?.productWithStock
                ? data.dataWithStock.productWithStock.map((val) => (
                    <TableRow key={val.name}>
                      <TableCell className="font-medium">{val.id}</TableCell>
                      <TableCell>{val.name}</TableCell>
                      <TableCell>
                        {val.productCategory.length
                          ? val.productCategory.map(
                              (categoryVal) => categoryVal.category.name,
                            )
                          : ''}
                      </TableCell>
                      <TableCell>{val.price}</TableCell>
                      <TableCell>{val.stock.sum}</TableCell>
                      <TableCell>{val.warehouseId}</TableCell>
                    </TableRow>
                  ))
                : StateData('No Data Found !')
              : StateData('Loading...')}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
        <Input
          onChange={(e) => {
            setSearch(e.currentTarget.value);
          }}
          placeholder="search"
        />
        <Input
          onChange={(e) => {
            setQuery({
              ...query,
              filter: e.currentTarget.value,
            });
          }}
          placeholder="category"
        />
        <Input
          onChange={(e) => {
            setQuery({
              ...query,
              warehouse: Number(e.currentTarget.value) || undefined,
            });
          }}
          placeholder="warehouse"
        />
        <div className="flex flex-row gap-4 items-center justify-center pt-4">
          <Button onClick={handlePrevPage}>Prev</Button>
          <Button onClick={handleNextPage}>Next</Button>
        </div>
      </div>
    </>
  );
};

export default ProductSearch;
