'use client';
import { fetchOrders } from '@/lib/apii';
import { ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface Warehouse {
  id: number;
  name: string;
  street: string;
  city: string;
  province: string;
  state: string;
  lat: number;
  lon: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  isDelete: boolean;
  createdAt: string;
  updateAt: string;
}

interface Variant {
  id: number;
  color: string;
  size: string;
  productId: number;
  isDelete: boolean;
  product: Product;
}

interface OrderItem {
  id: number;
  orderId: string;
  productId: number;
  variantId: number;
  product: Product;
  variant: Variant;
}

interface Order {
  id: string;
  status: string;
  total: number;
  shippingCost: number;
  createdAt: string;
  updateAt: string;
  userId: number;
  warehouseId: number;
  warehouse: Warehouse;
  orderItems: OrderItem[];
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const limitRef = useRef<HTMLInputElement>(null);
  const pageRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const orderIdRef = useRef<HTMLInputElement>(null);

  const fetchOrderData = async (params: any) => {
    try {
      const data = await fetchOrders(params);
      setOrders(data.orders);
    } catch (err) {
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderData({
      limit: '1',
      page: '1',
    });
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const filters = {
      limit: limitRef.current?.value || '2',
      page: pageRef.current?.value || '1',
      status: statusRef.current?.value || '',
      startDate: startDateRef.current?.value || '',
      endDate: endDateRef.current?.value || '',
      orderId: orderIdRef.current?.value || '',
    };
    fetchOrderData(filters);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="h-[800px] w-[1300px] bg-white shadow-xl mb-3 rounded-xl text-black p-5">
      <form onSubmit={handleFormSubmit} className="mb-5">
        <input
          type="text"
          name="orderId"
          placeholder="Order ID"
          ref={orderIdRef}
          className="bg-white p-3 w-[200px] h-[50px] border border-gray-700 mr-4"
        />
        <button type="submit">Filter</button>
      </form>
      {orders.map((order) => (
        <div key={order.id} className="mb-5">
          <div className="flex gap-5 items-center ">
            <ShoppingBag size={35} />
            <h1 className="text-lg font-semibold">{order.id}</h1>
          </div>
          <div className="flex justify-between mt-5 text-lg font-normal">
            <div className="bg-white border border-gray-500 shadow-xl rounded-md  w-[200px] text-center">
              <h1>{order.warehouse.name}</h1>
              <p>{order.warehouse.city}</p>
            </div>
            <div className="bg-white border border-gray-500 shadow-xl rounded-md p-3 w-[100px] text-center">
              <p>{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="bg-white border border-gray-500 shadow-xl rounded-md p-3 w-[100px] text-center">
              <h1>Address</h1>
              <p>
                {order.warehouse.street}, {order.warehouse.city}
              </p>
            </div>
          </div>
          {order.orderItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-5 items-center w-full bg-white rounded-3xl shadow-xl mt-5"
            >
              <Image src="/sepatu.jpg" width={200} height={200} alt="ok" />
              <div className="font-semibold text-xl">
                <h1>{item.product?.name || 'NAMA'}</h1>
                <h1>Rp. {item.product?.price}</h1>
                <h1>Size {item.variant?.size}</h1>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;

// <div>
//   <h1>Orders</h1>
//   <form onSubmit={handleFormSubmit}>
//     <input
//       type="text"
//       name="limit"
//       placeholder="Limit"
//       ref={limitRef}
//       defaultValue="2"
//     />
//     <input
//       type="text"
//       name="page"
//       placeholder="Page"
//       ref={pageRef}
//       defaultValue="1"
//     />
//     <input type="text" name="status" placeholder="Status" ref={statusRef} />
//     <input type="date" name="startDate" ref={startDateRef} />
//     <input type="date" name="endDate" ref={endDateRef} />
//     <input
//       type="text"
//       name="orderId"
//       placeholder="Order ID"
//       ref={orderIdRef}
//     />
//     <button type="submit">Filter</button>
//   </form>
//   <ul className="grid grid-cols-3 max-w-full mx-auto">
//     {orders.map((order) => (
//       <li key={order.id} className="text-red-600">
//         <p>ID: {order.id}</p>
//         <p>Status: {order.status}</p>
//         <p>Total: {order.total}</p>
//         <p>Shipping Cost: {order.shippingCost}</p>
//         <p>Created At: {order.createdAt}</p>
//         <p>Updated At: {order.updateAt}</p>
//         <p>User ID: {order.userId}</p>
//         <p>Warehouse ID: {order.warehouseId}</p>
//       </li>
//     ))}
//   </ul>
// </div>
