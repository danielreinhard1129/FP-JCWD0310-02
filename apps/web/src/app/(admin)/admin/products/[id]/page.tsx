'use client';
import InputForms from '@/components/InputForms';
import { Button } from '@/components/ui/button';
import { useGetProduct } from '@/hooks/products/useGetProduct';
import { useUpdateProduct } from '@/hooks/products/useUpdateProduct';
import React, { useEffect } from 'react';

const AdminProductDetails = ({ params }: { params: { id: number } }) => {
  const { data, getProduct } = useGetProduct(params.id);
  const { updateProduct, loading } = useUpdateProduct();
  useEffect(() => {
    getProduct();
  }, [loading]);

  return (
    <div className="px-6 py-8">
      <div className="rounded-lg bg-white p-4">
        <div className="flex justify-between">
          <h1 className="mb-4 font-bold text-xl">Product details</h1>
          {data?.data.isDelete ? (
            <div className="flex gap-4">
              <Button
                variant="ghost"
                className="border text-primary cursor-none border-red-500"
              >
                Deleted
              </Button>
              <Button
                onClick={() => updateProduct(params.id, { isDelete: false })}
                variant="default"
                className="border cursor-none text-primary-foreground"
              >
                Undo Delete
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              className="border text-primary cursor-none border-green-500"
            >
              Listed
            </Button>
          )}
        </div>
        <InputForms
          data={data?.data}
          handleSubmit={(e) => updateProduct(params.id, e)}
        />
      </div>
    </div>
  );
};

export default AdminProductDetails;
