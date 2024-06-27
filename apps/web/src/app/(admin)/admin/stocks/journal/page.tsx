'use client';
import DataTablesStockJournals from '@/app/(admin)/admin/stocks/components/DataTablesStockJournals';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetStockJournals } from '@/hooks/stocks/useGetStockJournals';
import { Popover } from 'antd';
import { RotateCcw } from 'lucide-react';
import React from 'react';

const StockJournalsPage = () => {
  const { data, loading, refetch } = useGetStockJournals();
  return (
    <div className="px-4 py-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>List Stock Mutations</CardTitle>
            <Popover content="Refresh the tables">
              <div
                onClick={() => refetch()}
                className="flex cursor-pointer justify-center items-center px-2 py-2 w-10 h-10 rounded-lg border border-input"
              >
                <RotateCcw />
              </div>
            </Popover>
          </div>
        </CardHeader>
        <CardContent>
          <DataTablesStockJournals
            data={data}
            loading={loading}
            refetch={refetch}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default StockJournalsPage;
