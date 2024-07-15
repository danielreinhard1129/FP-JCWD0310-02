import { useQuery } from 'react-query';
import useAxios from '../useAxios';
import { Order } from '@/types/order.types';
import { useDebounce } from 'use-debounce';

type IMapTotalStock = Map<string, Omit<Order, 'orderItems' | 'user'>>;

export interface IGetSalesReportsResponse {
  salesByCategory: {
    id: number;
    name: string;
    count: number;
    total: number | null;
  }[];
  salesByProduct: {
    id: number;
    name: string;
    price: number;
    description: string;
    isDelete: boolean;
    createdAt: string;
    updateAt: string;
    count: number;
    total: number | null;
    productImages: {
      url: string;
    }[];
  }[];
  revenue: number;
  activeOrders: {
    count: number;
    total: number;
  };
  cancelledOrders: { count: number; total: number };
  recentOrder: Order[];
  totalSales: IMapTotalStock;
}

interface IPayloadGetSalesReports {
  warehouseId: number | undefined;
  date: {
    startDate: string | undefined;
    endDate: string | undefined;
  };
}

export const useGetSalesReports = (payload: IPayloadGetSalesReports) => {
  const { axiosInstance } = useAxios();
  const [params] = useDebounce([payload.date, payload.warehouseId], 500);
  const { data, refetch, isLoading } = useQuery({
    queryKey: ['salesReports', ...params],
    queryFn: () =>
      axiosInstance.get<IGetSalesReportsResponse>(
        '/reports/sales/' + payload.warehouseId,
        {
          params: payload.date,
        },
      ),
  });

  return {
    data,
    refetch,
    isLoading,
  };
};
