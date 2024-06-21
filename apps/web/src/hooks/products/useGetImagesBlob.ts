'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
export const useGetImagesBlob = () => {
  const getImagesBlob = async (urls: string[]) => {
    try {
      const response = await axios.all(
        urls.map(async (val) => {
          return await axios.get('http://localhost:8000/api/assets/' + val, {
            responseType: 'blob',
          });
        }),
      );
      return response;
    } catch (error) {}
  };

  return { getImagesBlob };
};
