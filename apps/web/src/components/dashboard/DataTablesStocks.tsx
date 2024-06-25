'use client';
import React, { FC, useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { TableColumnsType } from 'antd';
import AddStockPopover from '../stock/AddStockPopover';
import RequestStockPopover from '../stock/RequestStockPopover';
import { Product } from '@/types/product.type';

interface DataTablesProps {
  data: Product[] | undefined;
  loading: boolean;
  refetch: () => void;
}

interface DataTypeProducts extends Product {
  key: React.Key;
  status: string;
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
      title: 'Action',
      align: 'center',
      key: 'action',
      width: 200,
      render: (_, record: any, index) => (
        <Space size="middle" className="w-full justify-end">
          {/* <AddStockPopover data={record} refetch={() => refetch()} /> */}
          {/* <RequestStockPopover data={record} refetch={() => refetch()} /> */}
        </Space>
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
