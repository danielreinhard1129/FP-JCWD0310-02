import { axiosInstance } from '@/lib/axios';

interface UpdateEmployeArgs {
  id: number;
  warehousesId: number;
}
const useUpdateEmploye = () => {
  const updateEmploye = async (payload: UpdateEmployeArgs) => {
    try {
      const response = await axiosInstance.put(
        `/user/update-employe/${payload.id}`,
        payload.warehousesId,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  return { updateEmploye };
};
export default useUpdateEmploye;
