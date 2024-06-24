'use client';
import useGetAddress from '@/hooks/api/user/useGetAddress';
import { useEffect, useState } from 'react';
interface User {
  addresses: {
    name?: string;
    lat: number;
    lon: number;
    street?: string;
    city: string;
    province: string;
  }[];
}

export const ProfileAddress = () => {
  const { getAddress } = useGetAddress();
  const [address, setAddress] = useState<User>({} as User);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const received = {
          addresses: [
            {
              name: '',
              lat: 0,
              lon: 0,
              street: '',
              city: '',
              province: '',
            },
          ],
        };
        const response = await getAddress(received);
        setAddress(response);
        console.log(response);
      } catch (error) {}
    };
    fetchUser();
  }, []);

  return (
    <div className="w-full h-full max mt-8 max-md:w-80 border-4 p-4 flex flex-col gap-y-4 text-black font-normal border-gray-300 rounded-lg shadow-lg">
      <div className="flex justify-between">
        <div className="text-xl">Address</div>
        <button
          className="ml-1 bg-black text-white font-medium p-2 rounded-md "
          type="submit"
        >
          Add Address
        </button>
      </div>

      {/* <div className="bg-gray-50 w-full p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-bold">Budi Anduk</div>
          <div className="text-red-500 cursor-pointer hover:text-red-700 bg-slate-900 px-2 py-1 rounded-md">
            Hapus
          </div>
        </div>
        <div className="space-y-2">
          <div className="font-bold">Alamat</div>
          <div className="text-sm">
            Pacific Building, Jl. Laksda Adisucipto No.157 lt. 4, Demangan Baru,
            Caturtunggal, Kec. Depok, Kabupaten Sleman, DIY 55281
          </div>
          <div className="text-sm text-gray-600">Utama</div>
        </div>
      </div> */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">
            {address.addresses[0].name}
          </div>
          <div className="text-gray-600 text-sm mb-4">
            {address.addresses[0].street +
              ' ' +
              address.addresses[0].city +
              ' ' +
              address.addresses[0].province}
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-700 ">Utama</div>
            <button className="text-sm text-red-500 hover:text-red-700 focus:outline-none">
              Hapus
            </button>
            <button className="text-sm text-red-500 hover:text-red-700 focus:outline-none">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
