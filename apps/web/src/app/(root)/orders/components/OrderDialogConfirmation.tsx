'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Address } from '@/types/address.types';
import { Carts } from '@/types/cart.types';
import React from 'react';

interface IAddressDetailOrderProps {
  address: Address | undefined;
  options: string;
  estimations: string;
  fee: number;
}

const OrderDialogConfirmation = ({
  data,
  addressDetail,
  handleOrder,
}: {
  data: Carts[] | undefined;
  addressDetail: IAddressDetailOrderProps;
  handleOrder: () => void;
}) => {
  const formatPrice = new Intl.NumberFormat('id-Id', {
    currency: 'IDR',
    style: 'currency',
  });
  return (
    <Dialog>
      <DialogTrigger>
        <Button>CHECKOUT</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-rubik">
            Order confirmation
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col mt-4">
          <h1 className="text-lg font-rubik font-semibold">Order Shipments</h1>
          <div className="flex flex-col gap-2 mt-4 mb-6 font-rubik">
            <Label>
              Shipment Address : {addressDetail.address?.street},
              {addressDetail.address?.subdistrict},{addressDetail.address?.city}{' '}
              {addressDetail.address?.postalCode},
              {addressDetail.address?.province}
            </Label>
            <Label>Shipment Options : {addressDetail.options}</Label>
            <Label>Shipment Estimation : {addressDetail.estimations}</Label>
            <Label>
              Shipment Fee : {formatPrice.format(addressDetail.fee)}
            </Label>
          </div>
          <h1 className="text-lg font-rubik font-semibold">Order Details</h1>
          <div>
            <Table className="mt-4 font-openSans">
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Qty</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data &&
                  data.map((val, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{val.product.name}</TableCell>
                        <TableCell>{val.quantity}</TableCell>
                        <TableCell>
                          {formatPrice.format(val.product.price)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
              <TableFooter>
                <TableRow className="font-bold">
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell>
                    {data &&
                      formatPrice.format(
                        data.reduce(
                          (a, b) => a + b.quantity * b.product.price,
                          0,
                        ),
                      )}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleOrder}>Confirms Order</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDialogConfirmation;
