'use client';
import { useGetProduct } from '@/hooks/products/useGetProduct';
import React from 'react';

const AdminProductDetails = ({ params }: { params: { id: number } }) => {
  const { data, id, isLoading, setId } = useGetProduct(params.id);
  return <div>{JSON.stringify(data?.data)}</div>;
};

export default AdminProductDetails;
