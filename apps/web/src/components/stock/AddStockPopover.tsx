'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useGetStock } from '@/hooks/stocks/useGetStock';
import { Skeleton } from '../ui/skeleton';
import { Stock } from '@/types/stock.type';
import { useFormik } from 'formik';
import { usePostAddStocks } from '@/hooks/stocks/usePostAddStocks';
import { useNotification } from '@/hooks/useNotification';
import { Popover } from 'antd';
import { useAppSelector } from '@/redux/hooks';

const AddStockPopover = ({
  data,
  refetch,
}: {
  data: Stock;
  refetch: () => void;
}) => {
  const user = useAppSelector((state) => state.user);
  const { postAddStocks } = usePostAddStocks(data.variantId, data.warehouseId);
  const { contextHolder, openNotification } = useNotification();
  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      quantity: 0,
    },
    onSubmit: (values) => {
      openNotification.async(postAddStocks(values.quantity), () => {
        refetch();
        setOpen(false);
      });
    },
  });
  const [open, setOpen] = useState(false);

  return (
    <>
      {contextHolder}
      <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
        <DialogTrigger>
          <Button
            variant="outline"
            className="p-2 h-8 flex justify-around items-center gap-2"
          >
            {' '}
            <Plus width={15} /> Add stock
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="mb-8">
            <DialogTitle>Add stocks management</DialogTitle>
          </DialogHeader>
          <div>
            <div className="flex flex-col gap-4 mb-4">
              <Label>Current Warehouse : {data.warehouse}</Label>
              <Label>Current WarehouseId : {data.warehouseId}</Label>
              <Label>SKU : {data.sku}</Label>
              <Label>Name product : {data.variant.product.name}</Label>
              <Label>
                Name variant : {data.variant.color} {data.variant.size}
              </Label>
              <Label>Total stock : {data.totalStocks}</Label>
              <Label>Available stock : {data.totalStocks}</Label>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4 justify-center items-center">
                <div className="w-fit text-nowrap">
                  <Label>Quantity add stock</Label>
                </div>
                <Input
                  value={values.quantity}
                  id="quantity"
                  name="quantity"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>
                  Expected total stock after add stock :{' '}
                  {Number(Number(data.totalStocks) + Number(values.quantity))}
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Popover
              content={
                user.role !== 'SUPER_ADMIN' ? (
                  <Label>You are not a super admin!</Label>
                ) : undefined
              }
            >
              <Button
                className="disabled:pointer-events-auto"
                disabled={user.role !== 'SUPER_ADMIN'}
                onClick={() => handleSubmit()}
              >
                Add
              </Button>
            </Popover>

            <DialogClose>
              <Button variant="destructive">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddStockPopover;
