'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePostOrder } from '@/hooks/orders/usePostOrder';
import { useNotification } from '@/hooks/useNotification';
import { useGetCarts } from '@/hooks/carts/useGetCarts';
import { useAppSelector } from '@/redux/hooks';
import { BASE_API_URL } from '@/utils/config';
import OrderDialogConfirmation from './components/OrderDialogConfirmation';
import { Address } from '@/types/address.types';
import { useRouter } from 'next/navigation';
import useGetUserAddress from '@/hooks/api/user/useGetUserAddress';
import useGetAddress from '@/hooks/api/user/useGetAddress';
import useTransacrionOngkir from '@/hooks/transactions/useTransactionOngkir';

interface TransactionOngkir {
  service: string;
  description: string;
  cost: [
    {
      value: number;
    },
  ];
}
const OrderPage = () => {
  const { transactionOngkir } = useTransacrionOngkir();
  const router = useRouter();
  const { getAddress } = useGetAddress();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const { id } = useAppSelector((state) => state.user);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [selectedCourier, setSelectedCourier] = useState<string>('');
  const [transactionsOngkir, setTransactionsOngkir] = useState<
    TransactionOngkir[]
  >([]);
  const { data, isSuccess } = useGetCarts(id);
  const { postOrderAsync, data: dataPost } = usePostOrder(router.push);
  const { data: dataAddresses } = useGetUserAddress();
  const { openNotification } = useNotification();
  const formatPrice = new Intl.NumberFormat('id-ID', {
    currency: 'IDR',
    style: 'currency',
  });

  const handlePost = () => {
    if (data) {
      openNotification.async(
        postOrderAsync({
          shippingDetail: Number(selectedAddress),
          shippingCost: 0,
        }),
      );
    } else openNotification.error({ message: 'Something is error!' });
  };
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
  useEffect(() => {
    fetchAddresses();
  }, []);
  console.log(selectedAddress, selectedCourier);
  const fetchOngkir = async () => {
    try {
      const received = {
        origin: 'Jakarta',
        destination: selectedAddress,
        qty: 2,
        courier: selectedCourier,
      };
      const response = await transactionOngkir(received);
      setTransactionsOngkir(response);
      console.log(response);
    } catch (error) {
      console.error('Error fetching ongkir:', error);
    }
  };
  useEffect(() => {
    if (selectedAddress === '' || selectedCourier === '') return;
    fetchOngkir();
  }, [selectedAddress, selectedCourier]);
  console.log(transactionsOngkir);
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row-reverse justify-end w-full gap-4">
        <Card className="rounded-2xl bg-white w-[50%]">
          <CardHeader>
            <CardTitle className="font-rubik">Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {JSON.stringify(dataPost?.data)}
            <div className="flex flex-col mb-8 gap-2 font-rubik">
              {isSuccess &&
                data &&
                data.data.map((val, indx) => {
                  return (
                    <div key={indx} className="flex justify-between mt-2">
                      <Label>
                        {val.quantity} - {val.product.name} {val.variant.color}{' '}
                        {val.variant.size}
                      </Label>
                      <Label>
                        {formatPrice.format(val.quantity * val.product.price)}
                      </Label>
                    </div>
                  );
                })}
              <div className="flex justify-between">
                <Label className="text-lg">Total</Label>
                <Label className="text-lg">
                  {isSuccess &&
                    data &&
                    formatPrice.format(
                      data.data.reduce(
                        (a, b) => a + b.quantity * b.product.price,
                        0,
                      ),
                    )}
                </Label>
              </div>
            </div>
            <div className="flex flex-col w-full gap-6 items-center justify-between">
              <div className="flex flex-col w-full gap-6">
                <div className="flex flex-col max-w-96 gap-2">
                  <h1 className="font-rubik font-bold text-xl">
                    Select your address
                  </h1>

                  <select
                    className="bg-transparent h-10 px-2 border overflow-hidden border-black rounded-lg"
                    onChange={(e) => setSelectedAddress(e.target.value)}
                  >
                    <option value="">Select address</option>
                    {dataAddresses?.data.map((address, index) => (
                      <option key={index} value={address.id}>
                        {address?.street},{address?.subdistrict},{address?.city}{' '}
                        {address?.postalCode},{address?.province}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col max-w-96 gap-2">
                  <h1 className="font-rubik font-bold text-xl">
                    Select your payment
                  </h1>
                  <select
                    className="bg-transparent h-10 px-2 border overflow-hidden border-black rounded-lg"
                    onChange={fetchOngkir}
                  >
                    <option value="1">Manual</option>
                    <option disabled value="1">
                      Midtrans
                    </option>
                  </select>
                </div>
                <div className="flex flex-col max-w-96 gap-2">
                  <h1 className="font-rubik font-bold text-xl">
                    Select delivery options
                  </h1>
                  <select
                    className="bg-transparent h-10 px-2 border overflow-hidden border-black rounded-lg"
                    onChange={(e) => setSelectedCourier(e.target.value)}
                  >
                    <option value="">Select delivery options</option>
                    <option value="tiki">TIKI</option>
                    <option value="pos">POS</option>
                    <option value="jne">JNE</option>
                  </select>
                  {transactionsOngkir?.length > 0 ? (
                    <select className="bg-transparent h-10 px-2 border overflow-hidden border-black rounded-lg">
                      <option value="" disabled>
                        Select courier
                      </option>
                      {transactionsOngkir?.map((courier, index) => (
                        <option
                          key={index}
                          value={courier.cost[0].value}
                        >{`${courier.description} - ${courier.cost[0].value}`}</option>
                      ))}
                    </select>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <OrderDialogConfirmation
                data={data?.data}
                addressDetail={{
                  address: dataAddresses?.data.find(
                    (val) => val.id == Number(selectedAddress),
                  ),
                  estimations: '3 Days',
                  fee: 50000,
                  options: 'TIKI',
                }}
                handleOrder={() => handlePost()}
              />
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl bg-white w-[70%]">
          <CardHeader>
            <CardTitle className="text-lg font-rubik">Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 justify-between font-rubik">
              {isSuccess &&
                data &&
                data.data.map((val, indx) => {
                  return (
                    <div
                      key={indx}
                      className="flex gap-4 border-2 px-4 py-2 rounded-xl justify-between"
                    >
                      <div className="h-full max-w-44 rounded-lg overflow-hidden">
                        <Image
                          alt="sepatu"
                          width={200}
                          height={200}
                          src={`${BASE_API_URL}/assets/${val.product.productImages[0].url}`}
                          className="object-contain"
                        />
                      </div>
                      <div className="flex min-w-fit w-[50%] gap-2 text-end flex-col">
                        <div className="flex flex-col gap-2">
                          <Label className="font-bold text-lg">
                            {val.product.name}
                          </Label>
                          <Label>
                            Variant : {val.variant.color} - {val.variant.size}
                          </Label>
                        </div>
                        <Label>Quantity : {val.quantity}</Label>
                        <Label className="text-blue-500 font-bold text-lg">
                          {formatPrice.format(val.product.price)}
                        </Label>
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderPage;

// {addresses.map((address, index) => (
//   <div
//     key={index}
//     className="bg-white rounded-lg shadow-md overflow-hidden mt-1  "
//   >
//     <div className="px-6 py-4">
//       <div className="text-lg mb-2 ">
//         {`Alamat: ${address.street},${address.city}, ${address.province}, ${address.postalCode}`}
//       </div>
//       <div className=" text-sm mb-4 text-gray-600 ">
//         {'Detail Alamat: ' + address.name}
//       </div>
//       <div className="flex items-center gap-4">
//         <button
//           className="text-sm text-red-500 hover:text-red-700 focus:outline-none"
//           onClick={() => handleDeleteAddress(address.id)}
//         >
//           Hapus
//         </button>
//         <button
//           className="text-sm text-red-500 hover:text-red-700 focus:outline-none"
//           onClick={() => {
//             setshowEditAddress(true);
//             setSelectedAddressId(address.id);
//           }}
//         >
//           Edit
//         </button>
//         <div className="text-sm text-gray-700 border p-1 rounded-sm">
//           {address.isPrimary ? 'Utama' : ''}
//         </div>
//       </div>
//     </div>
//   </div>
// ))}
