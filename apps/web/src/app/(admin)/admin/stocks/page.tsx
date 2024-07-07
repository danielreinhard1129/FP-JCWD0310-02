'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useGetStocks from '@/hooks/stocks/useGetStocks';
import DataTablesStocks from '@/app/(admin)/admin/stocks/components/DataTablesStocks';
import { useAppSelector } from '@/redux/hooks';
import { Popover, Select } from 'antd';
import { useGetWarehouses } from '@/hooks/warehouses/useGetWarehouses';
import { Label } from '@/components/ui/label';
import { RotateCcw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useDebounce } from 'use-debounce';
import SearchBarDebounce from '@/components/SearchBarDebounce';

const AdminDashboardStocksPage = () => {
  const user = useAppSelector((state) => state.user);
  const warehouse = useAppSelector((state) => state.admin);
  const { getWarehouses } = useGetWarehouses(warehouse.warehouseId);
  const { mutation, setQuery, query } = useGetStocks({
    warehouseId: Number(warehouse.warehouseId),
  });

  return (
    <>
      <div className="p-8">
        <Card className="border border-black">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Stock Management</CardTitle>
              <Popover content="Refresh the tables">
                <div
                  onClick={() => mutation.mutate()}
                  className="flex cursor-pointer justify-center items-center w-8 h-8 rounded-lg border border-input"
                >
                  <RotateCcw width={15} />
                </div>
              </Popover>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="w-52 font-rubik">
                  <SearchBarDebounce
                    onValueChange={(e) => setQuery({ ...query, product: e })}
                  />
                </div>
                <Select
                  className="w-52 h-10 border font-rubik border-black rounded-lg text-black"
                  defaultValue={{
                    value: warehouse.warehouseId,
                    label: warehouse.warehouse,
                  }}
                  onChange={(e) =>
                    setQuery({ ...query, warehouseId: Number(e) })
                  }
                  loading={mutation.isLoading}
                  options={getWarehouses.data?.data?.data.map((val) => {
                    return {
                      value: val.id,
                      label: val.name,
                    };
                  })}
                  disabled={
                    user.role == 'CUSTOMER' || user.role == 'WAREHOUSE_ADMIN'
                  }
                />
              </div>
              <DataTablesStocks
                data={mutation.data?.data}
                loading={mutation.isLoading}
                refetch={mutation.mutate}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminDashboardStocksPage;
