import { useEffect, useState } from 'react';
import useGetAddress from '@/hooks/api/user/useGetAddress';
import { CreateAddress } from './CreateAddress';
import useDeleteAddress from '@/hooks/api/user/useDeleteAddress';
import { Edit3Icon } from 'lucide-react';
import { EditAddress } from './EditAddress';

interface Address {
  id: number;
  name: string;
  lat: number;
  lon: number;
  street: string;
  city: string;
  province: string;
  subdistricts: string;
  postalCode: string;
  isPrimary: boolean;
}

export const ProfileAddress = () => {
  const { getAddress } = useGetAddress();
  const { deleteAddress } = useDeleteAddress();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showCreateAddress, setshowCreateAddress] = useState(false);
  const [showEditAddress, setshowEditAddress] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const received = {
          Addresses: [
            {
              id: 0,
              name: '',
              lat: 0,
              lon: 0,
              street: '',
              city: '',
              province: '',
              postalCode: '',
              isPrimary: false,
            },
          ],
        };
        const response = await getAddress(received);
        setAddresses(response);
        console.log(response);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    if (addresses.length === 0) {
      fetchAddresses();
    }
  }, [getAddress]);

  const handleAddress = () => {
    setshowCreateAddress(true);
  };

  return (
    <div className="w-full h-full mt-8 max-md:w-80 border-4 p-4 flex flex-col gap-y-4 text-black font-normal border-gray-300 rounded-lg shadow-lg ">
      {showCreateAddress || showEditAddress ? (
        <div></div>
      ) : (
        <div className="w-full h-full max-md:w-80   flex flex-col gap-y-4 text-black font-normal  ">
          <div className="flex justify-between ">
            <div className="text-xl font-semibold ">Addresses</div>
            <button
              className="ml-1 bg-black text-white font-medium p-2 rounded-md "
              type="submit"
              onClick={handleAddress}
            >
              Add Address
            </button>
          </div>

          <div
            className="overflow-y-auto  "
            style={{
              scrollbarWidth: 'none',
            }}
          >
            {' '}
            {addresses.map((address, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden mt-1  "
              >
                <div className="px-6 py-4">
                  <div className="text-lg mb-2 ">
                    {`Alamat: ${address.street},${address.city}, ${address.province}, ${address.postalCode}`}
                  </div>
                  <div className=" text-sm mb-4 text-gray-600 ">
                    {'Detail Alamat: ' + address.name}
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      className="text-sm text-red-500 hover:text-red-700 focus:outline-none"
                      onClick={() => deleteAddress(address.id)}
                    >
                      Hapus
                    </button>
                    <button
                      className="text-sm text-red-500 hover:text-red-700 focus:outline-none"
                      onClick={() => {
                        setshowEditAddress(true);
                        setSelectedAddressId(address.id);
                      }}
                    >
                      Edit
                    </button>
                    <div className="text-sm text-gray-700 border p-1 rounded-sm">
                      {address.isPrimary ? 'Utama' : ''}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showCreateAddress && (
        <CreateAddress setShowCreateAddress={setshowCreateAddress} />
      )}

      {showEditAddress && selectedAddressId !== null && (
        <EditAddress
          setShowEditAddress={setshowEditAddress}
          addressId={addresses.find((item) => item.id === selectedAddressId)!}
        />
      )}
    </div>
  );
};
