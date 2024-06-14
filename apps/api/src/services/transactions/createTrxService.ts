import prisma from '@/prisma';
import { nanoid } from 'nanoid';

interface Product {
  id: number;
  quantity: number;
  variantId: number;
}

interface TrxRequest {
  userId: number;
  shippingDetail: number;
  shippingCost: number;
  products: Product[];
}

export const createTrxService = async (body: TrxRequest) => {
  const { products, shippingCost, shippingDetail, userId } = body;
  try {
    const productsBody: Product[] = products.map((product) => ({
      id: product.id,
      variantId: product.variantId,
      quantity: product.quantity,
    }));

    const DBProducts = await prisma.product.findMany({
      where: { id: { in: productsBody.map(({ id }) => id) } },
    });

    if (DBProducts.length === 0) throw new Error('Products not found!');

    const user = await prisma.users.findMany({
      where: {
        id: userId,
      },
    });

    if (!user) throw new Error('User not found!');

    const transaction_id = `TRX-${nanoid(8)}-${nanoid(4)}`;
    const gross_amount = DBProducts.reduce((acc, product) => {
      const productQuantity = productsBody.find((p) => {
        p.id === product.id;
      })?.quantity;
      return acc + (productQuantity ? productQuantity * product.)
    }, 0);
  } catch (error) {
    throw error;
  }
};
