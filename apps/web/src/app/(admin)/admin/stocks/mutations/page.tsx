'use client';
import DataTablesStockMutations from '@/app/(admin)/admin/stocks/components/DataTablesStockMutations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select } from 'antd';
import { useGetStockMutations } from '@/hooks/stocks/useGetStockMutations';
import { Popover } from 'antd';
import { RotateCcw } from 'lucide-react';
import React from 'react';

const StockJournalsPage = () => {
  const statusFilter = [
    { value: 'DONE', label: 'DONE' },
    { value: 'WAIT_CONFIRMATION', label: 'WAIT_CONFIRMATION' },
    { value: 'ON_PROGRESS', label: 'ON_PROGRESS' },
    { value: 'REJECT', label: 'REJECT' },
  ];
  const { data, loading, refetch, setQuery, query } = useGetStockMutations();
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
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Label>Filter : </Label>
              <Select
                className="w-42"
                placeholder="Status"
                onChange={(e) => setQuery({ ...query, status: e })}
                loading={loading}
                options={statusFilter}
              />
            </div>
            <DataTablesStockMutations
              data={data}
              loading={loading}
              refetch={refetch}
            />
            <div className="flex gap-4 mt-4 justify-end">
              <Button
                onClick={() => setQuery({ ...query, page: query.page - 1 })}
              >
                Previous
              </Button>
              <Button
                onClick={() => setQuery({ ...query, page: query.page + 1 })}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockJournalsPage;
