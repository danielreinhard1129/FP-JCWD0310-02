// import DetailCart from '@/components/carts/DetailCart';
import axios from 'axios';
import React from 'react';
import { NEXT_PUBLIC_BASE_API_URL } from '../../../utils/config';

export default function CartPage() {
  const handleData = async () => {
    try {
      const { data } = await axios.get(NEXT_PUBLIC_BASE_API_URL + '/carts/5');
    } catch (error) {}
  };
  // console.log('DATA CART API', data);
  return <div>{/* <DetailCart /> */}</div>;
}
