'use client';
import React, { useEffect, useState } from 'react';
import { FileWithPath } from 'react-dropzone';
import { Input } from './ui/input';
import { useFormik } from 'formik';
import { Button } from './ui/button';
import { Product } from '@/types/product.type';
import { useGetImagesBlob } from '@/hooks/products/useGetImagesBlob';
import { useUpdateProduct } from '@/hooks/products/useUpdateProduct';
import { PreviewImages } from './PreviewImages';
import { InputImages } from './InputImages';

export interface InputUpdateFormsDataProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  values: any;
}

const InputUpdateForms = ({
  data,
  onSubmit,
}: {
  data: Product | undefined;
  onSubmit: (value: any) => void;
}) => {
  const { updateProduct } = useUpdateProduct();
  const { getImagesBlob } = useGetImagesBlob();
  const [fileImages, setFileImages] = useState<FileWithPath[]>([]);
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: '',
      price: '',
      description: '',
      categories: '',
      images: [],
    },
    onSubmit: (values) => {
      // onSubmit(values.images);
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append(
        'productCategory',
        JSON.stringify(['Sneakers', 'High heels']),
      );
      formData.append('description', values.description);
      fileImages.forEach((val: FileWithPath) => {
        formData.append('images', val);
      });
      updateProduct(3, formData).then((res) => alert(res));
    },
  });

  useEffect(() => {
    if (data) {
      setFieldValue('name', data.name);
      setFieldValue('price', data.price);
      setFieldValue('description', data.description);
      setFieldValue(
        'categories',
        data.productCategory.map((val) => val.category.name).join(','),
      );
      getImagesBlob(data.productImages.map((val) => val.url)).then((val) => {
        if (val) {
          setFileImages([
            ...fileImages,
            ...val.map((a, index) => {
              return new File([a.data], 'test' + index, { type: 'jpeg' });
            }),
          ]);
        }
      });
    }
  }, [data]);

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      {fileImages.length}
      <Input
        id={'name'}
        name={'name'}
        type={'text'}
        value={values.name}
        onChange={handleChange}
        placeholder={values.description}
      />
      <PreviewImages
        onRemoveImage={(e) =>
          setFileImages(fileImages.filter((_, indx) => indx != e))
        }
        fileImages={fileImages}
      />
      <InputImages
        label={'Images'}
        onDrop={(e) => {
          setFileImages([...e.map((fileImg) => fileImg), ...fileImages]);
        }}
        isError={false}
      />
      <Input
        id={'price'}
        name={'price'}
        type={'text'}
        value={values.price}
        onChange={handleChange}
        placeholder={'values.price'}
      />
      <Input
        id={'description'}
        name={'description'}
        type={'text'}
        value={values.description}
        onChange={handleChange}
        placeholder={values.description}
      />
      <Input
        id={'categories'}
        name={'categories'}
        type={'text'}
        value={values.categories}
        onChange={handleChange}
        placeholder={'val.placeholder'}
      />
      {/* <>
        <VariantForms
          id={val.id}
          name={val.id}
          values={variant}
          handleChange={(e) => {
            setVariant(e);
            setFieldValue(val.id, e);
          }}
        />
      </>
      ) : (
      <>
        <Label>{val.label}</Label>
        <Input
          id={val.id}
          name={val.id}
          type={val.type}
          value={values[val.id]}
          onChange={handleChange}
          placeholder={val.placeholder}
        />
      </> */}
      <Button onClick={() => handleSubmit()}>Submit bro</Button>
    </div>
  );
};

export default InputUpdateForms;
