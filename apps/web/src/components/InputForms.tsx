'use client';
import React, { FC, useMemo, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useFormik } from 'formik';
import { Button } from './ui/button';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { Variant } from '@/types/product.type';
import { useCreateProduct } from '@/hooks/products/useCreateProduct';

interface DropzoneProps {
  label: string;
  isError: boolean;
  onDrop: (files: FileWithPath[]) => void;
  Ref?: any;
}

interface PreviewImagesProps {
  fileImages?: File[];
  images?: string[];
  onRemoveImage: (index: number) => void;
}

interface VariantFormProps {
  id: string;
  name: string;
  values: Pick<Variant, 'color' | 'size'>[];
  handleChange: (values: Pick<Variant, 'color' | 'size'>[]) => void;
}

type CustomHTMLInputTypeAttribute =
  | 'date'
  | 'password'
  | 'image'
  | 'number'
  | 'text'
  | 'time'
  | 'variant'
  | (string & {});
export interface InputFormsDataProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type: CustomHTMLInputTypeAttribute;
}

const InputForms = ({
  PropArr,
  onSubmit,
}: {
  PropArr: InputFormsDataProps[];
  onSubmit: (value: any) => void;
}) => {
  const [images, setImages] = useState<FileWithPath[]>([]);
  const [variant, setVariant] = useState<Pick<Variant, 'color' | 'size'>[]>([]);
  const formData = new FormData();
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: PropArr.reduce((prev: any, curr) => {
      return {
        ...prev,
        [curr.id]:
          curr.type == 'date' ? new Date() : curr.type == 'image' ? [] : '',
      };
    }, {}),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <>
      {PropArr.map((val) => {
        return (
          <div>
            {val.type == 'image' ? (
              <>
                <PreviewImages
                  onRemoveImage={(e) =>
                    setImages(images.filter((img, indx) => indx != e))
                  }
                  fileImages={images}
                />
                <InputImages
                  label={val.label}
                  onDrop={(e) => {
                    setImages([...e.map((fileImg) => fileImg), ...images]);
                    setFieldValue(val.id, [
                      ...e.map((fileImg) => fileImg),
                      ...images,
                    ]);
                  }}
                  isError={false}
                />
              </>
            ) : val.type == 'variant' ? (
              <>
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
              </>
            )}
          </div>
        );
      })}
      <Button onClick={() => handleSubmit()}>Submit</Button>
    </>
  );
};

export const VariantForms: FC<VariantFormProps> = ({
  handleChange,
  id,
  name,
  values,
}) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <Button
          onClick={() => handleChange([...values, { color: '', size: '' }])}
        >
          Add Variant
        </Button>
        {values.map((val, indx) => {
          return (
            <div className="flex w-full gap-4">
              <div className="flex items-center gap-4">
                <p>Color</p>
                <Input
                  value={val.color}
                  onChange={(e) =>
                    handleChange(
                      values.map((val, index) => {
                        if (index == indx) {
                          return {
                            color: e.currentTarget.value,
                            size: val.size,
                          };
                        } else return val;
                      }),
                    )
                  }
                />
              </div>
              <div className="flex items-center gap-4">
                <p>Size</p>
                <Input
                  value={val.size}
                  onChange={(e) =>
                    handleChange(
                      values.map((val, index) => {
                        if (index == indx) {
                          return {
                            size: e.currentTarget.value,
                            color: val.color,
                          };
                        } else return val;
                      }),
                    )
                  }
                />
              </div>
              <Button
                onClick={() =>
                  handleChange(values.filter((val, index) => index != indx))
                }
              >
                Delete
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export const InputImages: FC<DropzoneProps> = ({
  isError,
  label,
  onDrop,
  Ref,
}) => {
  const { getRootProps, getInputProps, inputRef } = useDropzone({
    accept: {
      'image/*': [],
    },
    maxFiles: 5,
    onDrop: (acceptedFiles) => {
      onDrop(acceptedFiles);
    },
  });
  return (
    <div className="space-y-1.5">
      <Label className={isError ? 'text-red-500' : ''}>{label}</Label>
      <div
        {...getRootProps({
          className: 'p-10 border flex justify-center rounded-md',
        })}
        ref={Ref}
      >
        <input {...getInputProps()} />
        <Label className="text-base">
          Drag & drop some files here, or click to select files
        </Label>
      </div>
      {isError && (
        <div className="text-xs text-red-500">{label} is Required</div>
      )}
    </div>
  );
};

const PreviewImages: FC<PreviewImagesProps> = ({
  onRemoveImage,
  fileImages,
  images,
}) => {
  const imageResults = useMemo(() => {
    if (fileImages) {
      return fileImages.map((image) => URL.createObjectURL(image));
    }

    return images;
  }, [fileImages, images]);

  return (
    <div className="flex flex-col mx-auto">
      {imageResults?.map((image, index) => {
        return (
          <div
            key={index}
            className="relative md:h-[320px] h-[200px] w-full rounded-md border"
          >
            <Image
              src={
                images ? `http://localhost:3000/public/images${images}` : image
              }
              alt="thumbnail"
              objectFit="contain"
              fill
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute -right-5 -top-5"
              onClick={() => onRemoveImage(index)}
            >
              <Trash2 className="h-6 w-6" />
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default InputForms;
