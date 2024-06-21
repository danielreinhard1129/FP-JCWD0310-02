'use client';
// PrdctList.tsx
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addItemAsync } from '@/redux/slicers/cartSlice';
import { RootState } from '@/redux/store';
// import { Product } from '@/typess/cart.type';
import Image from 'next/image';
import { Button } from '../ui/button';

const ProductList = ({ data }: { data: any[] }) => {
  const carts = useAppSelector((root: RootState) => root.cart.cartItems);
  const dispatch = useAppDispatch();

  const handleClickBuy = (product: any) => {
    dispatch(
      addItemAsync({
        userId: 5,
        productId: product.id,
        quantity: 1,
        variantId: 1,
      }),
    );
    console.log('Item added to cart');
  };

  console.log('CARTS:', carts);

  return (
    <div className=" w-[90%] max-w-[1100px] mx-auto">
      <div className="grid grid-cols-4 justify-center place-items-center gap-10">
        {data.map((item: any) => {
          return (
            <div className="border border-white shadow-xl p-4" key={item.id}>
              <Image src={`/hd.jpeg`} alt="ok" width={200} height={200} />
              <h1>{item.name}</h1>
              <h1>{item.price}</h1>
              <h1>{item.description}</h1>
              <div className="flex gap-2">
                <Button className="w-full" onClick={() => handleClickBuy(item)}>
                  Inc
                </Button>
                <Button className="w-full">Dec</Button>
                <Button className="w-full">Add</Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
