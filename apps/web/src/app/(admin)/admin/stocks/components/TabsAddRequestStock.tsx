import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DataTablesStock } from '@/types/stock.type';
import { InputNumber } from 'antd';
import { useFormik } from 'formik';
import React, { FC } from 'react';
import { AddStocksValidations } from './validations/StockManagementValidations';
import { usePostAddStocks } from '@/hooks/stocks/usePostAddStocks';
import { useNotification } from '@/hooks/useNotification';
import { useDebouncedCallback } from 'use-debounce';

interface ITabsAddRequestStockProps {
  data: DataTablesStock;
  refetch: () => void;
}

const TabsAddRequestStock: FC<ITabsAddRequestStockProps> = ({
  data,
  refetch,
}) => {
  const { postAddStocks } = usePostAddStocks();
  const { openNotification } = useNotification();
  const debounce = useDebouncedCallback((func) => func(), 500);
  const { errors, values, handleSubmit, touched, setFieldValue } = useFormik({
    initialValues: {
      toWarehouse: data.warehouseId,
      quantity: 0,
      variant: 0,
    },
    onSubmit: (values) => {
      openNotification.async(
        postAddStocks(values.quantity, values.variant, values.toWarehouse),
        () => refetch(),
      );
    },
    validationSchema: AddStocksValidations,
  });
  return (
    <div>
      <div className="py-4 flex flex-col gap-2">
        <div className="flex flex-col gap-2 mb-4">
          <Label>Product : {data.name}</Label>
          <Label>Warehouse to : Your warehouse ( {data.warehouse} )</Label>
        </div>
        {(touched.variant || errors.variant) && (
          <Label className="flex justify-end text-red-500">
            {errors.variant}
          </Label>
        )}
        <div className="flex gap-4 justify-between items-center">
          <Label>Select Variant :</Label>
          <div className="w-52">
            <Select onValueChange={(e) => setFieldValue('variant', Number(e))}>
              <SelectTrigger>
                <SelectValue placeholder="Select a variant" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Variant</SelectLabel>
                  {data.variant.map((val, indx) => {
                    return (
                      <SelectItem key={indx} value={val.id.toString()}>
                        {val.color} - {val.size}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        {(touched.quantity || errors.quantity) && (
          <Label className="flex justify-end text-red-500">
            {errors.quantity}
          </Label>
        )}
        <div className="flex gap-4 justify-between items-center">
          <Label>Quantity :</Label>
          <InputNumber
            min={1}
            defaultValue={values.quantity}
            onChange={(e) => setFieldValue('quantity', e)}
            className="w-52"
          />
        </div>
        <Label>
          Quantity expected : {Number(values.quantity) + data.stock}
        </Label>
      </div>
      <div className="mt-4 flex justify-end">
        <Button type="submit" onClick={() => debounce(handleSubmit)}>
          Request
        </Button>
      </div>
    </div>
  );
};

export default TabsAddRequestStock;
