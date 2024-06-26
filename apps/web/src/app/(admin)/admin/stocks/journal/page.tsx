'use client';
import DataTablesStockJournals from '@/components/dashboard/DataTablesStockJournals';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetStockJournals } from '@/hooks/stocks/useGetStockJournals';
import React from 'react';

const StockJournalsPage = () => {
  const { data, loading, refetch } = useGetStockJournals();
  return (
    <div className="px-4 py-4">
      <Card>
        <CardHeader>
          <CardTitle>List Stock Mutations</CardTitle>
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
