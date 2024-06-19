'use client';
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
import { useGetProducts } from '@/hooks/products/useGetProducts';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PaginationPage from '@/components/PaginationPage';

const AdminDashboardProductPage = () => {
  const { data, isLoading, query, setQuery, setSearch } = useGetProducts({
    page: 1,
    take: 2,
  });
  return (
    <>
      <div className="px-4 py-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>List Product</CardTitle>
              <Button>Create Product</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Name</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="">
                {data?.data.map((val) => (
                  <TableRow key={val.id}>
                    <TableCell className="font-medium">{val.name}</TableCell>
                    <TableCell>{0}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                {/* <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow> */}
              </TableFooter>
            </Table>
          </CardContent>
          <CardFooter>
            <PaginationPage
              page={query.page}
              take={query.take}
              setQuery={setQuery}
              query={query}
              count={data?.count || 0}
            />
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default AdminDashboardProductPage;
