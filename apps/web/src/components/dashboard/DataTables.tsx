'use client';
import React, { FC, useEffect, useState } from 'react';
import { notification, Space, Table, Tag } from 'antd';
import { TableColumnsType, Modal } from 'antd';
import { Product, ProductCategory, Variant } from '@/types/product.type';
import Image from 'next/image';
import { NEXT_PUBLIC_BASE_API_URL } from '@/utils/config';
import { Button } from '../ui/button';
import { AlertCircle, Bolt, Trash } from 'lucide-react';
import Link from 'next/link';
import { useDeleteProduct } from '@/hooks/products/useDeleteProduct';
import { NotificationInstance } from 'antd/es/notification/interface';

interface DataTablesProps {
  data: Product[] | undefined;
  loading: boolean;
}

interface DataTypeProducts {
  key: React.Key;
  name: string;
  price: string;
  images: string;
  stocks: number;
  status: boolean;
  variant: Variant[];
  categories: ProductCategory[];
  productId: number;
  warehouse: string;
}

const ModalConfirm = (
  onDelete: (productId: number) => Promise<void>,
  id: number,
  onSuccess: NotificationInstance,
) => {
  Modal.confirm({
    title: 'Are you sure delete this task?',
    icon: <AlertCircle className="mr-2" />,
    content: 'Some descriptions',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      onDelete(id)
        .then((res) =>
          onSuccess.success({
            message: 'Success delete the product',
          }),
        )
        .catch(() =>
          onSuccess.error({ message: 'Something is error with the server!' }),
        );
    },
  });
};

const DataTables: FC<DataTablesProps> = ({ data, loading }) => {
  const [api, contextHolder] = notification.useNotification();
  const [dataTable, setDataTable] = useState<DataTypeProducts[]>([
    {
      key: 0,
      name: '',
      images: '',
      price: '',
      stocks: 0,
      status: false,
      categories: [],
      variant: [],
      productId: 0,
      warehouse: '',
    },
  ]);
  const { deleteProduct } = useDeleteProduct();
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
      render: (val, _, indx) =>
        val ? (
          <div
            key={indx}
            className="w-full h-full flex justify-center items-center"
          >
            <Image
              alt="image-product"
              width={100}
              height={100}
              className="rounded-md border border-black"
              src={`${NEXT_PUBLIC_BASE_API_URL}assets/${val}`}
            />
          </div>
        ) : (
          <div className="w-20 h-20 border border-black rounded-md"></div>
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
      title: 'Stocks',
      align: 'center',
      dataIndex: 'stocks',
      width: 80,
    },
    {
      title: 'Status',
      align: 'center',
      dataIndex: 'status',
      render: (_, record) => (
        <Tag color={record.status ? 'red' : 'green'}>
          {record.status ? 'Deleted' : 'Listed'}
          {record.status}
        </Tag>
      ),
      width: 80,
    },
    {
      title: 'Action',
      align: 'center',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Space size="middle" className="w-full justify-end">
          <Link href={`/admin/products/${record.key}`}>
            <Button
              variant="outline"
              className="p-2 h-8 flex justify-around items-center gap-2"
            >
              {' '}
              <Bolt width={15} /> Edit
            </Button>
          </Link>
          <Button
            onClick={() => ModalConfirm(deleteProduct, record.productId, api)}
            variant="outline"
            className="p-2 h-8 flex justify-around items-center gap-2"
          >
            {' '}
            <Trash width={15} /> Delete
          </Button>
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
            productId: val.id,
            name: val.name,
            stocks: val.stock,
            status: val.isDelete,
            categories: val.productCategory,
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
    <>
      {contextHolder}
      <Table
        columns={columnsProducts}
        loading={loading}
        dataSource={dataTable}
      />
    </>
  );
};

export default DataTables;
