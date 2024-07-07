'use client';
import InputFormsUpdate from '@/components/InputFormsUpdate';
import { Button } from '@/components/ui/button';
import { useGetProduct } from '@/hooks/products/useGetProduct';
import { useUpdateProduct } from '@/hooks/products/useUpdateProduct';
import useModal from '@/hooks/useModal';
import { useNotification } from '@/hooks/useNotification';
import React, { useEffect } from 'react';

const AdminProductDetails = ({ params }: { params: { id: number } }) => {
  const { data, getProduct } = useGetProduct(params.id);
  const { openNotification } = useNotification();
  const { ModalAsync, setOpen, setTitle } = useModal();
  const { updateProduct, loading } = useUpdateProduct();
  useEffect(() => {
    getProduct();
  }, [loading]);

  return (
    <div className="p-8">
      <ModalAsync
        description={
          data?.data.isDelete
            ? `Are you sure to re listed product ${data?.data.name}`
            : `Are you sure to delete ${data?.data.name}`
        }
        handleOk={() =>
          openNotification.async(
            updateProduct(params.id, { isDelete: !data?.data.isDelete }),
          )
        }
        loading={loading}
      />
      <div className="rounded-lg bg-white p-4 border border-black">
        <div className="flex justify-between">
          <h1 className="mb-4 font-bold text-xl">Product details</h1>
          <div className="flex gap-4">
            <Button
              variant="ghost"
              className={`border text-primary cursor-none ${data?.data.isDelete ? 'border-red-500' : 'border-green-500'}`}
            >
              {data?.data.isDelete ? 'Deleted' : 'Listed'}
            </Button>
            <Button
              onClick={() => setOpen(true)}
              variant={data?.data.isDelete ? 'default' : 'destructive'}
              className="border text-primary-foreground"
            >
              {data?.data.isDelete ? 'Undo Delete' : 'Delete Product'}
            </Button>
          </div>
        </div>
        <InputFormsUpdate
          data={data?.data}
          handleSubmit={(e) =>
            openNotification.async(updateProduct(params.id, e))
          }
        />
      </div>
    </div>
  );
};

export default AdminProductDetails;
