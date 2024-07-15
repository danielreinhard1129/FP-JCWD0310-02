import { useQuery } from 'react-query';
import useAxios from '../useAxios';
import { StockMutations } from '@/types/stock.type';
import { Product } from '@/types/product.type';
import { useDebounce } from 'use-debounce';

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

interface IStockMutationsOverall
  extends Omit<StockMutations, 'product' | 'createdAt'> {
  createdAt: string;
}

interface IOverallStocks extends Product {
  stockMutations: IStockMutationsOverall[];
}

export interface IGetStocksReportsResponse {
  import: any;
  export: any;
  totalStock: any;
  overallStocks: IOverallStocks[];
}

interface IPayloadGetStockReports {
  warehouseId: number | undefined;
  date: {
    startDate: string | undefined;
    endDate: string | undefined;
  };
}

export const useGetStocksReports = (payload: IPayloadGetStockReports) => {
  const { axiosInstance } = useAxios();
  const [params] = useDebounce([payload.date, payload.warehouseId], 500);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['stocksReports', ...params],
    queryFn: () =>
      axiosInstance.get<IGetStocksReportsResponse>(
        '/reports/stocks/' + payload.warehouseId,
        {
          params: payload.date,
        },
      ),
  });

  return {
    dataStocks: data?.data,
    isLoading,
    refetch,
  };
};
