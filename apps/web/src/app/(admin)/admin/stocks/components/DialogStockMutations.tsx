'use client';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../../../components/ui/dialog';
import { Button } from '../../../../../components/ui/button';
import { Label } from '../../../../../components/ui/label';
import { Popover } from 'antd';
import { Eye } from 'lucide-react';
import { usePostStockMutationsConfirm } from '@/hooks/stocks/usePostStockMutationsConfirm';
import { useNotification } from '@/hooks/useNotification';
import { StockMutations } from '@/types/stock.type';
import { useAppSelector } from '@/redux/hooks';

interface DataTypeProducts
  extends Omit<StockMutations, 'fromWarehouse' | 'toWarehouse' | 'product'> {
  key: React.Key;
  fromWarehouse: string;
  toWarehouse: string;
  product: string;
}

const DialogStockMutations = ({
  data,
  refetch,
}: {
  data: DataTypeProducts;
  refetch: () => void;
}) => {
  const { openNotification } = useNotification();
  const warehouse = useAppSelector((state) => state.admin);
  const user = useAppSelector((state) => state.user);
  const { postStockMutationsConfirm } = usePostStockMutationsConfirm(
    data.id,
    data.fromWarehouseId,
    data.toWarehouseId,
    data.quantity,
  );
  return (
    <Dialog>
      <Popover content={<Label>See details stock mutations</Label>}>
        <DialogTrigger
          asChild
          className="cursor-pointer border border-input rounded-lg w-8 h-8 p-1"
        >
          <Eye />
        </DialogTrigger>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Stock mutations</DialogTitle>
        </DialogHeader>
        <div className="w-full flex flex-col h-full">
          <div className="mb-4">
            <Label className="text-lg">Details : </Label>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Sku : {data.sku}</Label>
            <Label>Product : {data.product}</Label>
            <Label>
              Variant : {data.variant.color.toUpperCase()} -{' '}
              {data.variant.size.toUpperCase()}
            </Label>
            <Label>Quantity : {data.quantity}</Label>
            <Label>Type : {data.type}</Label>
            <Label className="flex gap-1">
              Status : <p className="font-bold ">{data.status}</p>
            </Label>
          </div>
        </div>
        <DialogFooter>
          {data.status == 'ON_PROGRESS' &&
          (data.toWarehouseId == warehouse.warehouseId ||
            user.role == 'SUPER_ADMIN') ? (
            <>
              <Button
                onClick={() =>
                  openNotification.async(
                    postStockMutationsConfirm('ARRIVED'),
                    () => refetch(),
                  )
                }
                variant="outline"
                className="border-green-500"
              >
                Confirm Arrive
              </Button>
            </>
          ) : null}
          {data.status == 'WAIT_CONFIRMATION' &&
          (data.fromWarehouseId == warehouse.warehouseId ||
            user.role == 'SUPER_ADMIN') ? (
            <>
              <Button
                onClick={() =>
                  openNotification.async(
                    postStockMutationsConfirm('CONFIRM'),
                    () => refetch(),
                  )
                }
                variant="outline"
                className="border-green-500"
              >
                Confirm
              </Button>
              <Button
                onClick={() =>
                  openNotification.async(
                    postStockMutationsConfirm('REJECT'),
                    () => refetch(),
                  )
                }
                variant="destructive"
              >
                Reject
              </Button>
            </>
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogStockMutations;
