'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import useAxios from '../useAxios';
export const useGetImagesBlob = () => {
  const { axiosInstance } = useAxios();
  const getImagesBlob = async (urls: string[]) => {
    try {
      const response = await axios.all(
        urls.map(async (val) => {
          return await axiosInstance.get('/assets/' + val, {
            responseType: 'blob',
          });
        }),
      );
      return response;
    } catch (error) {}
  };

  return { getImagesBlob };
};
