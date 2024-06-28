import { useEffect, useState } from 'react';
import useAxios from '../useAxios';

export const useDeleteProduct = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<string>('');
  const { axiosInstance } = useAxios();
  const deleteProduct = async (productId: number) => {
    try {
      setLoading(true);
      const response = await axiosInstance.delete(`/products/${productId}`);
      setMessages(response.data.messages);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { deleteProduct, messages, loading };
};
