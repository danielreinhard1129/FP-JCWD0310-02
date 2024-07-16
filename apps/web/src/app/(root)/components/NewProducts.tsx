'use client';
import ProductCard from '@/components/ProductCard';
import { useGetProducts } from '@/hooks/products/useGetProducts';

export default function NewProducts() {
  const { data, isLoading } = useGetProducts({
    page: 1,
    take: 4,
  });
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
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
              skeleton={isLoading}
            />
          </div>
        );
      })}
    </div>
  );
}
