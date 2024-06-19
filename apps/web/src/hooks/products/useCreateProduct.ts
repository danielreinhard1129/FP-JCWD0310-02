'use client';

import { useState } from 'react';
import useAxios from '../useAxios';
import { FileWithPath } from 'react-dropzone';

interface CreateProductPayload {
  image: File[];
  product: {
    name: string;
    description: string;
    price: string;
  };
  warehouse: number;
  category: string[];
  variant: {
    color: string;
    size: string;
    stock: {
      quantity: number;
    };
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
          return val.forEach((file: FileWithPath) => {
            formData.append('images', file);
          });
        }
        return formData.append(key, JSON.stringify(val));
      });
      const response = await axiosInstance.post('/products', formData);
      setMessages(response.data);
    } catch (error) {
      throw error;
    }
  };
  return { createProduct, messages };
};
