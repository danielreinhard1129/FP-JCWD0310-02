'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { DataTablesStock } from '@/types/stock.type';
import { useAppSelector } from '@/redux/hooks';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody } from '@/components/ui/table';
import { useGetWarehouses } from '@/hooks/warehouses/useGetWarehouses';
import TabsAddRequestStock from './TabsAddRequestStock';
import TabsRequestStock from './TabsRequestStock';
import { Popover } from 'antd';

const DetailStockPopover = ({
  data,
  refetch,
}: {
  data: DataTablesStock;
  refetch: () => void;
}) => {
  const user = useAppSelector((state) => state.user);
  const [type, setType] = useState<'request' | 'add'>('request');
  const [open, setOpen] = useState(false);

  return (
    <>
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
                  <div className="flex flex-wrap gap-3 justify-stretch">
                    {data.variant.map((val, indx) => {
                      return (
                        <>
                          <Label
                            className="border w-fit p-2 rounded-lg"
                            key={indx}
                          >
                            {val.color}-{val.size} ={' '}
                            {val.variantStocks.reduce(
                              (a, b) => a + b.quantity,
                              0,
                            )}
                          </Label>
                        </>
                      );
                    })}
                  </div>
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
                    <TabsRequestStock data={data} refetch={refetch} />
                  </TabsContent>
                  <TabsContent value="add">
                    <TabsAddRequestStock data={data} refetch={refetch} />
                  </TabsContent>
                </Tabs>
              </TabsContent>
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DetailStockPopover;
