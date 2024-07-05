import { useQuery } from 'react-query';
import useAxios from '../useAxios';
import { Order } from '@/types/order.types';

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

export const useGetSalesReports = () => {
  const { axiosInstance } = useAxios();

  const { data, refetch } = useQuery({
    queryKey: ['salesReports'],
    queryFn: () => axiosInstance.get<IGetSalesReportsResponse>('/reports'),
  });

  return {
    data,
    refetch,
  };
};
