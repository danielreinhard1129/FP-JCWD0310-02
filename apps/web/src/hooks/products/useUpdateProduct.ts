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
          return val.forEach((file: FileWithPath, index: number) => {
            const split = file.name.split('.');
            formData.append(
              'images',
              file,
              new Date().valueOf() +
                'a'.repeat(index) +
                '.' +
                split[split.length - 1],
            );
          });
        }
        return formData.append(key, JSON.stringify(val));
      });
      const response = await axiosInstance.patch(
        '/products/' + productId,
        formData,
      );
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return { updateProduct, loading };
};
