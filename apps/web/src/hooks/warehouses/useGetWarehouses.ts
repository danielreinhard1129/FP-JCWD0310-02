import useAxios from '../useAxios';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { Warehouse } from '@/types/warehouse.type';

interface IWarehouseResponse {
  data: Warehouse[];
}

export const useGetWarehouses = () => {
  const { axiosInstance } = useAxios();
  const [data, setData] = useState();
  const getWarehouses = async (filteredWarehouse: number | string) => {
    try {
      const response = await axiosInstance.get<IWarehouseResponse>(
        '/stock-mutations/warehouses',
        {
          params: {
            warehouse: filteredWarehouse,
          },
        },
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const mutate = useMutation({
    mutationFn: getWarehouses,
  });

  return { data, mutate };
};
