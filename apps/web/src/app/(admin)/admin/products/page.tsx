'use client';
import React from 'react';
import { useGetProducts } from '@/hooks/products/useGetProducts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import DataTables from '@/components/dashboard/DataTables';
const AdminDashboardProductPage = () => {
  const { data, isLoading, query, setQuery, getProduct } = useGetProducts({
    page: 1,
    take: 10,
  });

  return (
    <>
      <div className="p-8">
        <Card className="border border-black">
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
              data={data?.data}
              refetch={getProduct}
            />
            <div className="flex gap-4 mt-4 justify-end">
              <Button
                disabled={query.page == 1}
                onClick={() =>
                  query.page > 1 && setQuery({ ...query, page: query.page - 1 })
                }
              >
                Previous
              </Button>
              <Button
                disabled={!data?.data || data?.data.length < 10}
                onClick={() =>
                  data?.data.length &&
                  setQuery({ ...query, page: query.page + 1 })
                }
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminDashboardProductPage;
