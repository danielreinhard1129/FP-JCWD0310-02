'use client';
import InputForms from '@/components/InputForms';
import { useCreateProduct } from '@/hooks/products/useCreateProduct';
import React from 'react';

const CreateProductAdminPage = () => {
  const { createProduct, messages } = useCreateProduct();

  return (
    <>
      <div className="px-6 py-8">
        <div className="rounded-lg bg-white p-4">
          <h1 className="mb-4 font-bold text-xl">Create Product</h1>
          <InputForms handleSubmit={(e) => createProduct(e)} />
        </div>
      </div>
    </>
  );
};

export default CreateProductAdminPage;
