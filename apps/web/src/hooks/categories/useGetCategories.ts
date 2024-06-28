import { useEffect, useState } from 'react';
import useAxios from '../useAxios';
import { Category } from '@/types/product.type';

export const useGetCategories = () => {
  const { axiosInstance } = useAxios();
  const [data, setData] = useState<Category[]>([]);

  const getCategories = async () => {
    try {
      const response = await axiosInstance.get('/categories');
      setData(response.data);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return { data };
};
