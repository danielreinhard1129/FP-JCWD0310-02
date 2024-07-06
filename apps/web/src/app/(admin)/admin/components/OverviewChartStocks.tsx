'use client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { IGetStocksReportsResponse } from '@/hooks/reports/useGetStocksReports';
import { Order } from '@/types/order.types';
import { LineChart } from '@mui/x-charts';
import dayjs from 'dayjs';
import React, { FC, useEffect, useState } from 'react';

interface IDataChartProps {
  data: IGetStocksReportsResponse | undefined;
}

const OverviewChartStocks: FC<IDataChartProps> = ({ data }) => {
  const [xData, setXData] = useState<Date[]>([]);
  const [yData, setYData] = useState<number[]>([]);

  // useEffect(() => {
  //   if (data) {
  //     setXData(Object.keys(data).map((val) => new Date(val)));
  //     Object.entries(data).map(([key, val]) => {
  //       return val.reduce((a: number, b: Order) => a + b.total, 0);
  //     });
  //   }
  // }, [data]);

  const xAxisData = [
    new Date('2023-12-04'),
    new Date('2023-12-05'),
    new Date('2023-12-06'),
    new Date('2023-12-07'),
    new Date('2023-12-08'),
    new Date('2023-12-09'),
    new Date('2023-12-10'),
  ];
  const seriesData = [
    [43, 38, 36, 30, 37, 43, 44],
    [31, 28, 27, 27, 33, 40, 35],
  ];
  return (
    <div className="px-4 py-6 bg-white col-span-2 rounded-lg flex flex-col gap-4">
      <div className="flex justify-between items-center min-h-8">
        <Label>Stock</Label>
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
            data: xAxisData,
            tickInterval: xAxisData,
            scaleType: 'time',
            valueFormatter: (date) => dayjs(date).format('MMM D'),
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
            data: seriesData[0],
            curve: 'natural',
            label: 'import',
          },
          {
            data: seriesData[1],
            curve: 'natural',
            label: 'export',
            color: 'red',
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

export default OverviewChartStocks;
