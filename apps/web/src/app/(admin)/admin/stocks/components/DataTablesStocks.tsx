'use client';
import React, { FC, useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { TableColumnsType } from 'antd';
import { Product } from '@/types/product.type';
import DetailStockPopover from './DetailStockPopover';

interface DataTablesStock extends Product {
  warehouse: string;
  warehouseId: number;
}

interface DataTablesProps {
  data: DataTablesStock[] | undefined;
  loading: boolean;
  refetch: () => void;
}

interface DataTypeProducts extends Product {
  key: React.Key;
  status: string;
  warehouse: string;
  warehouseId: number;
}

const DataTablesStocks: FC<DataTablesProps> = ({ data, loading, refetch }) => {
  const [dataTable, setDataTable] = useState<DataTypeProducts[]>([]);
  const columnsProducts: TableColumnsType<DataTypeProducts> = [
    {
      title: 'Product',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      width: 150,
      render: (val) => (
        <Tag
          color={`${val == 'Good' ? 'green' : val == 'Less stock' ? 'yellow' : 'red'}`}
        >
          {val}
        </Tag>
      ),
    },
    {
      title: 'Total stocks',
      align: 'center',
      dataIndex: 'stock',
      width: 150,
    },
    {
      title: 'By warehouse',
      dataIndex: 'warehouse',
      width: 150,
    },
    {
      title: 'Manage',
      align: 'center',
      key: 'action',
      width: 200,
      render: (_, record: any, index) => (
        <div className="w-full flex justify-center items-center">
          <DetailStockPopover data={record} refetch={refetch} />
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (data) {
      setDataTable(
        data.map((val, indx) => {
          return {
            key: val.id,
            name: val.name,
            price: val.price,
            status:
              val.stock > 50
                ? 'Good'
                : val.stock != 0
                  ? 'Less stock'
                  : 'Out of stock',
            stock: val.stock,
            warehouse: val.warehouse,
            warehouseId: val.warehouseId,
            createdAt: val.createdAt,
            description: val.description,
            id: val.id,
            isDelete: val.isDelete,
            productCategory: val.productCategory,
            productImages: val.productImages,
            updateAt: val.updateAt,
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
            pagination={{
              disabled: true,
              style: { opacity: 0, display: 'none' },
            }}
            dataSource={dataTable}
          />
        </div>
      </div>
    </>
  );
};

export default DataTablesStocks;
