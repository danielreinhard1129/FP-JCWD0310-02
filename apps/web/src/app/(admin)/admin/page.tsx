'use client';
import { Label } from '@/components/ui/label';
import { Breadcrumb } from 'antd';
import { Calendar } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useGetSalesReports } from '@/hooks/reports/useGetSalesReports';
import { useGetStocksReports } from '@/hooks/reports/useGetStocksReports';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OverviewSales from './components/OverviewSales';
import OverviewStocks from './components/OverviewStocks';
import { useAppSelector } from '@/redux/hooks';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetWarehouses } from '@/hooks/warehouses/useGetWarehouses';

const DashboardPage = () => {
  const admin = useAppSelector((state) => state.admin);
  const [warehouse, setWarehouse] = useState<number | undefined>(
    admin.warehouseId,
  );
  const { getWarehouses } = useGetWarehouses(undefined);
  const { dataStocks, isLoading: isLoadingStock } =
    useGetStocksReports(warehouse);
  const { data, isLoading } = useGetSalesReports(warehouse);

  return (
    <section
      className={`p-8 flex relative flex-col gap-4 font-rubik ${(isLoading || isLoadingStock) && 'opacity-30'}`}
    >
      <div className="flex justify-between">
        <Breadcrumb
          className="font-rubik text-black"
          separator=">"
          items={[{ title: 'Home' }, { title: 'Dashboard' }]}
        />
        <div className="flex gap-2 items-center">
          <div></div>
          <div className="flex gap-2 items-center">
            <Calendar className="w-6" />
            <Label>Feb 16,2024 - Feb 20,2022</Label>
          </div>
        </div>
      </div>
      <Tabs defaultValue="sales">
        <TabsList className="p-1">
          <TabsTrigger value="sales">Sales Overview</TabsTrigger>
          <TabsTrigger value="stocks">Stocks Overview</TabsTrigger>
          <div className="ml-2 py-2 w-fit transition-all duration-500">
            <Select onValueChange={(e) => setWarehouse(Number(e))}>
              <SelectTrigger className="h-8 ring-transparent focus:ring-transparent p-2">
                <SelectValue placeholder="Select Warehouse" />
              </SelectTrigger>
              <SelectContent className="ring-transparent focus:ring-transparent">
                <SelectGroup>
                  {getWarehouses.data?.data.data.map((val, indx) => {
                    return (
                      <SelectItem key={indx} value={String(val.id)}>
                        {val.name}-{val.id}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </TabsList>
        <TabsContent value="sales">
          <OverviewSales dataSales={data} />
        </TabsContent>
        <TabsContent value="stocks">
          <OverviewStocks dataStocks={dataStocks} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default DashboardPage;
