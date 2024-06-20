import DetailCart from '@/components/carts/DetailCart';
import axios from 'axios';
import React from 'react';

export default async function CartPage() {
  // const { data } = await axios.get('http://localhost:8000/api/carts/5');
  // console.log('DATA CART API', data);

  return (
    <div>
      <DetailCart />
    </div>
  );
}
