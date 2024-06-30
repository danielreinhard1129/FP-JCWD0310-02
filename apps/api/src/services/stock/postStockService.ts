import prisma from '@/prisma';
import { Variant, VariantStock } from '@prisma/client';

interface VariantWithStocks extends Variant {
  variantStocks: VariantStock[];
}

interface PostStockService {
  userId: number;
  toWarehouseId: number;
  fromWarehouseId?: number;
  variantId: number;
  quantity: number;
  type: 'ADD' | 'REQUEST' | 'AUTOMATION';
}

export const PostStockService = async (body: PostStockService) => {
  try {
    const {
      fromWarehouseId,
      toWarehouseId,
      quantity,
      type,
      userId,
      variantId,
    } = body;
    const user = await prisma.users.findFirst({
      where: {
        id: userId,
      },
      include: {
        employee: {
          include: {
            warehouse: true,
          },
        },
      },
    });

    if (!user) throw new Error('We cannot find your user data!');
    if (!user.employee || user.role == 'CUSTOMER')
      throw new Error('You are not an admin!');

    if (type !== 'ADD' && type !== 'REQUEST')
      throw new Error('Error on stock management type!');

    // Add services
    if (type == 'ADD') {
      if (user.role == 'WAREHOUSE_ADMIN') {
        throw new Error(
          'As a warehouse admin you cannot add stocks,request only accepted',
        );
      }
      if (!toWarehouseId) throw new Error('To warehouse is empty');

      const response = await addStock(toWarehouseId, variantId, quantity);
      return {
        data: response,
        message: 'Success add stocks',
      };
    }

    // Request Services
    if (type == 'REQUEST') {
      if (!fromWarehouseId) throw new Error('From warehouse field is empty');
      if (!toWarehouseId) throw new Error('To warehouse field is empty');

      const response = await requestStock(
        fromWarehouseId,
        toWarehouseId,
        variantId,
        quantity,
      );
      return {
        data: response,
        message: 'Success request stocks',
      };
    }
  } catch (error) {
    throw error;
  }
};

const addStock = async (
  warehouseId: number,
  variantId: number,
  incrementQuantity: number,
) => {
  try {
    const variantStock = await prisma.variantStock.findFirst({
      where: {
        variantId,
        warehouseId,
      },
      include: {
        variant: {
          include: {
            product: true,
          },
        },
      },
    });

    const addVariantStock = variantStock
      ? await prisma.variantStock.update({
          where: {
            id: variantStock.id,
          },
          data: {
            quantity: variantStock.quantity + incrementQuantity,
          },
          include: { variant: true },
        })
      : await prisma.variantStock.create({
          data: {
            quantity: incrementQuantity,
            variantId: variantId,
            warehouseId,
          },
          include: { variant: true },
        });

    const journal = await prisma.stockMutation.create({
      data: {
        quantity: addVariantStock.quantity,
        status: 'DONE',
        type: 'ADD',
        toWarehouseId: warehouseId,
        variantId: addVariantStock.variantId,
        productId: addVariantStock.variant.productId,
      },
    });

    return addVariantStock;
  } catch (error) {
    throw error;
  }
};

const requestStock = async (
  fromWarehouseId: number,
  toWarehouseId: number,
  variantId: number,
  quantity: number,
) => {
  try {
    const variantStock = await prisma.variantStock.findFirst({
      where: { variantId, warehouseId: fromWarehouseId },
      include: {
        variant: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!variantStock) throw new Error('Cannot find this variant stocks');

    if (variantStock.quantity < quantity)
      throw new Error('Quantity is not enough on this warehouse');

    const stockMutation = await prisma.stockMutation.create({
      data: {
        quantity,
        fromWarehouseId,
        toWarehouseId,
        status: 'WAIT_CONFIRMATION',
        type: 'REQUEST',
        variantId: variantStock.variantId,
        productId: variantStock.variant.productId,
      },
    });

    return stockMutation;
  } catch (error) {
    throw error;
  }
};
