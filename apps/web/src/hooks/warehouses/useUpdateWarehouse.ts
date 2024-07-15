import { axiosInstance } from '@/lib/axios';
import { useNotification } from '../useNotification';
interface Warehouse {
  name: string;
  street: string;
  city: string;
  province: string;
  subdistrict: string;
}
const useUpdateWarehouse = () => {
  const { openNotification } = useNotification();
  const updateWarehouse = async (payload: Warehouse, warehouseId: number) => {
    try {
      const { data } = await axiosInstance.post(
        `/warehouse/update-warehouse/${warehouseId}`,
        payload,
      );
      console.log(data);
      openNotification.success({
        message: 'Warehouse updated successfully',
      });
      window.location.replace('/admin/warehouses');
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return { updateWarehouse };
};
export default useUpdateWarehouse;
