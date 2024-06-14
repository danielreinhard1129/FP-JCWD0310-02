'use client';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  addItemAsync,
  decrementQuantityAsync,
  deleteCartItemAsync,
  fetchCartItems,
  incrementQuantityAsync,
  selectTotalPrice,
} from '@/redux/slicers/cartSlice';
import { RootState } from '@/redux/store';
import { Cart } from '@/typess/cart.type';
import { Heart, Minus, Plus, Trash } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';

const DetailCart: React.FC = () => {
  const carts = useAppSelector((state: RootState) => state.cart.cartItems);
  const totalPrice = useAppSelector(selectTotalPrice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleIncrement = (cartItem: Cart) => {
    dispatch(incrementQuantityAsync(cartItem));
  };

  const handleDeleteItem = (itemId: any) => {
    dispatch(deleteCartItemAsync(itemId));
  };

  const handleAddToCart = (product: Cart) => {
    dispatch(addItemAsync(product));
  };

  const handleDecrement = (cartItem: Cart) => {
    if (cartItem.quantity > 1) {
      dispatch(decrementQuantityAsync(cartItem));
    } else {
      console.log('Minimum quantity reached');
    }
  };

  return (
    <div className="w-full bg-[#E7E7E3] h-screen">
      <div className="max-w-[1000px] grid md:grid-cols-3 mx-auto gap-[47px]">
        <div className="bg-white shadow-xl col-span-2 max-w-[700px] p-[24px] rounded-[16px] mt-5">
          {/* title */}
          <div className="my-[8px] mb-[48px]">
            <h1 className="font-semibold text-[32px] text-[#232321]">
              Your Bag
            </h1>
            <p className="font-[16px] text-[#232321] opacity-80">
              Items in your bag not reserved - check out now to make them yours.
            </p>
          </div>
          {/* items */}
          {carts.map((item) => (
            <div key={item.id} className="flex justify-between mb-5">
              <Image src={`/sepatu.jpg`} alt="spt" width={195} height={210} />
              {/* description */}
              <div className="p-2 flex flex-col mr-14">
                <h1 className="font-semibold text-[20px] text-[#232321] mb-[8px]">
                  {item.product.title}
                </h1>
                <p className="text-[16px] font-semibold text-[#232321] opacity-80">
                  {item.product.description}
                </p>
                <p className="text-[16px] font-semibold text-[#232321] opacity-80">
                  {item.product.description}
                </p>
                <div className="flex justify-between mt-[16px] mb-[48px]">
                  <p className="text-[16px] font-semibold text-[#232321] opacity-80">
                    Size {item.product.id}
                  </p>
                  <div className="flex gap-3">
                    <div
                      onClick={() => handleIncrement(item)}
                      className="hover:cursor-pointer"
                    >
                      <Plus color="black" />
                    </div>
                    <p className="text-[16px] font-semibold text-[#232321] opacity-80">
                      Quantity {item.quantity}
                    </p>
                    <div
                      onClick={() => handleDecrement(item)}
                      className="hover:cursor-pointer"
                    >
                      <Minus color="black" />
                    </div>
                  </div>
                </div>
                <div className="flex gap-6">
                  <Heart color="black" />
                  <Trash color="black" />
                </div>
              </div>
              <h3 className="font-semibold text-[20px] text-[#4A69E2]">
                ${item.product.price}
              </h3>
            </div>
          ))}
        </div>
        {/* second grid */}
        <div className="mt-5 max-w-[400px] text-[#232321] ">
          <h1 className="text-[30px] font-semibold mb-[24px]">Order Summary</h1>
          <div className="flex justify-between mb-[16px]">
            <p className="text-[17px] font-semibold">
              {carts.length} {carts.length > 1 ? 'Items' : 'Item'}
            </p>
            <p className="text-[17px] font-semibold">{totalPrice}</p>
          </div>
          <div className="flex justify-between mb-[16px]">
            <p className="text-[17px] font-semibold">Delivery</p>
            <p className="text-[17px] font-semibold">${totalPrice}</p>
          </div>
          <div className="flex justify-between mb-[16px]">
            <p className="text-[17px] font-semibold">Sales tax</p>
            <p className="text-[17px] font-semibold">${totalPrice}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[20px] font-semibold">Total</p>
            <p className="text-[20px] font-semibold">${totalPrice}</p>
          </div>
          <button className="w-full my-[24px] rounded-[8px] bg-[#232321] text-white text-[14px] font-medium px-[16px] py-[8px]">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailCart;
