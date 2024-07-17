'use client';
import ProductCard from '@/components/ProductCard';
import { useGetProducts } from '@/hooks/products/useGetProducts';
import { BASE_API_URL } from '@/utils/config';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductsPage() {
  const { data } = useGetProducts({
    page: 1,
    take: 4,
  });
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 justify-between">
      {data?.data.map((val, index) => {
        return (
          <div key={index}>
            <ProductCard
              productId={val.id}
              title={val.name}
              price={val.price}
              images={val.productImages[0]?.url}
              created={val.createdAt}
              category="baju"
              skeleton={false}
            />
          </div>
        );
      })}
    </div>
  );
}
