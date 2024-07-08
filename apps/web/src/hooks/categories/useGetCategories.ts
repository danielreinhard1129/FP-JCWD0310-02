import { useEffect, useState } from 'react';
import useAxios from '../useAxios';
import { Category } from '@/types/product.type';

interface IGetCategoriesResponse {
  categories: Category[];
  variants: {
    color: string[];
    size: string[];
  };
}

export const useGetCategories = () => {
  const { axiosInstance } = useAxios();
  const [data, setData] = useState<IGetCategoriesResponse>({
    categories: [],
    variants: {
      color: [],
      size: [],
    },
  });

  const getCategories = async () => {
    try {
      const response =
        await axiosInstance.get<IGetCategoriesResponse>('/categories');
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
