import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { BASE_API_URL } from '@/utils/config';
import { Ellipsis } from 'lucide-react';
import Image from 'next/image';
import React, { FC } from 'react';

interface ITopOverviewCardProps {
  title: string;
  buttonLabel: string;
  data:
    | {
        productName: string;
        productPrice: number;
        productSales: number;
        productRevenue: number | null;
        productImageUrl: string;
      }[]
    | undefined;
}

const TopOverviewCard: FC<ITopOverviewCardProps> = ({ data, title }) => {
  const formatPrice = new Intl.NumberFormat('id-ID', {
    currency: 'IDR',
    style: 'currency',
  });
  return (
    <div className="px-4 py-6 bg-white border-black border col-span-1 rounded-lg flex flex-col gap-4">
      <div className="flex justify-between items-center min-h-8">
        <Label className="font-bold text-lg">{title}</Label>
      </div>
      <Separator className="bg-black" />
      <div className="flex flex-col gap-4 justify-between">
        <div className="flex flex-col gap-2">
          {data?.map((val, indx) => {
            return (
              <div
                key={indx}
                className="flex w-full justify-between items-center hover:bg-[#D2D1D3] hover:bg-opacity-30 py-2 px-2 rounded-lg transition-all duration-300"
              >
                <div className="flex gap-2 items-center">
                  <Label className="text-lg min-w-4">{indx + 1}.</Label>
                  <div className="w-16 h-16 relative bg-slate-500 text-xs rounded-lg overflow-hidden flex justify-center items-center">
                    <Image
                      alt="product-img"
                      src={`${BASE_API_URL}/assets/${val.productImageUrl}`}
                      className="absolute flex justify-center items-center"
                      fill
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="font-bold">{val.productName}</Label>
                    <Label>{formatPrice.format(val.productPrice)}</Label>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Label className="font-bold">
                    {formatPrice.format(val.productRevenue || 0)}
                  </Label>
                  <Label>{val.productSales} Sales</Label>
                </div>
              </div>
            );
          })}
        </div>
        {/* <Button className="h-8 w-24 font-bold">{buttonLabel}</Button> */}
      </div>
    </div>
  );
};

export default TopOverviewCard;
