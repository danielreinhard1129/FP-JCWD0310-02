'use client';
import { DatePicker } from 'antd';
import { Calendar, CalendarIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useGetSalesReports } from '@/hooks/reports/useGetSalesReports';
import { useGetStocksReports } from '@/hooks/reports/useGetStocksReports';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarRangePicker } from '@/components/ui/calendar';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const DashboardPage = () => {
  const admin = useAppSelector((state) => state.admin);
  const user = useAppSelector((state) => state.user);
  const { getWarehouses } = useGetWarehouses(undefined);
  const [warehouse, setWarehouse] = useState<number | undefined>(
    admin.warehouseId,
  );
  const [rangeDate, setRangeDate] = useState<any>([
    {
      from: dayjs(new Date()).toDate(),
      to: dayjs(new Date()).add(30, 'day').toDate(),
    },
  ]);
  const { dataStocks, isLoading: isLoadingStock } = useGetStocksReports({
    warehouseId: warehouse,
    date: {
      startDate: rangeDate.from || undefined,
      endDate: rangeDate.to || undefined,
    },
  });
  const { data, isLoading } = useGetSalesReports({
    warehouseId: warehouse,
    date: {
      startDate: rangeDate.from || undefined,
      endDate: rangeDate.to || undefined,
    },
  });

  return (
    <section
      className={`p-8 flex relative flex-col gap-4 font-rubik ${(isLoading || isLoadingStock) && 'opacity-30'}`}
    >
      <div className="flex md:justify-end">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={'outline'}
              className={cn(
                'justify-start text-left border border-black font-normal text-black',
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {rangeDate.from ? (
                rangeDate.to ? (
                  <>
                    {dayjs(rangeDate.from).format('DD MMMM')} -{' '}
                    {dayjs(rangeDate.to).format('DD MMMM')}
                  </>
                ) : (
                  dayjs(rangeDate.from).format('DD MMMM YYYY')
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarRangePicker
              initialFocus
              mode="range"
              defaultMonth={rangeDate.from}
              selected={rangeDate}
              onSelect={(e) =>
                setRangeDate(
                  e
                    ? {
                        from: e.from ? e.from : undefined,
                        to: e.to ? e.to : undefined,
                      }
                    : { from: undefined, to: undefined },
                )
              }
              numberOfMonths={1}
            />
          </PopoverContent>
        </Popover>
      </div>
      <Tabs defaultValue="sales">
        <TabsList className="px-4 border-black border md:w-fit w-full md:justify-start flex md:flex-row flex-col gap-2 h-fit">
          <div className="w-full py-2 md:w-fit flex justify-between">
            <TabsTrigger className="w-full" value="sales">
              Sales Overview
            </TabsTrigger>
            <TabsTrigger className="w-full" value="stocks">
              Stocks Overview
            </TabsTrigger>
          </div>
          <div className="ml-2 md:w-fit w-full transition-all duration-500 md:mb-0 mb-2">
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
