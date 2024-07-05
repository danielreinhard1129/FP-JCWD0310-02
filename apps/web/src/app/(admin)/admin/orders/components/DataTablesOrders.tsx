'use client';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import { TableColumnsType } from 'antd';
import { Product } from '@/types/product.type';
import { IGetOrdersResponse } from '@/hooks/orders/useGetOrders';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Table as TableShadCn,
} from '@/components/ui/table';

interface DataTablesProps {
  data: IGetOrdersResponse[] | undefined;
  loading: boolean;
  handleSubmit: (
    type: 'CONFIRM' | 'REJECT' | 'SHIPPING',
    orderId: number,
  ) => void;
  dialog: (title: string, content: ReactNode, footer: ReactNode) => void;
}

interface DataTypeProducts extends IGetOrdersResponse {
  key: React.Key;
}

const DataTablesOrders: FC<DataTablesProps> = ({
  data,
  loading,
  handleSubmit,
  dialog,
}) => {
  const formatPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
  const [dataTable, setDataTable] = useState<DataTypeProducts[]>([]);
  const columnsProducts: TableColumnsType<DataTypeProducts> = [
    {
      title: 'Orders ID',
      dataIndex: 'id',
      width: 50,
    },
    {
      title: 'Buyer',
      dataIndex: 'userName',
      width: 100,
      render: (_, curr) =>
        `${curr.userId}-${curr.user.firstName} ${curr.user.lastName}`,
    },
    {
      title: 'Payment Method',
      dataIndex: 'payment_method',
      width: 100,
      render: (val) => <Tag>{val}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 200,
      render: (val) => (
        <Tag
          color={
            val == 'DONE'
              ? 'Green'
              : val == 'ON_PROGRESS' || val == 'ON_SHIPPING'
                ? 'Blue'
                : val == 'WAIT_USER' || val == 'CONFIRMATION_PAYMENT'
                  ? 'Orange'
                  : 'Red'
          }
        >
          {val}
        </Tag>
      ),
    },
    {
      title: 'Shipping Cost',
      dataIndex: 'shippingCost',
      render: (val) => formatPrice.format(val),
    },
    {
      title: 'Subtotal',
      dataIndex: 'subTotal',
      render: (_, record) =>
        formatPrice.format(
          record.orderItems.reduce(
            (a, b) => a + b.quantity * b.product.price,
            0,
          ),
        ),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      render: (val) => formatPrice.format(val),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 200,
      render: (_, record) => (
        <Button
          onClick={() => {
            dialog(
              record.status,
              <div>
                <Label>Warehouse : 1</Label>
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <Label className="text-lg font-semibold mt-6">
                      Order Details
                    </Label>
                    <p className="">
                      Status : <Tag>{record.status}</Tag>
                    </p>
                    <p className="">
                      Payment Method : <Tag>{record.payment_method}</Tag>
                    </p>
                    <p>
                      Order Time : {new Date(record.createdAt).toLocaleString()}
                    </p>
                    <p>Order Address : {record.shippingDetail}</p>
                    <p>
                      Order Shipping cost :{' '}
                      {formatPrice.format(record.shippingCost)}
                    </p>
                  </div>
                  <div>
                    <Label className="text-lg font-semibold">Order Items</Label>
                    <TableShadCn className="mt-4 font-openSans">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>Qty</TableHead>
                          <TableHead>Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {record.orderItems.map((val, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell>
                                {val.product.name} {val.variant.color} -{' '}
                                {val.variant.size}
                              </TableCell>
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
                            {formatPrice.format(
                              record.orderItems.reduce(
                                (a, b) => a + b.quantity * b.product.price,
                                0,
                              ),
                            )}
                          </TableCell>
                        </TableRow>
                      </TableFooter>
                    </TableShadCn>
                  </div>
                </div>
              </div>,
              <div className="flex mt-8 gap-4">
                {record.status == 'ON_PROGRESS' && (
                  <Button onClick={() => handleSubmit('SHIPPING', record.id)}>
                    SHIPPING
                  </Button>
                )}
                {record.status == 'CONFIRMATION_PAYMENT' && (
                  <div>
                    <Button onClick={() => handleSubmit('CONFIRM', record.id)}>
                      CONFIRM
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleSubmit('REJECT', record.id)}
                    >
                      REJECT
                    </Button>
                  </div>
                )}
              </div>,
            );
          }}
        >
          Manage
        </Button>
      ),
    },
  ];

  useEffect(() => {
    if (data) {
      setDataTable(
        data.map((val) => {
          return {
            ...val,
            key: val.id,
          };
        }),
      );
    }
  }, [data]);

  return (
    <>
      <div className="overflow-x-hidden">
        <div className="overflow-x-scroll overflow-y-scroll no-scrollbar">
          <Table
            columns={columnsProducts}
            loading={loading}
            dataSource={dataTable}
          />
        </div>
      </div>
    </>
  );
};

export default DataTablesOrders;
