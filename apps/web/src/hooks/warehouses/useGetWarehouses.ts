import useAxios from '../useAxios';
import { useQuery } from 'react-query';
import { Warehouse } from '@/types/warehouse.type';

interface IWarehouseResponse {
  data: Warehouse[];
}

export const useGetWarehouses = (filteredWarehouse: number) => {
  const { axiosInstance } = useAxios();
  const getWarehouses = useQuery({
    queryKey: ['filtered-warehouse', filteredWarehouse],
    queryFn: async () => {
      return await axiosInstance.get<IWarehouseResponse>(
        '/stock-mutations/warehouses',
        {
          params: {
            warehouse: filteredWarehouse,
          },
        },
      );
    },
  });

  return { getWarehouses };
};
