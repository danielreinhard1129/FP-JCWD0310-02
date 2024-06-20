import { useEffect, useState } from 'react';
import useAxios from '../useAxios';

export const useDeleteProduct = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [messages, setMessages] = useState<string>('');
  const { axiosInstance } = useAxios();
  const deleteProduct = async (productId: number) => {
    try {
      setLoading(true);
      const response = await axiosInstance.delete(`/products/${productId}`);
      setMessages(response.data.messages);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { deleteProduct, messages, loading };
};
