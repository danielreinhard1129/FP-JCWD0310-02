'use client';
import InputForms from '@/components/InputForms';
import { useCreateProduct } from '@/hooks/products/useCreateProduct';
import { useNotification } from '@/hooks/useNotification';
import { useRouter } from 'next/navigation';
import React from 'react';

const CreateProductAdminPage = () => {
  const router = useRouter();
  const { createProduct } = useCreateProduct();
  const { openNotification } = useNotification();
  return (
    <>
      <div className="p-8 ">
        <div className="rounded-lg bg-white p-4 border border-black">
          <h1 className="mb-4 font-bold text-xl">Create Product</h1>
          <InputForms
            handleSubmit={(e) =>
              openNotification.async(createProduct(e), () =>
                setTimeout(() => router.push('/admin/products'), 500),
              )
            }
          />
        </div>
      </div>
    </>
  );
};

export default CreateProductAdminPage;
