import useAxios from '../useAxios';

export const usePostStockMutationsConfirm = (
  stockMutationId: number,
  fromWarehouseId: number,
  toWarehouseId: number,
  quantity: number,
) => {
  const { axiosInstance } = useAxios();
  const postStockMutationsConfirm = async (
    type: 'CONFIRM' | 'REJECT' | 'ARRIVED',
  ) => {
    try {
      const response = await axiosInstance.post('/stock-mutations', {
        stockMutationId,
        fromWarehouseId,
        toWarehouseId,
        quantity,
        type,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  return { postStockMutationsConfirm };
};
