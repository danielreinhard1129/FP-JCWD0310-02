'use client';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import dayjs from 'dayjs';
import React, { FC, useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

interface IDataChartProps {
  data: any | undefined;
}

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

const OverviewChartStocks: FC<IDataChartProps> = ({ data }) => {
  const [chartData, setChartData] = useState<any>();
  const [type, setType] = useState('');
  useEffect(() => {
    if (data) {
      if (type == 'year') {
        const tempChartData = Object.entries(data).reduce(
          (a: any, [k, v]: any) => {
            const month = dayjs(k).format('MMMM');
            return {
              ...a,
              [month]: a[month]
                ? [
                    [...a[month][0], ...v[0]],
                    [...a[month][1], ...v[1]],
                  ]
                : v,
            };
          },
          {},
        );
        setChartData(
          Object.entries(tempChartData).map(([k, v]: any) => {
            return {
              month: k,
              import: v[0].reduce((a: number, b: number) => a + b, 0),
              export: v[1].reduce((a: number, b: number) => a + b, 0),
            };
          }),
        );
      } else {
        setChartData(
          Object.entries(data).map(([k, v]: any) => {
            return {
              month: dayjs(k).format(
                type == 'day'
                  ? 'MMM DD YYYY'
                  : type == 'month'
                    ? 'MMM DD'
                    : type == 'year'
                      ? 'MMM'
                      : 'MMM DD YYYY',
              ),
              import: v[0].reduce((a: number, b: number) => a + b, 0),
              export: v[1].reduce((a: number, b: number) => a + b, 0),
            };
          }),
        );
      }
    }
  }, [data, type]);

  return (
    <div className="px-4 py-6 bg-white col-span-2 rounded-lg flex flex-col gap-4">
      <div className="flex justify-between items-center min-h-8">
        <Label>Stock Mutations Overall</Label>
        <Tabs onValueChange={(e) => setType(e)} defaultValue="month">
          <TabsList className="border border-black">
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <Separator className="bg-black" />
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="import" fill="#4A69E2" radius={4} />
          <Bar dataKey="export" fill="#DA1E28" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default OverviewChartStocks;
