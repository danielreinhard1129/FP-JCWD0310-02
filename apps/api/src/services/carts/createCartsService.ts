import prisma from '@/prisma';
import { Cart } from '@prisma/client';

interface CartBody extends Omit<Cart, 'id'> {}

export const createCartsService = async (body: CartBody) => {
  const { productId, userId, quantity, variantId } = body;
  try {
    const existingItem = await prisma.cart.findFirst({
      where: { userId, productId },
    });
    if (existingItem) {
      const updatedItem = await prisma.cart.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity,
        },
      });
      return updatedItem;
    } else {
      const newItemCart = await prisma.cart.create({
        data: {
          userId: Number(userId),
          productId: Number(productId),
          variantId: Number(variantId),
          quantity: Number(quantity),
        },
      });
      return newItemCart;
    }
  } catch (error) {
    throw error;
  }
};
