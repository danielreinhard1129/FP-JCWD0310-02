'use client';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IGetSalesReportsResponse } from '@/hooks/reports/useGetSalesReports';
import { Order } from '@/types/order.types';
import dayjs from 'dayjs';
import React, { FC, useEffect, useState } from 'react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

const chartConfig = {
  import: {
    label: 'Import',
    color: '#4A69E2',
  },
  export: {
    label: 'Export',
    color: '#DA1E28',
  },
} satisfies ChartConfig;
interface IDataChartProps {
  data: IGetSalesReportsResponse | undefined;
}
const OverviewChart: FC<IDataChartProps> = ({ data }) => {
  const formatPrice = new Intl.NumberFormat('id-ID', {
    currency: 'IDR',
    style: 'currency',
  });
  const [chartData, setChartData] = useState<any>();
  const [type, setType] = useState<'month' | 'year' | string>('month');
  useEffect(() => {
    if (data) {
      const tempChartData = Object.entries(data.totalSales).reduce(
        (a: any, [k, v]: any) => {
          const date =
            type == 'year'
              ? dayjs(k).format('MMMM').toString()
              : dayjs(k).format('DD-MMMM-YYYY').toString();
          return {
            ...a,
            [date]: a[date] ? [...a[date], ...v] : v,
          };
        },
        {},
      );
      setChartData(
        Object.entries(tempChartData).reduce((a: any, [k, v]: any) => {
          return [
            ...a,
            {
              date: k,
              sales: v.reduce(
                (c: number, d: { total: number }) => c + d.total,
                0,
              ),
            },
          ];
        }, []),
      );
    }
  }, [data, type]);

  return (
    <div className="px-4 py-6 bg-white border-black border col-span-2 rounded-lg flex flex-col gap-4">
      <div className="flex justify-between items-center min-h-8">
        <Label>Sale Graph</Label>
        <Tabs onValueChange={(e) => setType(e)} defaultValue="month">
          <TabsList>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <Separator className="bg-black" />
      <div className="px-10">
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" allowDataOverflow tickMargin={8} />
            <ChartTooltip
              cursor={false}
              formatter={(e) => formatPrice.format(Number(e))}
              content={<ChartTooltipContent />}
            />
            <Line
              dataKey="sales"
              type="monotone"
              stroke="#4A69E2"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default OverviewChart;
