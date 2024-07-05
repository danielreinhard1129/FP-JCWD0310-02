import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Ellipsis } from 'lucide-react';
import React, { FC } from 'react';

interface ITopOverviewCardProps {
  title: string;
  buttonLabel: string;
  data:
    | {
        id: number;
        name: string;
        count: number;
        total: number | null;
      }[]
    | undefined;
}

const TopOverviewCardCategory: FC<ITopOverviewCardProps> = ({
  buttonLabel,
  data,
  title,
}) => {
  const formatPrice = new Intl.NumberFormat('id-ID', {
    currency: 'IDR',
    style: 'currency',
  });
  return (
    <div className="px-4 py-6 bg-white col-span-1 rounded-lg flex flex-col gap-4">
      <div className="flex justify-between items-center min-h-8">
        <Label className="font-bold text-lg">{title}</Label>
        <Ellipsis className="rotate-90 w-6" />
      </div>
      <Separator className="bg-black" />
      <div className="flex flex-col gap-4 h-full justify-between">
        <div className="flex flex-col gap-2">
          {data?.map((val, indx) => {
            return (
              <div
                key={val.id}
                className="flex h-16 w-full justify-between items-center gap-4 hover:bg-[#D2D1D3] hover:bg-opacity-30 py-2 px-2 rounded-lg transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <Label className="text-lg min-w-4">{indx + 1}.</Label>
                  <div className="flex gap-4 border p-4 rounded-lg min-w-28 justify-center items-center">
                    <Label className="font-bold">{val.name}</Label>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Label className="font-bold">
                    {formatPrice.format(val.total || 0)}
                  </Label>
                  <Label>{val.count} Sales</Label>
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

export default TopOverviewCardCategory;
