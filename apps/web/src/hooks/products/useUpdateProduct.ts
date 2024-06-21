import { useState } from 'react';
import useAxios from '../useAxios';
import { FileWithPath } from 'react-dropzone';

export const useUpdateProduct = () => {
  const { axiosInstance } = useAxios();
  const [loading, setLoading] = useState<boolean>(false);
  const updateProduct = async (productId: number, payload: any) => {
    try {
      setLoading(true);
      const formData = new FormData();
      Object.entries(payload).map(([key, val]: any) => {
        if (key == 'image') {
          return val.forEach((file: FileWithPath) => {
            formData.append('images', file);
          });
        }
        return formData.append(key, JSON.stringify(val));
      });
      const response = await axiosInstance.patch(
        '/products/' + productId,
        formData,
      );
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return { updateProduct, loading };
};
