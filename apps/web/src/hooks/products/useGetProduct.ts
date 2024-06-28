import { axiosInstance } from '@/lib/axios';
import { Product } from '@/types/product.type';
import { useEffect, useState } from 'react';

export interface GetProductsResponse {
  data: Product;
}

export const useGetProduct = (productId: number) => {
  const [data, setData] = useState<GetProductsResponse>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  const getProduct = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get<GetProductsResponse>(
        `/products/${productId}`,
      );
      setData(response.data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return { data, isLoading, getProduct };
};
