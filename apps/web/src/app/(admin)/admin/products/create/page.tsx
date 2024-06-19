'use client';
import InputForms, { InputFormsDataProps } from '@/components/InputForms';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useCreateProduct } from '@/hooks/products/useCreateProduct';
import React from 'react';

const CreateProductAdminPage = () => {
  const form: InputFormsDataProps[] = [
    {
      id: 'name',
      name: 'Name',
      label: 'Name',
      placeholder: 'Please input your product name',
      type: 'text',
    },
    {
      id: 'image',
      name: 'Images',
      label: 'Images',
      placeholder: 'Please input your product images',
      type: 'image',
    },
    {
      id: 'price',
      name: 'Price',
      label: 'Price',
      placeholder: 'Please input your product price',
      type: 'number',
    },
    {
      id: 'description',
      name: 'Description',
      label: 'Description',
      placeholder: 'Please input your product description',
      type: 'text',
    },
    {
      id: 'categories',
      name: 'Categories',
      label: 'Categories',
      placeholder: 'Please input your product categories',
      type: 'text',
    },
    {
      id: 'variant',
      name: 'Variant',
      label: 'Variant',
      placeholder: 'Please input your product categories',
      type: 'variant',
    },
  ];
  const { createProduct, messages } = useCreateProduct();

  return (
    <>
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Create Product</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <InputForms PropArr={form} onSubmit={(e) => createProduct(e)} />
            </div>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </>
  );
};

export default CreateProductAdminPage;
