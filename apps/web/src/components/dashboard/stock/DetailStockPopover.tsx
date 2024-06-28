'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useGetStock } from '@/hooks/stocks/useGetStock';
import { Skeleton } from '@/components/ui/skeleton';
import { DataTablesStock, Stock } from '@/types/stock.type';
import { useFormik } from 'formik';
import { usePostAddStocks } from '@/hooks/stocks/usePostAddStocks';
import { useNotification } from '@/hooks/useNotification';
import { InputNumber, Popover } from 'antd';
import { useAppSelector } from '@/redux/hooks';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody } from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePostRequestStocks } from '@/hooks/stocks/usePostRequestStocks';

const DetailStockPopover = ({
  data,
  refetch,
}: {
  data: DataTablesStock;
  refetch: () => void;
}) => {
  const dummyWarehouse = [
    { value: 1, label: 'Kaliurang' },
    { value: 2, label: 'Pogung' },
  ];
  const user = useAppSelector((state) => state.user);
  const [type, setType] = useState<'request' | 'add'>('request');
  const { postAddStocks } = usePostAddStocks();
  const { data: dataPostRequest, postRequestStocks } = usePostRequestStocks();
  const { contextHolder, openNotification } = useNotification();
  const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues: {
      quantity: 0,
      warehouseFrom: 0,
      variant: 0,
    },
    onSubmit: (values) => {
      if (type == 'add') {
        openNotification.async(
          postAddStocks(values.quantity, values.variant, values.warehouseFrom),
          () => {
            refetch();
            setOpen(false);
          },
        );
      } else if (type == 'request') {
        openNotification.async(
          postRequestStocks(
            values.quantity,
            values.warehouseFrom,
            data.warehouseId,
            values.variant,
          ),
          () => {
            refetch();
            setOpen(false);
          },
        );
      } else
        openNotification.error({ message: 'Something is error on popover!' });
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
            <Plus width={15} /> Manage stock
          </Button>
        </DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <div className="flex flex-col gap-1">
              <DialogTitle className="mb-3">Stocks management</DialogTitle>
              <Label>Current warehouse : {data.warehouse}</Label>
              <Label>Product : {data.name}</Label>
            </div>
          </DialogHeader>
          <Tabs>
            <TabsList>
              <TabsTrigger value="detail">Details</TabsTrigger>
              <TabsTrigger value="stocks">Stocks</TabsTrigger>
            </TabsList>
            <div className="mt-4 flex flex-col gap-4 border p-4 rounded-md min-h-64">
              <TabsContent value="detail">
                <div>
                  <div className="flex flex-col gap-1 mb-4">
                    <Label className="font-semibold">
                      SKU : {data.name}-
                      {new Date(data.createdAt)
                        .toISOString()
                        .slice(0, 12)
                        .replaceAll('-', '')}
                    </Label>
                    <Label className="font-bold">
                      Total stock : {data.stock}
                    </Label>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Variant stock: </Label>
                  <Table>
                    <TableBody></TableBody>
                  </Table>
                  {data.variant.map((val, indx) => {
                    return (
                      <Label key={indx}>
                        {val.color}-{val.size} ={' '}
                        {val.variantStocks.reduce((a, b) => a + b.quantity, 0)}
                      </Label>
                    );
                  })}
                </div>
              </TabsContent>
              <TabsContent value="stocks">
                <div className="mb-2">
                  <Label className="py-4">Options for action:</Label>
                </div>
                <Tabs value={type} defaultValue="request">
                  <TabsList>
                    <TabsTrigger
                      onClick={() => setType('request')}
                      value="request"
                    >
                      Request Stock
                    </TabsTrigger>
                    <Popover
                      content={
                        user.role !== 'SUPER_ADMIN' ? (
                          <Label>Only super admin can add stocks!</Label>
                        ) : undefined
                      }
                    >
                      <TabsTrigger
                        value="add"
                        onClick={() => setType('add')}
                        disabled={user.role !== 'SUPER_ADMIN'}
                        className="disabled:pointer-events-auto"
                      >
                        Add Stock
                      </TabsTrigger>
                    </Popover>
                  </TabsList>
                  <TabsContent value="request">
                    <div className="py-4 flex flex-col gap-2">
                      <div className="flex flex-col gap-2 mb-4">
                        <Label>Product : {data.name}</Label>
                        <Label>
                          Warehouse to : Your warehouse ( {data.warehouse} )
                        </Label>
                      </div>
                      <div className="flex gap-4 justify-between items-center">
                        <Label>Select Warehouses from : </Label>
                        <div className="w-52">
                          <Select
                            onValueChange={(e) =>
                              setFieldValue('warehouseFrom', Number(e))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select warehouse from" />
                            </SelectTrigger>
                            <SelectContent className="rounded-none">
                              <SelectGroup>
                                <SelectLabel>Warehouse</SelectLabel>
                                {dummyWarehouse.map((val, indx) => {
                                  return (
                                    <SelectItem value={val.value.toString()}>
                                      {val.label}
                                    </SelectItem>
                                  );
                                })}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex gap-4 justify-between items-center">
                        <Label>Select Variant :</Label>
                        <div className="w-52">
                          <Select
                            onValueChange={(e) =>
                              setFieldValue('variant', Number(e))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a variant" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Variant</SelectLabel>
                                {data.variant.map((val, indx) => {
                                  return (
                                    <SelectItem value={val.id.toString()}>
                                      {val.color} - {val.size}
                                    </SelectItem>
                                  );
                                })}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex gap-4 justify-between items-center">
                        <Label>Quantity :</Label>
                        <InputNumber
                          min={1}
                          onChange={(e) => setFieldValue('quantity', e)}
                          className="w-52"
                        />
                      </div>
                      <Label>
                        Quantity expected :{' '}
                        {Number(values.quantity) + data.stock}
                      </Label>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button onClick={() => handleSubmit()}>Request</Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="add"></TabsContent>
                </Tabs>
              </TabsContent>
            </div>
          </Tabs>
          {/* <DialogFooter>
            <div className="flex flex-col gap-4">
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
            </div>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DetailStockPopover;
