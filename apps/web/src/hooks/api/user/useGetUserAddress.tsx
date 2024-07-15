// /get-users-address/:id

// <<<<<<< HEAD
// import { axiosInstance } from '@/lib/axios';
// import { useAppSelector } from '@/redux/hooks';
// import { Address } from '@/types/address.types';

// const useGetUserAddress = () => {
//   const { id } = useAppSelector((state) => state.user);
//   console.log(id);
//   const getUserAddress = async () => {
//     try {
//       const response = await axiosInstance.get(`/user/get-users-address/${id}`);
//       console.log(response.data.Addresses);
//       return response.data.Addresses;
//     } catch (error) {
//       throw error;
//     }
//   };

//   return { getUserAddress };
// =======
import useAxios from '@/hooks/useAxios';
import { axiosInstance } from '@/lib/axios';
import { useAppSelector } from '@/redux/hooks';
import { Address } from '@/types/address.types';
import { useQuery } from 'react-query';

const useGetUserAddress = () => {
  const { axiosInstance } = useAxios();
  const { id } = useAppSelector((state) => state.user);

  const { data } = useQuery({
    queryKey: ['getUserAddresses'],
    queryFn: () =>
      axiosInstance.get<Address[]>(`/user/get-users-address/${id}`),
  });

  return { data };
  // >>>>>>> develop
};
export default useGetUserAddress;
