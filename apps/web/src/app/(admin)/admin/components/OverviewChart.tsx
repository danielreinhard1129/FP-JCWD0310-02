'use client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { IGetSalesReportsResponse } from '@/hooks/reports/useGetSalesReports';
import { IGetStocksReportsResponse } from '@/hooks/reports/useGetStocksReports';
import { Order } from '@/types/order.types';
import { LineChart } from '@mui/x-charts';
import dayjs from 'dayjs';
import React, { FC, useEffect, useState } from 'react';

type ITotalSales = Omit<Order, 'user' | 'orderItems'>;

type IMaps = Map<string, any>;

interface IDataChartProps {
  data: IGetSalesReportsResponse | undefined;
}

const OverviewChart: FC<IDataChartProps> = ({ data }) => {
  const [xData, setXData] = useState<Date[]>([]);
  const [yData, setYData] = useState<number[]>([]);

  useEffect(() => {
    if (data) {
      setXData(Object.entries(data.totalSales).map(([key]) => new Date(key)));

      setYData(
        Object.entries(data.totalSales).map(
          ([k, v]: [k: string, v: ITotalSales[]]) => {
            return v.reduce((a, b) => a + b.total, 0);
          },
        ),
      );
    }
  }, [data]);

  return (
    <div className="px-4 py-6 bg-white col-span-2 rounded-lg flex flex-col gap-4">
      <div className="flex justify-between items-center min-h-8">
        <Label>Sale Graph</Label>
        <div className="flex gap-2">
          <Button className="border border-black h-8" variant="outline">
            WEEKLY
          </Button>
          <Button className="border border-black h-8">MONTHLY</Button>
          <Button className="border border-black h-8" variant="outline">
            YEARLY
          </Button>
        </div>
      </div>
      <Separator className="bg-black" />
      <LineChart
        xAxis={[
          {
            data: xData,
            tickInterval: xData,
            scaleType: 'time',
            valueFormatter: (date) => dayjs(date).format('MMM'),
            tickLabelStyle: {
              fontFamily: 'rubik ',
              fontWeight: '700',
              fontSize: '14px',
            },
            disableTicks: true,
          },
        ]}
        yAxis={[
          {
            disableTicks: true,
            tickLabelStyle: {
              fontFamily: 'rubik ',
              fontWeight: '700',
              fontSize: '12px',
            },
          },
        ]}
        series={[
          {
            data: yData,
            curve: 'natural',
          },
        ]}
        colors={['#1B59F8']}
        axisHighlight={{
          x: 'band',
          y: 'none',
        }}
        height={500}
      />
    </div>
  );
};

export default OverviewChart;
