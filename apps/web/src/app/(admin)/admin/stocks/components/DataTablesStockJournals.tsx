'use client';
import React, { FC, useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { TableColumnsType } from 'antd';
import { StockMutations } from '@/types/stock.type';
import DialogStockMutations from './DialogStockMutations';

interface DataTablesProps {
  data: StockMutations[] | undefined;
  loading: boolean;
  refetch: () => void;
}

interface DataTypeProducts
  extends Omit<StockMutations, 'fromWarehouse' | 'toWarehouse' | 'product'> {
  key: React.Key;
  fromWarehouse: string;
  toWarehouse: string;
  product: string;
}

const DataTablesStockJournals: FC<DataTablesProps> = ({
  data,
  loading,
  refetch,
}) => {
  const [dataTable, setDataTable] = useState<DataTypeProducts[]>([]);
  const columnsProducts: TableColumnsType<DataTypeProducts> = [
    {
      title: 'Product',
      dataIndex: 'product',
      width: 90,
    },
    {
      title: 'Variant',
      dataIndex: 'variant',
      width: 90,
      align: 'center',
      render: (val) => (
        <Tag>
          {val.color} - {val.size}
        </Tag>
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      align: 'center',
      width: 90,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 90,
      align: 'center',
      render: (val) => (
        <Tag
          className="font-mono"
          color={
            val == 'DONE'
              ? 'green'
              : val == 'WAIT_CONFIRMATION'
                ? 'orange'
                : val == 'ON_PROGRESS'
                  ? 'Blue'
                  : 'Red'
          }
        >
          {val}
        </Tag>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      align: 'center',
      width: 90,
    },
    {
      title: 'From Warehouse',
      dataIndex: 'fromWarehouse',
      align: 'center',
      width: 90,
    },
    {
      title: 'To Warehouse',
      dataIndex: 'toWarehouse',
      align: 'center',
      width: 90,
    },
    {
      title: 'Time',
      dataIndex: 'createdAt',
      align: 'center',
      width: 90,
      render: (val) => new Date(val).toDateString(),
    },
  ];

  useEffect(() => {
    if (data) {
      setDataTable(
        data.map((val, indx) => {
          return {
            key: indx,
            id: val.id,
            quantity: val.quantity,
            status: val.status,
            type: val.type,
            sku: val.sku,
            createdAt: new Date(),
            updateAt: new Date(),
            fromWarehouseId: 0,
            fromWarehouse: val.fromWarehouse ? val.fromWarehouse.name : '-',
            toWarehouseId: 0,
            toWarehouse: val.toWarehouse.name,
            product: val.product.name,
            variant: val.variant,
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

export default DataTablesStockJournals;
