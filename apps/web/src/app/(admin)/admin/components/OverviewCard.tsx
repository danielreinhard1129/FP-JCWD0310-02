import { Label } from '@/components/ui/label';
import { ArrowUp, Ellipsis, LucideProps } from 'lucide-react';
import React, { FC, useEffect } from 'react';

interface IOverviewCardProps {
  title: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  type: 'currency' | 'number';
  value: number | undefined;
  total: number | undefined;
}

const OverviewCard: FC<IOverviewCardProps> = ({
  Icon,
  title,
  type,
  value,
  total,
}) => {
  const formatPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
  return (
    <div className="flex flex-col gap-4 rounded-lg border-black border bg-white p-4">
      <div className="flex justify-between items-center">
        <Label className="font-bold text-lg">{title}</Label>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div className="p-2 w-10 h-10 flex justify-center items-center bg-[#4A69E2] rounded-lg">
            <Icon className="text-white" />
          </div>
          <Label className="font-semibold text-base">
            {type == 'currency' && formatPrice.format(value || 0)}
            {(type == 'number' && value) || 0}
          </Label>
        </div>
        <Label className="text-end items-center font-bold text-lg">
          {total ? total : undefined}
        </Label>
      </div>
    </div>
  );
};

export default OverviewCard;
