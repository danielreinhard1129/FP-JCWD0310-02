'use client';

import { useState } from 'react';
import useAxios from '../useAxios';
import { FileWithPath } from 'react-dropzone';

export interface CreateProductPayload {
  image: File[];
  product: {
    name: string;
    description: string;
    price: string;
  };
  warehouse: number | undefined;
  category: string[];
  variant: {
    color: string;
    size: string;
  }[];
}
export const useCreateProduct = () => {
  const { axiosInstance } = useAxios();
  const [messages, setMessages] = useState();

  const createProduct = async (payload: CreateProductPayload) => {
    try {
      const formData = new FormData();
      Object.entries(payload).map(([key, val]) => {
        if (key == 'image') {
          return val.forEach((file: FileWithPath, index: number) => {
            const split = file.name.split('.');
            formData.append(
              'images',
              file,
              new Date().valueOf() +
                'a'.repeat(index) +
                '.' +
                split[split.length - 1],
            );
          });
        }
        return formData.append(key, JSON.stringify(val));
      });
      const response = await axiosInstance.post('/products', formData);
      setMessages(response.data);
      return response;
    } catch (error) {
      throw error;
    }
  };
  return { createProduct, messages };
};
