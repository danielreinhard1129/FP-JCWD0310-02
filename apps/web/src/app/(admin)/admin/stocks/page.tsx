'use client';
import React, { useEffect, useState } from 'react';
import { useGetProducts } from '@/hooks/products/useGetProducts';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PaginationPage from '@/components/PaginationPage';
import Link from 'next/link';
import { Variant } from '@/types/product.type';
import Image from 'next/image';
import { NEXT_PUBLIC_BASE_API_URL } from '@/utils/config';
import DataTables from '@/components/dashboard/DataTables';

const AdminDashboardStocksPage = () => {
  const { data, isLoading, query, setQuery, getProduct } = useGetProducts({
    page: 1,
    take: 10,
  });

  return (
    <>
      <div className="px-4 py-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>List Product</CardTitle>
              <Link href="/admin/products/create">
                <Button>Create Product</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <DataTables
              loading={isLoading}
              data={data ? data.data : undefined}
              refetch={getProduct}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminDashboardStocksPage;
