'use client';
import { Label } from '@/components/ui/label';
import { Breadcrumb } from 'antd';
import { Calendar } from 'lucide-react';
import React from 'react';
import { useGetSalesReports } from '@/hooks/reports/useGetSalesReports';
import { useGetStocksReports } from '@/hooks/reports/useGetStocksReports';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OverviewSales from './components/OverviewSales';
import OverviewStocks from './components/OverviewStocks';

const DashboardPage = () => {
  const { dataStocks } = useGetStocksReports();
  const { data } = useGetSalesReports();
  return (
    <section className="p-8 flex flex-col gap-4 font-rubik">
      <div className="flex justify-between">
        <Breadcrumb
          className="font-rubik text-black"
          separator=">"
          items={[{ title: 'Home' }, { title: 'Dashboard' }]}
        />
        <div className="flex gap-2 items-center">
          <Calendar className="w-6" />
          <Label>Feb 16,2024 - Feb 20,2022</Label>
        </div>
      </div>
      <Tabs defaultValue="sales">
        <TabsList className="p-1">
          <TabsTrigger value="sales">Sales Overview</TabsTrigger>
          <TabsTrigger value="stocks">Stocks Overview</TabsTrigger>
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
