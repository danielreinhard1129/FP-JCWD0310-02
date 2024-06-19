'use client';
import React, { FC, useEffect, useState } from 'react';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { Product, Variant, VariantStock } from '@/types/product.type';
import Image from 'next/image';
import { NEXT_PUBLIC_BASE_API_URL } from '@/utils/config';

interface DataTablesProps {
  type: 'stocks' | 'products';
  data: Product[] | undefined;
  loading: boolean;
}

interface DataTypeProducts {
  key: React.Key;
  name: string;
  price: string;
  images: string;
  stocks: number;
  variant: Variant[];
  categories: string;
  productId: string;
  warehouse: string;
}
const columnsProducts: TableColumnsType<DataTypeProducts> = [
  {
    title: 'Images',
    dataIndex: 'images',
    width: 80,
    render: (val) =>
      val ? (
        <Image
          alt="image-product"
          width={80}
          height={80}
          className="rounded-md border border-black"
          src={`${NEXT_PUBLIC_BASE_API_URL}assets/${val}`}
        />
      ) : (
        <div className="w-20 h-20 border border-black rounded-md"></div>
      ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    width: 80,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    width: 80,
  },
  {
    title: 'Stocks',
    dataIndex: 'stocks',
    width: 80,
  },
  Table.EXPAND_COLUMN,
  {
    title: 'Categories',
    dataIndex: 'categories',
    width: 150,
  },
];
const columnsStocks: TableColumnsType<DataTypeProducts> = [
  {
    title: 'Product Id',
    dataIndex: 'productId',
    width: 80,
  },
  {
    title: 'Product Name',
    dataIndex: 'name',
    width: 80,
  },
  {
    title: 'Stocks',
    dataIndex: 'stocks',
    width: 80,
  },
  Table.EXPAND_COLUMN,
  {
    title: 'Warehouse',
    dataIndex: 'warehouse',
    width: 150,
  },
];

const DataTables: FC<DataTablesProps> = ({ data, type, loading }) => {
  const numberFormat = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
  const [dataTable, setDataTable] = useState<DataTypeProducts[]>([
    {
      key: 0,
      name: '',
      images: '',
      price: '',
      stocks: 0,
      categories: '',
      variant: [],
      productId: '',
      warehouse: '',
    },
  ]);
  useEffect(() => {
    if (data && !loading) {
      setDataTable(
        data.map((val, indx) => {
          return {
            key: val.id,
            productId: val.name,
            name: val.name,
            stocks: val.stock,
            categories: '',
            images: val.productImages[0].url,
            price: numberFormat.format(val.price),
            variant: val.variant,
            warehouse: '',
          };
        }),
      );
    }
  }, [data]);

  return (
    <Table
      columns={type == 'products' ? columnsProducts : columnsStocks}
      loading={loading}
      dataSource={dataTable}
      expandable={{
        expandedRowRender: (record) => (
          <div>
            <h2>Variants :</h2>
            {record.variant.map((val, index) => {
              return (
                <div key={index}>
                  <p>
                    {val.color} - {val.size} :{' '}
                    {val.variantStocks.reduce((prev, curr) => {
                      return prev + curr.quantity;
                    }, 0)}
                  </p>
                </div>
              );
            })}
          </div>
        ),
      }}
    />
  );
};

export default DataTables;
