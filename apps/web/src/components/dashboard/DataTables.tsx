'use client';
import React, { FC, useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { TableColumnsType } from 'antd';
import { Product, ProductCategory, Variant } from '@/types/product.type';
import Image from 'next/image';
import { BASE_API_URL } from '@/utils/config';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useDeleteProduct } from '@/hooks/products/useDeleteProduct';
import useModal from '@/hooks/useModal';
import { useNotification } from '@/hooks/useNotification';
import { Bolt, Trash } from 'lucide-react';
import blurImage from '../../../public/blur-image.jpg';
import noImage from '../../../public/no-image.jpg';
import DialogStock from '../../app/(admin)/admin/stocks/components/DialogStock';

interface DataTablesProps {
  data: Product[] | undefined;
  loading: boolean;
  refetch: () => void;
}

interface DataTypeProducts {
  key: React.Key;
  name: string;
  price: string;
  images: string;
  status: boolean;
  variant: Variant[];
  categories: ProductCategory[];
  productId: number;
  warehouse: string;
}

const DataTables: FC<DataTablesProps> = ({ data, loading, refetch }) => {
  const { openNotification } = useNotification();
  const { ModalAsync, setOpen, setTitle } = useModal();
  const [selected, setSelected] = useState<number>(0);
  const [dataTable, setDataTable] = useState<DataTypeProducts[]>([
    {
      key: 0,
      name: '',
      images: '',
      price: '',
      status: false,
      categories: [],
      variant: [],
      productId: 0,
      warehouse: '',
    },
  ]);
  const { deleteProduct, loading: deleteLoading } = useDeleteProduct();
  const numberFormat = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
  const columnsProducts: TableColumnsType<DataTypeProducts> = [
    {
      title: 'Images',
      align: 'center',
      dataIndex: 'images',
      width: 100,
      render: (val, render, indx) =>
        render.images.length ? (
          <div
            key={indx}
            className="w-[100px] h-[100px] flex justify-center items-center "
          >
            <img
              alt="image-product"
              width={100}
              height={100}
              loading="lazy"
              className="w-[100px] h-[100px] object-cover rounded-md border border-black"
              src={`${BASE_API_URL}/assets/${val}`}
              onError={(
                event: React.SyntheticEvent<HTMLImageElement, Event>,
              ) => {
                event.currentTarget.src = blurImage.src;
              }}
            />
          </div>
        ) : (
          <div
            key={indx}
            className="w-[100px] h-[100px] flex justify-center items-center"
          >
            <Image
              alt="image-product"
              width={100}
              height={100}
              loading="lazy"
              className="w-[100px] h-[100px] object-cover rounded-md border border-input"
              src={noImage}
            />
          </div>
        ),
    },
    {
      title: 'Name',
      align: 'center',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: 'Price',
      align: 'center',
      dataIndex: 'price',
      width: 150,
    },
    {
      title: 'Categories',
      align: 'center',
      key: 'categories',
      dataIndex: 'categories',
      render: (_, { categories }, indx) => (
        <div key={indx} className="w-full flex justify-center">
          {categories.map((tag, index) => {
            return <Tag key={index}>{tag.category.name}</Tag>;
          })}
        </div>
      ),
    },
    {
      title: 'Status',
      align: 'center',
      dataIndex: 'status',
      render: (_, record) => (
        <Tag color={record.status ? 'red' : 'green'}>
          {record.status ? 'Deleted' : 'Listed'}
        </Tag>
      ),
      width: 80,
    },
    {
      title: 'Edit',
      align: 'center',
      key: 'action',
      width: 200,
      render: (_, record, index) => (
        <Space size="middle" className="w-full flex justify-center">
          <Link href={`/admin/products/${record.key}`}>
            <Button
              variant="outline"
              className="p-2 h-8 flex justify-around items-center gap-2"
            >
              {' '}
              <Bolt width={15} /> Edit
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    refetch();
  }, [deleteLoading]);

  useEffect(() => {
    if (data) {
      setDataTable(
        data.map((val, indx) => {
          return {
            key: val.id,
            productId: val.id,
            name: val.name,
            status: val.isDelete,
            categories: val.productCategory,
            images: val.productImages[0]?.url || '',
            price: numberFormat.format(val.price),
            variant: val.variant,
            warehouse: '',
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

export default DataTables;
