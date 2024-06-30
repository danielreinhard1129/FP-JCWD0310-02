'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import React from 'react';
import sepatu from '../../../../public/sepatu.jpg';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { usePostOrder } from '@/hooks/orders/usePostOrder';
import { useNotification } from '@/hooks/useNotification';
import { useGetCarts } from '@/hooks/carts/useGetCarts';
import { useAppSelector } from '@/redux/hooks';
import { NEXT_PUBLIC_BASE_API_URL } from '@/utils/config';
import OrderDialogConfirmation from './components/OrderDialogConfirmation';
import { Address } from '@/types/address.types';
import { useRouter } from 'next/navigation';

const OrderPage = () => {
  const router = useRouter();
  const { id } = useAppSelector((state) => state.user);
  const { data, isSuccess } = useGetCarts(id);
  const { postOrder, postOrderAsync } = usePostOrder();
  const { openNotification } = useNotification();
  const formatPrice = new Intl.NumberFormat('id-ID', {
    currency: 'IDR',
    style: 'currency',
  });

  const dummyAddress: Address = {
    id: 1,
    name: 'rumah',
    lat: 4.5,
    long: 4.5,
    postalCode: 55752,
    street: 'Jln.Kaliurang',
    city: 'Sleman',
    subdistrict: 'Melati',
    province: 'Jogjakarta',
  };

  const handlePost = () => {
    if (data) {
      openNotification.async(postOrderAsync(), () => {
        setTimeout(() => {
          router.push('/transactions');
        }, 5000);
      });
    } else openNotification.error({ message: 'Something is error!' });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row-reverse justify-end w-full gap-4">
        <Card className="rounded-2xl bg-white w-[50%]">
          <CardHeader>
            <CardTitle className="font-rubik">Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
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
                {/* <div>
                  <h1 className="font-rubik font-bold text-2xl">
                    Shipping Details
                  </h1>
                  <Label>
                    We will use these details to keep you inform about your
                    delivery
                  </Label>
                </div> */}
                <div className="flex flex-col max-w-96 gap-2">
                  <h1 className="font-rubik font-bold text-xl">
                    Select your address
                  </h1>
                  <select className="bg-transparent h-10 px-2 border overflow-hidden border-black rounded-lg">
                    <option value="1">Pakualaman</option>
                    <option value="1">Kaliurang</option>
                  </select>
                </div>
                <div className="flex flex-col max-w-96 gap-2">
                  <h1 className="font-rubik font-bold text-xl">
                    Select your payment
                  </h1>
                  <select className="bg-transparent h-10 px-2 border overflow-hidden border-black rounded-lg">
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
                  <select className="bg-transparent h-10 px-2 border overflow-hidden border-black rounded-lg">
                    <option value="1">Manual</option>
                    <option disabled value="1">
                      Midtrans
                    </option>
                  </select>
                </div>
              </div>
              <OrderDialogConfirmation
                data={data?.data}
                addressDetail={{
                  address: dummyAddress,
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
                          src={`${NEXT_PUBLIC_BASE_API_URL}/assets/${val.product.productImages[0].url}`}
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
