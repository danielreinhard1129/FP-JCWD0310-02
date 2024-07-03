'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { ReactNode, useEffect, useState } from 'react';
import DataTablesOrders from './components/DataTablesOrders';
import { useGetOrders } from '@/hooks/orders/useGetOrders';
import { Button } from '@/components/ui/button';
import { useDialog } from '@/hooks/useDialog';
import { Label } from '@/components/ui/label';
import { usePostOrderAdmin } from '@/hooks/orders/usePostOrderAdmin';
import { useNotification } from '@/hooks/useNotification';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const AdminOrderPage = () => {
  const { data, isLoading, refetch } = useGetOrders();
  const { isSuccess, mutateAsync } = usePostOrderAdmin();
  const { openNotification } = useNotification();
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<String>('');
  const [content, setContent] = useState<ReactNode>(undefined);
  const [footer, setFooter] = useState<ReactNode>(undefined);
  const handleSubmit = (
    type: 'CONFIRM' | 'REJECT' | 'SHIPPING',
    orderId: number,
  ) => {
    openNotification.async(mutateAsync({ orderId, type }), () => {
      refetch();
      setOpen(false);
    });
  };
  const handleDialog = (
    title: string,
    content: ReactNode,
    footer: ReactNode,
  ) => {
    setTitle(title);
    setContent(content);
    setFooter(footer);
    setOpen(true);
  };

  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>Order lists</CardTitle>
            <Button onClick={() => refetch()}>Refresh</Button>
          </div>
        </CardHeader>
        <CardContent className="min-h-[50vh]">
          <DataTablesOrders
            data={data?.data}
            loading={isLoading}
            dialog={handleDialog}
            handleSubmit={handleSubmit}
          />
          <Dialog onOpenChange={setOpen} open={open}>
            <DialogContent className="font-rubik">
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
              </DialogHeader>
              {content}
              <DialogFooter>{footer}</DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOrderPage;
