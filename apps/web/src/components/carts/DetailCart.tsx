// 'use client';
// import { useAppDispatch, useAppSelector } from '@/redux/hooks';
// import {
//   addItemAsync,
//   decrementQuantityAsync,
//   deleteCartItemAsync,
//   fetchCartItems,
//   incrementQuantityAsync,
//   selectTotalPrice,
// } from '@/redux/slicers/cartSlice';
// import { RootState } from '@/redux/store';
// import { Cart } from '@/typess/cart.type';
// import { Heart, Minus, Plus, Trash } from 'lucide-react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';

// const DetailCart: React.FC = () => {
//   const carts = useAppSelector((state: RootState) => state.cart.cartItems);
//   const totalPrice = useAppSelector(selectTotalPrice);
//   const dispatch = useAppDispatch();
//   const router = useRouter();

//   useEffect(() => {
//     dispatch(fetchCartItems());
//   }, [dispatch]);

//   const handleIncrement = (cartItem: Cart) => {
//     dispatch(incrementQuantityAsync(cartItem));
//   };

//   const handleDeleteItem = (itemId: number) => {
//     dispatch(deleteCartItemAsync(itemId));
//   };

//   const handleAddToCart = (product: Cart) => {
//     dispatch(addItemAsync(product));
//   };

//   const handleDecrement = (cartItem: Cart) => {
//     if (cartItem.quantity > 1) {
//       dispatch(decrementQuantityAsync(cartItem));
//     } else {
//       console.log('Minimum quantity reached');
//     }
//   };

//   useEffect(() => {
//     const snapScript = 'https://app.sandbox.midtrans.com/snap/snap.js';
//     const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY; // Use NEXT_PUBLIC prefix for environment variables used in the client-side
//     const script = document.createElement('script');
//     script.src = snapScript;
//     script.setAttribute('data-client-key', String(clientKey));
//     script.async = true;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   const pay = async () => {
//     const data = {
//       products: carts.map(({ product, quantity }) => ({
//         id: product.id,
//         productName: product.name,
//         price: product.price,
//         quantity,
//       })),
//       userId: 5, // Assuming a fixed user ID for simplicity
//     };

//     const response = await fetch('http://localhost:8000/api/trx', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });

//     const res = await response.json();
//     console.log('Response:', res);

//     window.snap.pay(res.snap_token, {
//       onSuccess: function (result: any) {
//         alert('Transaction successful!');
//         router.push(`/order-status?transaction_id=${res.transaction_id}`);
//       },
//       onPending: function (result: any) {
//         alert('Transaction pending.');
//         router.push(`/order-status?transaction_id=${res.transaction_id}`);
//       },
//       onError: function (result: any) {
//         alert('Transaction failed.');
//         router.push(`/order-status?transaction_id=${res.transaction_id}`);
//       },
//       onClose: function () {
//         alert('Transaction closed.');
//       },
//     });
//   };

