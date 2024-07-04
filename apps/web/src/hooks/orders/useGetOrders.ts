import { useQuery } from 'react-query';
import useAxios from '../useAxios';
import { Product, Variant } from '@/types/product.type';

interface IProductOrders
  extends Omit<Product, 'productCategory' | 'productImages' | 'variant'> {}

interface IVariantOrders extends Omit<Variant, 'variantStocks'> {}

export interface IGetOrdersResponse {
  id: number;
  status: string;
  total: number;
  shippingCost: number;
  shippingDetail: number;
  discount: number;
  payment_method: string;
  snap_token: string | null;
  snap_redirect_url: string | null;
  createdAt: string;
  updateAt: string;
  userId: number;
  user: {
    firstName: string;
    lastName: string;
  };
  warehouseId: number;
  paymentsId: number;
  orderItems: {
    id: number;
    quantity: number;
    orderId: number;
    product: IProductOrders;
    variant: IVariantOrders;
    productId: number;
    variantId: number;
  }[];
}

export const useGetOrders = () => {
  const { axiosInstance } = useAxios();
  const { data, isError, isLoading, isSuccess, refetch } = useQuery({
    queryFn: async () =>
      await axiosInstance.get<IGetOrdersResponse[]>('/orders'),
  });
  return {
    data,
    isError,
    isLoading,
    isSuccess,
    refetch,
  };
};
