'use client';
import DataTablesStockMutations from '@/components/dashboard/DataTablesStockMutations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetStockMutations } from '@/hooks/stocks/useGetStockMutations';
import React from 'react';

const StockJournalsPage = () => {
  const { data, loading, refetch } = useGetStockMutations();
  return (
    <div className="px-4 py-4">
      <Card>
        <CardHeader>
          <CardTitle>List Stock Mutations</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTablesStockMutations
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
