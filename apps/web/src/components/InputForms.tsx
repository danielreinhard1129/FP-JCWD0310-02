'use client';
import React, { FC, useEffect, useState } from 'react';
import { FileWithPath } from 'react-dropzone';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Product, Variant } from '@/types/product.type';
import { Textarea } from './ui/textarea';
import { PreviewImages } from './PreviewImages';
import { InputImages } from './InputImages';
import { useFormik } from 'formik';
import { useGetImagesBlob } from '@/hooks/products/useGetImagesBlob';
import { NumericFormat } from 'react-number-format';
import { CreateProductPayload } from '@/hooks/products/useCreateProduct';
import { Trash, X } from 'lucide-react';

interface VariantFormProps {
  id: string;
  name: string;
  values: Pick<Variant, 'color' | 'size'>[];
  handleChange: (values: Pick<Variant, 'color' | 'size'>[]) => void;
}

interface ProductInputData
  extends Pick<
    Product,
    | 'name'
    | 'description'
    | 'price'
    | 'productImages'
    | 'variant'
    | 'productCategory'
  > {}

interface InputFormsProps {
  data?: ProductInputData;
  handleSubmit: (value: CreateProductPayload) => void;
}

const InputForms: FC<InputFormsProps> = ({ data, handleSubmit }) => {
  const { getImagesBlob } = useGetImagesBlob();
  const [tempCategory, setTempCategory] = useState('');
  const [fileImages, setFileImages] = useState<FileWithPath[]>([]);
  const {
    values,
    setFieldValue,
    handleSubmit: handleSubmitFormik,
    handleChange,
    handleReset,
    setValues,
  } = useFormik({
    initialValues: {
      product: {
        description: '',
        name: '',
        price: '5000',
      },
      category: [],
      image: [],
      variant: [{ color: '', size: '' }],
      warehouse: 0,
    },
    onSubmit: (result: CreateProductPayload) => {
      handleSubmit(result);
    },
  });

  useEffect(() => {
    if (data) {
      getImagesBlob(data.productImages.map((val) => val.url)).then((val) => {
        if (val) {
          setFileImages([
            ...val.map((a, index) => {
              const type = a.data.type as string;
              const file = new File(
                [a.data],
                new Date().toISOString() + '.' + type.split('/')[1],
                {
                  type,
                },
              );
              console.log('file', file);
              return file;
            }),
          ]);
        }
        setFieldValue('image', [...fileImages]);
      });
      setValues({
        product: {
          name: data.name,
          description: data.description,
          price: String(data.price),
        },
        category: data.productCategory.map((val) => val.category.name),
        image: fileImages,
        variant: data.variant.map((val) => {
          return {
            color: val.color,
            size: val.size,
            stock: {
              quantity: 0,
            },
          };
        }),
        warehouse: 0,
      });
    }
  }, [data]);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div id="input-left" className="w-full h-full flex flex-col gap-4">
          <div>
            <Label>Product Name</Label>
            <Input
              id="product.name"
              name="product.name"
              value={values.product.name}
              onChange={handleChange}
              placeholder="Adida Ultra Boost"
            ></Input>
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              className="h-48 justify-start text-left"
              placeholder="Long distance running requires a lot from athletes."
              id="product.description"
              name="product.description"
              value={values.product.description}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label>Category</Label>
            {values.category && values.category.length > 0 ? (
              <div className="flex items-center gap-2">
                {values.category.map((category, index) => (
                  <div
                    key={index}
                    className="rounded-2xl gap-2 flex justify-between hover:bg-slate-900 px-2 items-center bg-black h-8"
                  >
                    <p className="text-white text-sm font-medium">{category}</p>
                    <div
                      className="group"
                      onClick={() =>
                        setFieldValue(
                          'category',
                          values.category.filter((_, indx) => index != indx),
                        )
                      }
                    >
                      <X
                        className="text-red-500 transition-all group-hover:scale-125"
                        size={20}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              ''
            )}
            <div className="flex gap-3">
              <Input
                value={tempCategory}
                onChange={(e) => setTempCategory(e.currentTarget.value)}
              />
              <Button
                onClick={() => {
                  if (
                    !values.category.includes(tempCategory) &&
                    tempCategory.length > 3
                  ) {
                    setFieldValue('category', [
                      ...values.category,
                      tempCategory,
                    ]);
                    setTempCategory('');
                  }
                  setTempCategory('');
                }}
              >
                Add Category
              </Button>
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              <Label>SKU</Label>
              <Input
                placeholder="#4512"
                id="product.name"
                name="product.name"
                value={values.product.name}
                onChange={handleChange}
              ></Input>
            </div>
            <div>
              <Label>Price</Label>
              <NumericFormat
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Rp.50.000"
                id="product.price"
                name="product.price"
                allowLeadingZeros
                thousandSeparator=","
                value={values.product.price}
                onValueChange={(values) =>
                  setFieldValue('product.price', values.value)
                }
                min={50000}
                prefix="Rp."
                suffix=",00"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {values.variant.length > 0 && values.variant ? (
              <div className="flex flex-col gap-4">
                <Label>Variants</Label>
                {values.variant.map((val, index) => {
                  return (
                    <div
                      className="flex justify-between items-center gap-2"
                      key={index}
                    >
                      <Input
                        name={`variant[${index}].color`}
                        id={`variant[${index}].color`}
                        placeholder="Color"
                        value={values.variant[index].color}
                        onChange={handleChange}
                      />
                      <Input
                        name={`variant[${index}].size`}
                        placeholder="Size"
                        id={`variant[${index}].size`}
                        value={values.variant[index].size}
                        onChange={handleChange}
                      />
                      <div
                        className="p-2 border border-input hover:bg-slate-200 transition-all duration-200 rounded-lg"
                        onClick={() =>
                          setFieldValue(
                            `variant`,
                            values.variant.filter((_, idx) => idx != index),
                          )
                        }
                      >
                        <Trash className="text-red-500" size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              ''
            )}
            <Button
              onClick={() =>
                setFieldValue('variant', [
                  ...values.variant,
                  { color: '', size: '' },
                ])
              }
            >
              Add Variant
            </Button>
          </div>
        </div>
        <div id="input-right" className="w-full max-w-[500px] h-full">
          <PreviewImages
            onRemoveImage={(e) =>
              setFileImages(fileImages.filter((_, indx) => indx != e))
            }
            fileImages={fileImages}
          />
          <InputImages
            label="Product Images"
            onDrop={(e) => {
              setFileImages([...fileImages, ...e]);
              setFieldValue('image', [...fileImages, ...e]);
            }}
            isError={false}
          />
        </div>
      </div>
      <div className="flex md:justify-end mt-8 justify-between gap-4">
        <Button onClick={() => handleSubmitFormik()} className="w-32">
          Update
        </Button>
        <Button className="w-32" variant="destructive">
          Delete
        </Button>
        <Button className="w-32" variant="outline">
          Cancel
        </Button>
      </div>
    </section>
  );
};

export default InputForms;
