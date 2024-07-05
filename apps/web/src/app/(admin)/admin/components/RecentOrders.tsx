import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Order } from '@/types/order.types';
import { Ellipsis } from 'lucide-react';
import React from 'react';

const RecentOrders = ({ data }: { data: Order[] | undefined }) => {
  const formatPrice = new Intl.NumberFormat('id-ID', {
    currency: 'IDR',
    style: 'currency',
  });
  return (
    <div className="px-4 py-6 w-full bg-white rounded-lg flex flex-col gap-4">
      <div className="flex min-h-8 justify-between items-center">
        <Label>Recent Orders</Label>
        <Ellipsis className="w-6 rotate-90" />
      </div>
      <Separator className="bg-black" />
      <Table>
        <TableHeader>
          <TableRow className="font-rubik font-bold text-[#232321]">
            <TableHead className="font-rubik text-center font-bold text-[#232321] text-opacity-80">
              Product
            </TableHead>
            <TableHead className="font-rubik text-center font-bold text-[#232321] text-opacity-80">
              Order ID
            </TableHead>
            <TableHead className="font-rubik text-center font-bold text-[#232321] text-opacity-80">
              Date
            </TableHead>
            <TableHead className="font-rubik text-center font-bold text-[#232321] text-opacity-80">
              Customer Name
            </TableHead>
            <TableHead className="font-rubik text-center font-bold text-[#232321] text-opacity-80">
              Status
            </TableHead>
            <TableHead className="font-rubik text-center font-bold text-[#232321] text-opacity-80">
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((val, indx) => {
            return (
              <TableRow className="font-rubik" key={indx}>
                <TableCell className="text-center">
                  {val.orderItems.map((val) => val.product.name).join(',')}
                </TableCell>
                <TableCell className="text-center">{val.id}</TableCell>
                <TableCell className="text-center">
                  {new Date(val.createdAt).toDateString()}
                </TableCell>
                <TableCell className="text-center">
                  {val.user.firstName} - {val.user.lastName}
                </TableCell>
                <TableCell className="flex gap-2 items-center justify-center">
                  <div
                    className={`w-2 h-2 rounded-full ${val.status == 'DONE' ? 'bg-green-400' : val.status == 'ON_PROGRESS' || val.status == 'ON_SHIPPING' ? 'bg-blue-400' : val.status == 'WAIT_USER' || val.status == 'CONFIRMATION_PAYMENT' ? 'bg-yellow-400' : 'bg-red-400'}`}
                  ></div>
                  {val.status}
                </TableCell>
                <TableCell className="text-center">
                  {formatPrice.format(val.total)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentOrders;
