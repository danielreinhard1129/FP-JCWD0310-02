import { useQuery } from 'react-query';
import useAxios from '../useAxios';
import { StockMutations } from '@/types/stock.type';
import { Product } from '@/types/product.type';

export interface IStockType {
  id: number;
  name: string;
  price: number;
  description: string;
  isDelete: boolean;
  createdAt: string;
  updateAt: string;
  count: number;
}
type IMapsStockType = Map<string, IStockType>;
type IMapTotalStockType = Map<string, number>;

interface IOverallStocks extends Product {
  stockMutations: Omit<StockMutations, 'product'>[];
}

export interface IGetStocksReportsResponse {
  import: any;
  export: any;
  totalStock: any;
  overallStocks: IOverallStocks[];
}

export const useGetStocksReports = (warehouseId: number | undefined) => {
  const { axiosInstance } = useAxios();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['stocksReports', warehouseId],
    queryFn: () =>
      axiosInstance.get<IGetStocksReportsResponse>(
        '/reports/stocks/' + warehouseId,
      ),
  });

  return {
    dataStocks: data?.data,
    isLoading,
    refetch,
  };
};
