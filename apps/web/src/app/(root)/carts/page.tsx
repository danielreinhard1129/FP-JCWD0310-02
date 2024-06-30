'use client';

import { Label } from '@/components/ui/label';
import Image from 'next/image';
import productImages from '../../../../public/sepatu.jpg';
import { Heart, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGetCarts } from '@/hooks/carts/useGetCarts';
import { useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { Separator } from '@/components/ui/separator';
import { BASE_API_URL } from '@/utils/config';
export default function CartPage() {
  const user = useAppSelector((state) => state.user);
  const { mutate } = useGetCarts();
  useEffect(() => {
    mutate.mutate(user.id);
  }, []);

  const formatPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });

  return (
    <div className="flex md:flex-row flex-col gap-10">
      <div className="bg-white rounded-lg md:w-[60%] border-transparent max-h-[70vh] overflow-y-scroll no-scrollbar py-6 px-4 border-[10px] flex flex-col gap-4 drop-shadow-sm">
        <Label className="text-2xl font-semibold font-rubik">Your Bag</Label>
        {mutate.data &&
          mutate.data.data.map((val, indx) => {
            return (
              <div key={indx} className="flex gap-4">
                <div className="w-[30%] h-fit border-4 border-slate-300 overflow-hidden rounded-2xl">
                  <Image
                    src={`${BASE_API_URL}/assets/${val.product.productImages[0].url}`}
                    width={200}
                    height={200}
                    alt="product"
                  />
                </div>
                <div className="flex flex-col w-[70%] justify-between">
                  <div>
                    <div className="flex justify-between items-center">
                      <Label className="text-lg font-semibold font-rubik">
                        {val.product.name}
                      </Label>
                      <Label className="font-semibold font-rubik text-blue-400">
                        {formatPrice.format(val.product.price)}
                      </Label>
                    </div>
                    <div className="flex justify-between mt-2">
                      <Label className="font-medium font-rubik">
                        Size : {val.variant.size}
                      </Label>
                      <Label className="font-medium font-rubik">
                        Color : {val.variant.color}
                      </Label>
                      <Label className="font-medium font-rubik">
                        Quantity : {val.quantity}
                      </Label>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-10 justify-end">
                    <Trash />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col w-full">
          <Label className="mb-4 font-bold font-rubik text-lg">
            Order Summary
          </Label>
          <div className="flex flex-col gap-4">
            {mutate.data &&
              mutate.data.data.map((val, indx) => {
                return (
                  <div
                    key={indx}
                    className="flex gap-4 min-w-fit justify-between font-rubik"
                  >
                    <Label>
                      {val.product.name} x {val.quantity}
                    </Label>
                    <Label>
                      {formatPrice.format(val.quantity * val.product.price)}
                    </Label>
                  </div>
                );
              })}
          </div>
          <div className="flex font-bold justify-between mt-8">
            <p>Total</p>
            <p>
              {mutate.data &&
                formatPrice.format(
                  mutate.data.data.reduce(
                    (a, b) => a + b.product.price * b.quantity,
                    0,
                  ),
                )}
            </p>
          </div>
        </div>
        <Button className="mt-8 font-rubik font-bold">CHECKOUT</Button>
      </div>
    </div>
  );
}
