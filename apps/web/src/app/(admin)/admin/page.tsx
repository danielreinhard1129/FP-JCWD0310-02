'use client';
import { Label } from '@/components/ui/label';
import { Breadcrumb, DatePicker } from 'antd';
import { Calendar } from 'lucide-react';
import React, { useState } from 'react';
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
import dayjs from 'dayjs';

const DashboardPage = () => {
  const admin = useAppSelector((state) => state.admin);
  const user = useAppSelector((state) => state.user);
  const { getWarehouses } = useGetWarehouses(undefined);
  const [warehouse, setWarehouse] = useState<number | undefined>(
    admin.warehouseId,
  );
  const [rangeDate, setRangeDate] = useState<any>([
    dayjs(new Date()),
    dayjs(new Date()).add(30, 'day'),
  ]);
  const { dataStocks, isLoading: isLoadingStock } = useGetStocksReports({
    warehouseId: warehouse,
    date: {
      startDate: rangeDate ? dayjs(rangeDate[0]).toISOString() : undefined,
      endDate: rangeDate ? dayjs(rangeDate[1]).toISOString() : undefined,
    },
  });
  const { data, isLoading } = useGetSalesReports({
    warehouseId: warehouse,
    date: {
      startDate: rangeDate ? dayjs(rangeDate[0]).toISOString() : undefined,
      endDate: rangeDate ? dayjs(rangeDate[1]).toISOString() : undefined,
    },
  });

  return (
    <section
      className={`p-8 flex relative flex-col gap-4 font-rubik ${(isLoading || isLoadingStock) && 'opacity-30'}`}
    >
      <div className="flex justify-end">
        <div className="flex gap-2 items-center">
          <div className="flex gap-2 items-center border border-black bg-white p-2 rounded-lg">
            <Calendar className="w-6" />
            <DatePicker.RangePicker
              value={rangeDate}
              allowEmpty
              className="font-rubik text-black font-medium border-black pr-0"
              suffixIcon=""
              picker="week"
              format="DD-MMM-YYYY"
              onChange={(e) => setRangeDate(e)}
              id={{
                start: 'startInput',
                end: 'endInput',
              }}
            />
          </div>
        </div>
      </div>
      <Tabs defaultValue="sales">
        <TabsList className="p-1 border-black border">
          <TabsTrigger value="sales">Sales Overview</TabsTrigger>
          <TabsTrigger value="stocks">Stocks Overview</TabsTrigger>
          <div className="ml-2 py-2 w-fit  transition-all duration-500">
            <Select
              disabled={
                user.role == 'CUSTOMER' || user.role == 'WAREHOUSE_ADMIN'
              }
              onValueChange={(e) => setWarehouse(Number(e))}
            >
              <SelectTrigger className="h-8 border-black border ring-transparent focus:ring-transparent p-2">
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
          <OverviewStocks dataStocks={dataStocks} warehouseId={warehouse} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default DashboardPage;
