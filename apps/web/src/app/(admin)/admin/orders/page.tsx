'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { ReactNode, useState } from 'react';
import DataTablesOrders from './components/DataTablesOrders';
import { useGetOrders } from '@/hooks/orders/useGetOrders';
import { Button } from '@/components/ui/button';
import { usePostOrderAdmin } from '@/hooks/orders/usePostOrderAdmin';
import { useNotification } from '@/hooks/useNotification';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetWarehouses } from '@/hooks/warehouses/useGetWarehouses';
import { useAppSelector } from '@/redux/hooks';

const defaultStatusType = [
  'CONFIRMATION_PAYMENT',
  'WAIT_USER',
  'ON_PROGRESS',
  'ON_SHIPPING',
  'DONE',
  'CANCEL',
];

const AdminOrderPage = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.user);
  const admin = useAppSelector((state) => state.admin);
  const { isSuccess, mutateAsync } = usePostOrderAdmin();
  const { openNotification } = useNotification();
  const { getWarehouses } = useGetWarehouses(undefined);
  const [warehouse, setWarehouse] = useState<number | undefined>(
    admin.warehouseId,
  );
  const [status, setStatus] = useState(defaultStatusType[0]);
  const { data, isLoading, refetch } = useGetOrders(warehouse, status);
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
      <Card className="border border-black">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>Order lists</CardTitle>
            <Button onClick={() => refetch()}>Refresh</Button>
          </div>
          <div className="flex gap-4">
            <div className="w-fit">
              <Select
                disabled={user.role !== 'SUPER_ADMIN'}
                onValueChange={(e) => setWarehouse(Number(e))}
              >
                <SelectTrigger className="h-8 border-black border ring-transparent focus:ring-transparent p-2">
                  <SelectValue placeholder="Select Warehouse" />
                </SelectTrigger>
                <SelectContent className="ring-transparent focus:ring-transparent">
                  <SelectGroup>
                    {getWarehouses.data?.data.data.map((val, indx) => {
                      return (
                        <SelectItem key={indx} value={String(val.id)}>
                          {val.name}-{val.id}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="w-fit">
              <Select defaultValue={status} onValueChange={(e) => setStatus(e)}>
                <SelectTrigger className="h-8 border-black border ring-transparent focus:ring-transparent p-2">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="ring-transparent focus:ring-transparent">
                  <SelectGroup>
                    {defaultStatusType.map((val, indx) => {
                      return (
                        <SelectItem key={indx} value={val}>
                          {val}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
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
