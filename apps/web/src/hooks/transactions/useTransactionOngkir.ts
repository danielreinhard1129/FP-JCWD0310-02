import { axiosInstance } from '@/lib/axios';

interface RajaOngkirBody {
  origin: string;
  destination: string;
  weight: number;
  courier: string;
}
// const data = {
//   origin: originCityId,
//   destination: destinationCityId,
//   weight: 1700,
//   courier: 'tiki',
// };

const useTransacrionOngkir = () => {
  const TransactionOngkir = async (payload: RajaOngkirBody) => {
    try {
      const response = await axiosInstance.get('/trx/rajaongkir', {
        params: { ...payload },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return { TransactionOngkir };
};

export default useTransacrionOngkir;
