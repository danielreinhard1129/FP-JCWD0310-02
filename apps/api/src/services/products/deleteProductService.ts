import prisma from '@/prisma';

interface UserToken {
  id: number;
}
export const deleteProductService = async (
  userToken: UserToken,
  productId: number,
) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        id: userToken.id,
      },
      include: {
        employee: true,
      },
    });

    if (!user) {
      throw new Error('Cannot find your user data');
    }

    if (user.role != 'SUPER_ADMIN' || !user.employee) {
      throw new Error('You are not an admin,you cannot delete the product');
    }

    const product = await prisma.product.findFirst({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error('The product is not exist');
    }

    if (!product.isDelete) {
      return {
        messages: 'The product is already deleted',
      };
    }

    const deleteProduct = await prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        isDelete: true,
      },
    });

    return {
      messages: 'Success delete the product',
    };
  } catch (error) {
    throw error;
  }
};
