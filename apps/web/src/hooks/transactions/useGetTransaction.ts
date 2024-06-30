import { useQuery } from 'react-query';
import useAxios from '../useAxios';
import { Product, Variant } from '@/types/product.type';

interface IOrderItem {
  id: number;
  quantity: number;
  orderId: number;
  productId: number;
  variantId: number;
  product: Product;
  variant: Variant;
}

interface IOrder {
  id: number;
  status: string;
  total: number;
  shippingCost: number;
  shippingDetail: number;
  discount: number;
  payment_method: string;
  snap_token: null;
  snap_redirect_url: null;
  createdAt: Date;
  updateAt: Date;
  userId: number;
  warehouseId: number;
  paymentsId: number;
  orderItems: IOrderItem[];
}

interface IGetTransactionsResponse {
  transaction: {
    id: number;
    invoiceNumber: string;
    paymentMethod: string;
    snapToken: string;
    snapRedirectUrl: string;
    paymentProof: string;
    createdAt: Date;
    updateAt: Date;
  };
  order: IOrder;
}

export const useGetTransaction = (transactionId: string) => {
  const { axiosInstance } = useAxios();
  const { data, refetch, isLoading, isSuccess, isError } = useQuery({
    queryKey: ['transactionId', transactionId],
    queryFn: async () =>
      await axiosInstance.get<IGetTransactionsResponse>(
        '/transactions/' + transactionId,
      ),
  });

  return { data, refetch, isLoading, isSuccess, isError };
};
