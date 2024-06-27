import { useState } from 'react';
import useAxios from '../useAxios';

export const usePostRequestStocks = () => {
  const [data, setData] = useState();
  const { axiosInstance } = useAxios();
  const postRequestStocks = async (
    toWarehouse: number,
    fromWarehouse: number,
    quantity: number,
    variantId: number,
  ) => {
    try {
      const response = await axiosInstance.post('/stocks/' + variantId, {
        toWarehouse,
        fromWarehouse,
        quantity,
        type: 'REQUEST',
      });
      setData(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  return { data, postRequestStocks };
};
