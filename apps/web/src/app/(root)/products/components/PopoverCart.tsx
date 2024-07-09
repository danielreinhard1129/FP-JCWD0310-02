'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { usePostCart } from '@/hooks/carts/usePostCart';
import { useNotification } from '@/hooks/useNotification';
import { useAppSelector } from '@/redux/hooks';
import { Product } from '@/types/product.type';
import { InputNumber } from 'antd';
import { useFormik } from 'formik';
import React, { FC, useState } from 'react';
import { popOverCartsValidations } from './validations/PopoverCartsValidations';

interface IPopoverCartProps {
  product: Product;
}

const PopoverCart: FC<IPopoverCartProps> = ({ product }) => {
  const user = useAppSelector((state) => state.user);
  const { mutate } = usePostCart();
  const { openNotification } = useNotification();
  const { values, setFieldValue, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      quantity: 1,
      variantId: 0,
    },
    validationSchema: popOverCartsValidations,
    onSubmit: (values) => {
      openNotification.async(
        mutate.mutateAsync({
          productId: product.id,
          quantity: values.quantity,
          userId: user.id,
          variantId: values.variantId,
        }),
      );
    },
  });
  const formatPrice = new Intl.NumberFormat('id-ID', {
    currency: 'IDR',
    style: 'currency',
  });
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="w-full font-rubik font-medium">Add to cart</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <Label className="font-rubik">
            *Input your quantity before add to cart
          </Label>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 mb-2">
            <Label className="text-xl font-rubik font-semibold">
              {product?.name}
            </Label>
            <Label className="font-rubik text-blue-500 font-semibold">
              {formatPrice.format(product?.price || 0)}
            </Label>
          </div>
          <div className="flex items-center">
            <Label className="w-20 text-md font-rubik font-semibold">
              Variants :
            </Label>
            <div className="w-64">
              <Select
                value={values.variantId.toString()}
                onValueChange={(e) => setFieldValue('variantId', e)}
              >
                <SelectTrigger>
                  <SelectValue>
                    <Label className="font-rubik font-semibold">
                      {product.variant.map((a) => {
                        if (a.id == values.variantId) {
                          return `${a.color} - ${a.size}`;
                        } else return undefined;
                      })}
                    </Label>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>
                      <Label className="font-rubik font-semibold">
                        Select product variant
                      </Label>
                    </SelectLabel>
                    {product?.variant.map((val, indx) => {
                      return (
                        <SelectItem
                          key={indx}
                          className="font-rubik font-medium"
                          value={val.id.toString()}
                        >
                          {val.color} - {val.size}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center">
            <Label className="w-20 text-md font-rubik font-semibold">
              Quantity :{' '}
            </Label>
            <InputNumber
              value={values.quantity}
              min={1}
              className="w-64 text-base font-rubik font-bold"
              onChange={(e) => setFieldValue('quantity', e)}
              placeholder="Quantity"
            />
          </div>
          <div className="flex flex-col gap-2">
            {!!touched.quantity && errors.quantity && (
              <Label className="font-rubik text-red-500">
                {errors.quantity}
              </Label>
            )}
            {!!touched.variantId && errors.variantId && (
              <Label className="font-rubik text-red-500">
                {errors.variantId}
              </Label>
            )}
          </div>
          <div className="border-l-2 px-2 py-2 flex flex-col gap-2">
            <Label className="text-lg font-rubik font-semibold">
              Detail Cart
            </Label>
            <Label className="font-rubik font-medium">
              Quantity : {values.quantity}
            </Label>
            <Label className='font-rubik font-medium"'>
              Total prices :{' '}
              {formatPrice.format(values.quantity * product.price)}
            </Label>
          </div>
          {mutate.isSuccess ? (
            <Button
              className="font-rubik font-semibold"
              type="submit"
              onClick={() => handleSubmit()}
            >
              Success add to cart
            </Button>
          ) : (
            <Button
              className="font-rubik font-semibold"
              type="submit"
              onClick={() => handleSubmit()}
            >
              Add to bags
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PopoverCart;
