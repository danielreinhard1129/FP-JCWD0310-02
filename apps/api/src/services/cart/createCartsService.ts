import prisma from '@/prisma';
import { Cart } from '@prisma/client';

interface ICreateCartServicesPayload {
  productId: number;
  userId: number;
  quantity: number;
  variantId: number;
}

export const createCartsService = async (body: ICreateCartServicesPayload) => {
  const { productId, userId, quantity, variantId } = body;
  try {
    if (!productId && !userId && !quantity && !variantId)
      throw new Error('Something is error');

    const cart = await prisma.$transaction(async (tx) => {
      try {
        const user = await tx.users.findFirst({
          where: { id: userId },
        });
        if (!user)
          throw new Error('Cannot find your user account please login');

        const variant = await tx.variant.findFirst({
          where: {
            productId,
            id: variantId,
          },
        });

        if (!variant)
          throw new Error('Something is error.cannot find product variant!');

        const existCart = await tx.cart.findFirst({
          where: {
            userId: user.id,
            productId: variant.productId,
            variantId: variant.id,
          },
        });

        if (!existCart) {
          const cartItem = await tx.cart.create({
            data: {
              quantity,
              productId: variant.productId,
              variantId: variant.id,
              userId: user.id,
            },
          });

          return cartItem;
        }

        const updateCart = await tx.cart.update({
          where: { id: existCart.id },
          data: { quantity: existCart.quantity + quantity },
        });
      } catch (error) {
        throw error;
      }
    });

    return {
      message: 'Success add to your cart',
      data: cart,
    };
  } catch (error) {
    throw error;
  }
};
