import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import DataTablesOrders from './components/DataTablesOrders';

const AdminOrderPage = () => {
  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Order lists</CardTitle>
        </CardHeader>
        <CardContent className="min-h-[50vh]">
          <DataTablesOrders
            data={undefined}
            loading={false}
            refetch={console.log('')}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOrderPage;
