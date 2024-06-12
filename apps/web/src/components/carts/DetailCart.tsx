'use client';
import { Heart, Trash } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface CartItem {
  id: number;
  name: string;
  description: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  image: string;
}

const DetailCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Fetch the cart items or set them manually for now
  useEffect(() => {
    // This is just an example. Replace this with your actual data fetching logic.
    setCartItems([
      {
        id: 1,
        name: 'DROPSET TRAINER SHOES',
        description: 'Men’s Road Running Shoes',
        color: 'Enamel Blue/ University White',
        size: '10',
        quantity: 1,
        price: 130.0,
        image: '/sepatu.jpg',
      },
      {
        id: 4,
        name: 'DROPSET TRAINER SHOES',
        description: 'Men’s Road Running Shoes',
        color: 'Enamel Blue/ University White',
        size: '10',
        quantity: 1,
        price: 130.0,
        image: '/sepatu.jpg',
      },
      // Add more items as needed
    ]);
  }, []);

  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    const delivery = 6.0; // static delivery fee for now
    const salesTax = 0; // static sales tax for now
    const total = subtotal + delivery + salesTax;
    return { subtotal, delivery, salesTax, total };
  };

  const { subtotal, delivery, salesTax, total } = calculateTotal();

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
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between mb-5">
              <Image
                src={item.image}
                alt={item.name}
                width={195}
                height={210}
              />
              {/* description */}
              <div className="p-2 flex flex-col mr-14">
                <h1 className="font-semibold text-[20px] text-[#232321] mb-[8px]">
                  {item.name}
                </h1>
                <p className="text-[16px] font-semibold text-[#232321] opacity-80">
                  {item.description}
                </p>
                <p className="text-[16px] font-semibold text-[#232321] opacity-80">
                  {item.color}
                </p>
                <div className="flex justify-between mt-[16px] mb-[48px]">
                  <p className="text-[16px] font-semibold text-[#232321] opacity-80">
                    Size {item.size}
                  </p>
                  <p className="text-[16px] font-semibold text-[#232321] opacity-80">
                    Quantity {item.quantity}
                  </p>
                </div>
                <div className="flex gap-6">
                  <Heart color="black" />
                  <Trash color="black" />
                </div>
              </div>
              <h3 className="font-semibold text-[20px] text-[#4A69E2]">
                ${item.price.toFixed(2)}
              </h3>
            </div>
          ))}
        </div>
        {/* second grid */}
        <div className="mt-5 max-w-[400px] text-[#232321] ">
          <h1 className="text-[30px] font-semibold mb-[24px]">Order Summary</h1>
          <div className="flex justify-between mb-[16px]">
            <p className="text-[17px] font-semibold">
              {cartItems.length} {cartItems.length > 1 ? 'Items' : 'Item'}
            </p>
            <p className="text-[17px] font-semibold">${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between mb-[16px]">
            <p className="text-[17px] font-semibold">Delivery</p>
            <p className="text-[17px] font-semibold">${delivery.toFixed(2)}</p>
          </div>
          <div className="flex justify-between mb-[16px]">
            <p className="text-[17px] font-semibold">Sales tax</p>
            <p className="text-[17px] font-semibold">${salesTax.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[20px] font-semibold">Total</p>
            <p className="text-[20px] font-semibold">${total.toFixed(2)}</p>
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

// import { Heart, Trash } from 'lucide-react';
// import Image from 'next/image';
// import { Button } from '../ui/button';

// const DetailCart = () => {
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
//               Items in your bag not reserved- check out now to make them yours.
//             </p>
//           </div>
//           {/* pics and descs */}
//           <div className="flex justify-between">
//             <Image src="/sepatu.jpg" alt="sepatu" width={195} height={210} />
//             {/* desc */}
//             <div className="p-2 flex flex-col mr-14">
//               <h1 className="font-semibold text-[20px] text-[#232321] mb-[8px]">
//                 DROPSET TRAINER SHOES
//               </h1>
//               <p className="text-[16px] font-semibold text-[#232321] opacity-80">
//                 Men’s Road Running Shoes{' '}
//               </p>
//               <p className="text-[16px] font-semibold text-[#232321] opacity-80">
//                 Enamel Blue/ University White{' '}
//               </p>

//               <div className="flex justify-between mt-[16px] mb-[48px]">
//                 <p className="text-[16px] font-semibold text-[#232321] opacity-80">
//                   Size 10
//                 </p>

//                 <p className="text-[16px] font-semibold text-[#232321] opacity-80">
//                   Quantity 1
//                 </p>
//               </div>
//               <div className="flex gap-6">
//                 <Heart color="black" />
//                 <Trash color="black" />
//               </div>
//             </div>
//             <h3 className="font-semibold text-[20px] text-[#4A69E2]">
//               $130.00
//             </h3>
//           </div>
//         </div>
//         {/* second grid */}
//         <div className="mt-5 max-w-[400px] text-[#232321] flex flex-col justify-center">
//           <h1 className="text-[30px] font-semibold mb-[24px]">Order Summary</h1>
//           <div className="flex justify-between mb-[16px]">
//             <p className="text-[17px] font-semibold">1 Item</p>
//             <p className="text-[17px] font-semibold">$130.00</p>
//           </div>
//           <div className="flex justify-between mb-[16px]">
//             <p className="text-[17px] font-semibold">Delivery</p>
//             <p className="text-[17px] font-semibold">$6.00</p>
//           </div>
//           <div className="flex justify-between mb-[16px]">
//             <p className="text-[17px] font-semibold">Sales tax</p>
//             <p className="text-[17px] font-semibold">-</p>
//           </div>
//           <div className="flex justify-between">
//             <p className="text-[20px] font-semibold">Total</p>
//             <p className="text-[20px] font-semibold">$160.00</p>
//           </div>
//           <button className="w-full my-[24px] rounded-[8px] bg-[#232321] text-white text-[14px] font-medium px-[16px] py-[8px]">
//             Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DetailCart;
