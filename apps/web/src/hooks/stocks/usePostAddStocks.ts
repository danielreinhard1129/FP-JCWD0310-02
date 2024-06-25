import { useMutation } from 'react-query';
import useAxios from '../useAxios';
import { useState } from 'react';

export const usePostAddStocks = (variantId: number, toWarehouse: number) => {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(false);
  const { axiosInstance } = useAxios();

  const postAddStocks = async (quantity: number) => {
    try {
      const response = await axiosInstance.post('/stocks/' + variantId, {
        toWarehouse,
        quantity,
        type: 'ADD',
      });
      setData(response.data);
      return response;
    } catch (error) {
      throw error;
    }
  };
  return { data, postAddStocks, isLoading };
};
