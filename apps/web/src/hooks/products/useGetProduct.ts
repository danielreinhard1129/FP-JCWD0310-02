import { axiosInstance } from '@/lib/axios';
import { Product } from '@/types/product.type';
import { useEffect, useState } from 'react';

export interface GetProductsResponse {
  data: Product;
}

export const useGetProduct = (productId: number) => {
  const [id, setId] = useState<Number>(productId);
  const [data, setData] = useState<GetProductsResponse>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  const getProduct = async () => {
    try {
      const response = await axiosInstance.get<GetProductsResponse>(
        `/products/${id}`,
      );
      setData(response.data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getProduct();
  }, [id]);

  return { data, isLoading, id, setId };
};
