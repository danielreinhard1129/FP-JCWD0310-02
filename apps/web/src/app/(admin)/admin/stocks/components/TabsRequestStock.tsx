'use client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Select,
} from '@/components/ui/select';
import { DataTablesStock } from '@/types/stock.type';
import { Warehouse } from '@/types/warehouse.type';
import { InputNumber } from 'antd';
import { useFormik } from 'formik';
import React, { FC, useEffect } from 'react';
import { RequestStocksValidations } from './validations/StockManagementValidations';
import { useGetWarehouses } from '@/hooks/warehouses/useGetWarehouses';
import { useAppSelector } from '@/redux/hooks';
import { usePostRequestStocks } from '@/hooks/stocks/usePostRequestStocks';
import { useNotification } from '@/hooks/useNotification';
import { useDebouncedCallback } from 'use-debounce';

interface ITabsRequestStockProps {
  data: DataTablesStock;
  refetch: () => void;
}

const TabsRequestStock: FC<ITabsRequestStockProps> = ({ data, refetch }) => {
  const { getWarehouses } = useGetWarehouses(data.warehouseId);
  const debounce = useDebouncedCallback((func) => func(), 500);
  const user = useAppSelector((state) => state.user);
  const { postRequestStocks } = usePostRequestStocks();
  const { openNotification } = useNotification();
  const { errors, handleChange, handleSubmit, values, touched, setFieldValue } =
    useFormik({
      initialValues: {
        toWarehouse: data.warehouseId,
        warehouseFrom: 0,
        quantity: 0,
        variant: 0,
      },
      validationSchema: RequestStocksValidations,
      onSubmit: (values) => {
        openNotification.async(
          postRequestStocks(
            values.toWarehouse,
            values.warehouseFrom,
            values.quantity,
            values.variant,
          ),
          () => refetch(),
        );
      },
    });

  return (
    <div>
      <div className="py-4 flex flex-col gap-2">
        <div className="flex flex-col gap-2 mb-4">
          <Label>Product : {data.name}</Label>
          <Label>Warehouse to : Your warehouse ( {data.warehouse} )</Label>
        </div>
        {errors.toWarehouse && <Label>{errors.toWarehouse}</Label>}
        {(touched.warehouseFrom || errors.warehouseFrom) && (
          <Label className="flex justify-end text-red-500">
            {errors.warehouseFrom}
          </Label>
        )}
        <div className="flex gap-4 justify-between items-center">
          <Label>Select Warehouses from : </Label>
          <div className="w-52">
            <Select
              onValueChange={(e) => setFieldValue('warehouseFrom', Number(e))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select warehouse from" />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectGroup>
                  <SelectLabel>Warehouse</SelectLabel>
                  {getWarehouses.isSuccess &&
                    getWarehouses.data.data.data.map((val, indx) => {
                      return (
                        <SelectItem key={indx} value={val.id.toString()}>
                          {val.name}
                        </SelectItem>
                      );
                    })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        {(touched.warehouseFrom || errors.variant) && (
          <Label className="flex justify-end text-red-500">
            {errors.variant}
          </Label>
        )}
        <div className="flex gap-4 justify-between items-center">
          <Label>Select Variant :</Label>
          <div className="w-52">
            <Select
              onValueChange={(e: any) => setFieldValue('variant', Number(e))}
            >
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
        <div>
          <Label>Detail stock on Warehouse from : {}</Label>
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

export default TabsRequestStock;