//   return (
//     <div className="w-full bg-[#E7E7E3] h-screen">
//       <div className="max-w-[1000px] grid md:grid-cols-3 mx-auto gap-[47px]">
//         <div className="bg-white shadow-xl col-span-2 max-w-[700px] p-[24px] rounded-[16px] mt-5">
//           {/* title */}
//           <div className="my-[8px] mb-[48px]">
//             <h1 className="font-semibold text-[32px] text-[#232321]">
//               Your Bag
//             </h1>
//             <p className="font-[16px] text-[#232321] opacity-80">
//               Items in your bag not reserved - check out now to make them yours.
//             </p>
//           </div>
//           {/* items */}
//           {carts.map((item: Cart) => (
//             <div key={item.id} className="flex justify-between mb-5">
//               <Image src={`/sepatu.jpg`} alt="spt" width={195} height={210} />
//               {/* description */}
//               <div className="p-2 flex flex-col mr-14">
//                 <h1 className="font-semibold text-[20px] text-[#232321] mb-[8px]">
//                   {item.product?.name || 'Product Name'}
//                 </h1>
//                 <p className="text-[16px] font-semibold text-[#232321] opacity-80">
//                   {item.product?.description || 'Product Description'}
//                 </p>
//                 <div className="flex justify-between mt-[16px] mb-[48px]">
//                   <p className="text-[16px] font-semibold text-[#232321] opacity-80">
//                     Size {item.variant?.size || 'Size'}
//                   </p>
//                   <div className="flex gap-3">
//                     <div
//                       onClick={() => handleIncrement(item)}
//                       className="hover:cursor-pointer"
//                     >
//                       <Plus color="black" />
//                     </div>
//                     <p className="text-[16px] font-semibold text-[#232321] opacity-80">
//                       Quantity {item.quantity}
//                     </p>
//                     <div
//                       onClick={() => handleDecrement(item)}
//                       className="hover:cursor-pointer"
//                     >
//                       <Minus color="black" />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex gap-6">
//                   <Heart color="black" />
//                   <Trash
//                     color="black"
//                     onClick={() => handleDeleteItem(item.id)}
//                     className="hover:cursor-pointer"
//                   />
//                 </div>
//               </div>
//               <h3 className="font-semibold text-[20px] text-[#4A69E2]">
//                 ${item.product?.price || 0}
//               </h3>
//             </div>
//           ))}
//         </div>
//         {/* second grid */}
//         <div className="mt-5 max-w-[400px] text-[#232321] ">
//           <h1 className="text-[30px] font-semibold mb-[24px]">Order Summary</h1>
//           <div className="flex justify-between mb-[16px]">
//             <p className="text-[17px] font-semibold">
//               {carts.length} {carts.length > 1 ? 'Items' : 'Item'}
//             </p>
//             <p className="text-[17px] font-semibold">${totalPrice}</p>
//           </div>
//           <div className="flex justify-between mb-[16px]">
//             <p className="text-[17px] font-semibold">Delivery</p>
//             <p className="text-[17px] font-semibold">$0</p>
//           </div>
//           <div className="flex justify-between mb-[16px]">
//             <p className="text-[17px] font-semibold">Sales tax</p>
//             <p className="text-[17px] font-semibold">$0</p>
//           </div>
//           <div className="flex justify-between">
//             <p className="text-[20px] font-semibold">Total</p>
//             <p className="text-[20px] font-semibold">${totalPrice}</p>
//           </div>
//           <button
//             className="w-full my-[24px] rounded-[8px] bg-[#232321] text-white text-[14px] font-medium px-[16px] py-[8px]"
//             onClick={pay}
//           >
//             Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DetailCart;
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
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const DetailCart: React.FC = () => {
  const carts = useAppSelector((state: RootState) => state.cart.cartItems);
  const totalPrice = useAppSelector(selectTotalPrice);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleIncrement = (cartItem: Cart) => {
    dispatch(incrementQuantityAsync(cartItem));
  };

  const handleDeleteItem = (itemId: number) => {
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

  useEffect(() => {
    const snapScript = 'https://app.sandbox.midtrans.com/snap/snap.js';
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY; // Use NEXT_PUBLIC prefix for environment variables used in the client-side
    const script = document.createElement('script');
    script.src = snapScript;
    script.setAttribute('data-client-key', String(clientKey));
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const pay = async () => {
    const data = {
      products: carts.map(({ product, quantity }) => ({
        id: product.id,
        productName: product.name,
        price: product.price,
        quantity,
      })),
      userId: 5,
    };

    const response = await fetch('http://localhost:8000/api/trx', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();
    console.log('Response:', res);

    window.snap.pay(res.snap_token, {
      onSuccess: function (result: any) {
        alert('Transaction successful!');
        router.push(`/order-status?transaction_id=${res.transaction_id}`);
      },
      onPending: function (result: any) {
        alert('Transaction pending.');
        router.push(`/order-status?transaction_id=${res.transaction_id}`);
      },
      onError: function (result: any) {
        alert('Transaction failed.');
        router.push(`/order-status?transaction_id=${res.transaction_id}`);
      },
      onClose: function () {
        alert('Transaction closed.');
      },
    });
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
          {carts.map((item: Cart) => (
            <div key={item.id} className="flex justify-between mb-5">
              <Image src={`/sepatu.jpg`} alt="spt" width={195} height={210} />
              <div className="p-2 flex flex-col mr-14">
                <h1 className="font-semibold text-[20px] text-[#232321] mb-[8px]">
                  {item.product?.name || 'Product Name'}
                </h1>
                <p className="text-[16px] font-semibold text-[#232321] opacity-80">
                  {item.product?.description || 'Product Description'}
                </p>
                <div className="flex justify-between mt-[16px] mb-[48px]">
                  <p className="text-[16px] font-semibold text-[#232321] opacity-80">
                    Size {item.variant?.size || 'Size'}
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
                  <Trash
                    color="black"
                    onClick={() => handleDeleteItem(item.id)}
                    className="hover:cursor-pointer"
                  />
                </div>
              </div>
              <h3 className="font-semibold text-[20px] text-[#4A69E2]">
                ${item.product?.price || 0}
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
            <p className="text-[17px] font-semibold">${totalPrice}</p>
          </div>
          <div className="flex justify-between mb-[16px]">
            <p className="text-[17px] font-semibold">Delivery</p>
            <p className="text-[17px] font-semibold">$0</p>
          </div>
          <div className="flex justify-between mb-[16px]">
            <p className="text-[17px] font-semibold">Sales tax</p>
            <p className="text-[17px] font-semibold">$0</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[20px] font-semibold">Total</p>
            <p className="text-[20px] font-semibold">${totalPrice}</p>
          </div>
          <button
            className="w-full my-[24px] rounded-[8px] bg-[#232321] text-white text-[14px] font-medium px-[16px] py-[8px]"
            onClick={pay}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailCart;
