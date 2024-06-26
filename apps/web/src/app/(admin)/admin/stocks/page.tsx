'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useGetStocks from '@/hooks/stocks/useGetStocks';
import DataTablesStocks from '@/components/dashboard/DataTablesStocks';
import { useAppSelector } from '@/redux/hooks';
import { Select } from 'antd';

const AdminDashboardStocksPage = () => {
  const dummyWarehouse = [
    { value: 1, label: 'Kaliurang' },
    { value: 2, label: 'Pogung' },
  ];
  const warehouseId = useAppSelector((state) => state.admin.warehouseId);
  const { data, mutation, setQuery, query } = useGetStocks({
    warehouseId: warehouseId || 0,
  });
  useEffect(() => {
    mutation.mutate();
  }, []);
  return (
    <>
      <div className="px-4 py-4">
        <Card>
          <CardHeader>
            {warehouseId ? (
              ''
            ) : (
              <CardTitle>Your admin status is not on any warehouse?</CardTitle>
            )}
            <CardTitle>List Product</CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              defaultValue={dummyWarehouse[0]}
              onChange={(e) => setQuery({ ...query, warehouseId: Number(e) })}
              loading={mutation.isLoading}
              options={dummyWarehouse}
            />
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
