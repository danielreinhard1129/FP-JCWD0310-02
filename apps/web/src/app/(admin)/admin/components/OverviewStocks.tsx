'use client';
import React, { FC } from 'react';
import OverviewCard from './OverviewCard';
import { Box } from 'lucide-react';
import { IGetStocksReportsResponse } from '@/hooks/reports/useGetStocksReports';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface IOverviewStocksProps {
  dataStocks: IGetStocksReportsResponse | undefined;
}

const OverviewStocks: FC<IOverviewStocksProps> = ({ dataStocks }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4 rounded-lg">
        <OverviewCard
          Icon={Box}
          title="Total Stocks"
          type="number"
          value={
            dataStocks
              ? Object.entries(dataStocks.totalStock).reduce(
                  (a, [k, v]: [k: string, v: any]) => a + v,
                  0,
                )
              : 0
          }
          total={0}
        />
        <OverviewCard
          Icon={Box}
          title="Imported Stocks"
          type="number"
          value={
            dataStocks
              ? Object.entries(dataStocks.import).reduce(
                  (a, [k, v]: any) => a + v.count,
                  0,
                )
              : 0
          }
          total={0}
        />
        <OverviewCard
          Icon={Box}
          title="Exported Stocks"
          type="number"
          value={
            dataStocks
              ? Object.entries(dataStocks.export).reduce(
                  (a, [k, v]: any) => a + v.count,
                  0,
                )
              : 0
          }
          total={0}
        />
      </div>
      <div className="p-4 rounded-lg bg-white flex flex-col">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center font-bold">No</TableHead>
              <TableHead className="text-center font-bold">Product</TableHead>
              <TableHead className="text-center font-bold">Stocks</TableHead>
              <TableHead className="text-center font-bold">Imported</TableHead>
              <TableHead className="text-center font-bold">Exported</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataStocks?.overallStocks.map((val, indx) => {
              return (
                <TableRow key={indx} className="font-bold">
                  <TableCell className="text-center w-4">{indx + 1}.</TableCell>
                  <TableCell className="text-center">{val.name}</TableCell>
                  <TableCell
                    className={`text-center flex gap-2 justify-center items-center ${Number(dataStocks.totalStock[val.name]) < 50 && 'text-yellow-500'} ${Number(dataStocks.totalStock[val.name]) == 0 && 'text-red-500'}`}
                  >
                    {Number(dataStocks.totalStock[val.name]) || 0}
                  </TableCell>
                  <TableCell className="text-center">
                    {dataStocks.import[val.name]?.count || 0}
                  </TableCell>
                  <TableCell className="text-center">
                    {dataStocks.export[val.name]?.count || 0}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OverviewStocks;
