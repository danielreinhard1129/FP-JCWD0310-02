export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
}

export const productDatas: Product[] = [
  {
    id: 1,
    title: 'Laptop',
    price: 999.99,
    description: 'A high-performance laptop for all your computing needs.',
    category: 'Electronics',
    createdAt: '2023-01-01T10:00:00Z',
    updatedAt: '2023-06-01T10:00:00Z',
  },
  {
    id: 2,
    title: 'Smartphone',
    price: 799.99,
    description: 'A sleek smartphone with the latest features.',
    category: 'Electronics',
    createdAt: '2023-02-15T12:30:00Z',
    updatedAt: '2023-06-01T10:00:00Z',
  },
  {
    id: 3,
    title: 'Headphones',
    price: 199.99,
    description: 'Noise-cancelling headphones for immersive sound experience.',
    category: 'Accessories',
    createdAt: '2023-03-10T14:45:00Z',
    updatedAt: '2023-06-01T10:00:00Z',
  },
  {
    id: 4,
    title: 'Coffee Maker',
    price: 49.99,
    description: 'A compact coffee maker for your daily caffeine fix.',
    category: 'Home Appliances',
    createdAt: '2023-04-05T08:00:00Z',
    updatedAt: '2023-06-01T10:00:00Z',
  },
  {
    id: 5,
    title: 'Gaming Console',
    price: 499.99,
    description: 'Next-gen gaming console for ultimate gaming experience.',
    category: 'Electronics',
    createdAt: '2023-05-20T16:20:00Z',
    updatedAt: '2023-06-01T10:00:00Z',
  },
];

export const cartDatas: Cart[] = [
  {
    id: 1,
    userId: 1,
    productId: 1,
    quantity: 1,
    createdAt: '2023-06-10T09:30:00Z',
    updatedAt: '2023-06-10T09:30:00Z',
    product: productDatas[0],
  },
  {
    id: 2,
    userId: 2,
    productId: 2,
    quantity: 2,
    createdAt: '2023-06-11T10:15:00Z',
    updatedAt: '2023-06-11T10:15:00Z',
    product: productDatas[1],
  },
];
