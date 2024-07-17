import { axiosInstance } from '@/lib/axios';

interface RajaOngkirBody {
  origin: string;
  destination: string;
  qty: number;
  courier: string;
}

const useTransacrionOngkir = () => {
  const transactionOngkir = async (payload: RajaOngkirBody) => {
    try {
      const response = await axiosInstance.post('/transactions/rajaongkir', {
        origin: payload.origin,
        destination: payload.destination,
        qty: payload.qty,
        courier: payload.courier,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return { transactionOngkir };
};

export default useTransacrionOngkir;
