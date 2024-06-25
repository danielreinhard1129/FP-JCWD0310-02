'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Trash } from 'lucide-react';
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
import { Stock } from '@/types/stock.type';
import { useFormik } from 'formik';
import { useNotification } from '@/hooks/useNotification';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { usePostRequestStocks } from '@/hooks/stocks/usePostRequestStocks';

const RequestStockPopover = ({
  data,
  refetch,
}: {
  data: Stock;
  refetch: () => void;
}) => {
  const { data: newData, postRequestStocks } = usePostRequestStocks(
    data.variantId,
  );
  const { contextHolder, openNotification } = useNotification();
  const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues: {
      quantity: 0,
      fromWarehouse: '',
      toWarehouse: '',
    },
    onSubmit: (values) => {
      openNotification.async(
        postRequestStocks(
          values.quantity,
          Number(values.fromWarehouse),
          Number(values.toWarehouse),
        ),
        () => {
          refetch();
          setOpen(false);
        },
      );
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
            <Trash width={15} /> Request stock
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
            <div className="space-y-2">
              <div className="flex gap-2 justify-center items-center">
                <div className="w-fit text-nowrap">
                  <Label>Quantity add stock :</Label>
                </div>
                <Input
                  value={values.quantity}
                  id="quantity"
                  name="quantity"
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-4 justify-center items-center">
                <div className="w-fit text-nowrap">
                  <Label>Warehouse from :</Label>
                </div>
                <Select
                  onValueChange={(e) => setFieldValue('fromWarehouse', e)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select warehouse" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="1">Kali urang</SelectItem>
                      <SelectItem value="2">Pogung</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-4 justify-center items-center">
                <div className="w-fit text-nowrap">
                  <Label>Warehouse to :</Label>
                </div>
                <Select onValueChange={(e) => setFieldValue('toWarehouse', e)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select warehouse" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="1">Kali urang</SelectItem>
                      <SelectItem value="2">Pogung</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
            <Button
              className="disabled:pointer-events-auto"
              onClick={() => handleSubmit()}
            >
              Request
            </Button>

            <DialogClose>
              <Button variant="destructive">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RequestStockPopover;
