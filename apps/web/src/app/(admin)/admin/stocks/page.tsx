'use client';
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useGetStocks from '@/hooks/stocks/useGetStocks';
import DataTablesStocks from '@/components/dashboard/DataTablesStocks';

const AdminDashboardStocksPage = () => {
  const { data, mutation, setQuery } = useGetStocks();
  useEffect(() => {
    mutation.mutate();
  }, []);
  return (
    <>
      <div className="px-4 py-4">
        <Card>
          <CardHeader>
            <CardTitle>List Product</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTablesStocks
              data={mutation.data?.data}
              loading={mutation.isLoading}
              refetch={mutation.mutate}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminDashboardStocksPage;
