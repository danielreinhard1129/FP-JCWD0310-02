import prisma from '@/prisma';
import { User } from '@/types/user.type';

export const postStockMutationsConfirmationService = async (
  userId: number,
  stockMutationId: number,
  fromWarehouseId: number,
  toWarehouseId: number,
  quantity: number,
  type: 'CONFIRM' | 'ARRIVED' | 'REJECT',
) => {
  try {
    if (quantity == 0) throw new Error('Quantity cannot be 0');

    const user = await prisma.users.findFirst({
      where: { id: userId },
      include: {
        employee: {
          include: {
            warehouse: true,
          },
        },
      },
    });

    if (!user) throw new Error('Something is error with your account');
    if (!user.employee) throw new Error('You are not an admin!');

    const stockMutation = await prisma.stockMutation.findFirst({
      where: {
        id: stockMutationId,
        fromWarehouseId,
        toWarehouseId,
      },
    });

    if (!stockMutation) throw new Error('Cannot found stock mutations');

    const stockVariant = await prisma.variantStock.findFirst({
      where: { variantId: stockMutation.variantId },
    });

    if (!stockVariant) throw new Error('Cannot found stock variant!');

    if (stockMutation.status == 'DONE')
      throw new Error('This stock mutations is already done!');

    if (
      stockMutation.fromWarehouseId == user.employee.warehouseId ||
      user.role == 'SUPER_ADMIN'
    ) {
      if (type == 'CONFIRM') {
        const updateStockMutations = await confirmStockMutations(
          stockMutation.id,
        );
        return {
          data: updateStockMutations,
          message: 'Succes confirm stock mutations',
        };
      }
      if (type == 'REJECT') {
        const updateStockMutations = await rejectStockMutations(
          stockMutation.id,
        );
        return {
          data: updateStockMutations,
          message: 'Succes confirm stock mutations',
        };
      }
    }

    if (
      stockMutation.toWarehouseId == user.employee.warehouseId ||
      user.role == 'SUPER_ADMIN'
    ) {
      if (type == 'ARRIVED') {
        if (stockMutation.status != 'ON_PROGRESS')
          throw new Error(
            `Current stock mutations is ${stockMutation.status}.which not support for this actions`,
          );

        const toVariantStock = await prisma.variantStock.findFirst({
          where: {
            variantId: stockMutation.variantId,
            warehouseId: toWarehouseId,
          },
        });
        const fromVariantStock = await prisma.variantStock.findFirst({
          where: {
            variantId: stockMutation.variantId,
            warehouseId: fromWarehouseId,
          },
        });

        console.log(toVariantStock);
        console.log(fromVariantStock);

        if (!toVariantStock) throw new Error('Cannot find variant stocks');

        if (!fromVariantStock) throw new Error('Cannot find variant stocks');

        const updateStockMutations = await arrivedStockMutations(
          stockMutation.id,
          fromVariantStock.id,
          toVariantStock.id,
          fromVariantStock.quantity,
          toVariantStock.quantity,
          quantity,
        );
        return {
          data: updateStockMutations,
          message: 'Succes confirm stock mutations',
        };
      }
    }

    throw new Error('Something is error');
  } catch (error) {
    throw error;
  }
};

const confirmStockMutations = async (stockMutationId: number) => {
  try {
    const updateStockMutations = await prisma.stockMutation.update({
      where: { id: stockMutationId },
      data: {
        status: 'ON_PROGRESS',
      },
    });
    return {
      data: updateStockMutations,
      message: 'Success confirm stock mutations',
    };
  } catch (error) {
    throw error;
  }
};

const rejectStockMutations = async (stockMutationId: number) => {
  try {
    const updateStockMutations = await prisma.stockMutation.update({
      where: { id: stockMutationId },
      data: {
        status: 'REJECT',
      },
    });
    return {
      data: updateStockMutations,
      message: 'Success reject stock mutations',
    };
  } catch (error) {
    throw error;
  }
};

const arrivedStockMutations = async (
  stockMutationId: number,
  fromVariantStocksId: number,
  toVariantStocksId: number,
  fromQuantity: number,
  toQuantity: number,
  quantity: number,
) => {
  try {
    const updateStockMutations = await prisma.stockMutation.update({
      where: { id: stockMutationId },
      data: {
        status: 'DONE',
      },
    });

    const updateFromVariantStocks = await prisma.variantStock.update({
      where: { id: fromVariantStocksId },
      data: { quantity: fromQuantity - quantity },
    });

    const updateToVariantStocks = await prisma.variantStock.update({
      where: { id: toVariantStocksId },
      data: { quantity: toQuantity + quantity },
    });

    return {
      from: updateFromVariantStocks,
      to: updateToVariantStocks,
      message: 'Success confirm arrived stocks',
    };
  } catch (error) {
    throw error;
  }
};
