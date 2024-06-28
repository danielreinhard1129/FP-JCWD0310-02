import { useMutation } from 'react-query';
import useAxios from '../useAxios';
import { useState } from 'react';

export const usePostAddStocks = () => {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(false);
  const { axiosInstance } = useAxios();

  const postAddStocks = async (
    quantity: number,
    variantId: number,
    toWarehouse: number,
  ) => {
    try {
      const response = await axiosInstance.post('/stocks/' + variantId, {
        quantity,
        type: 'ADD',
        toWarehouse,
      });
      setData(response.data);
      return response;
    } catch (error) {
      throw error;
    }
  };
  return { data, postAddStocks, isLoading };
};
