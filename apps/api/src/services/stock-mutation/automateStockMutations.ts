import prisma from '@/prisma';
import { haversineUtils } from '@/utils/haversineUtils';
import { Prisma } from '@prisma/client';

export const automateStockMutations = (
  variantId: number,
  warehouseId: number,
  quantity: number,
  orderId: number,
) => {
  return prisma.$transaction(async (tx) => {
    try {
      const currentWarehouseVariantStocks = await tx.variantStock.findFirst({
        where: {
          warehouseId,
          variantId,
        },
        include: {
          warehouse: true,
          variant: true,
        },
      });

      if (!currentWarehouseVariantStocks)
        throw new Error('Cannot find variant stock');

      if (currentWarehouseVariantStocks.quantity > quantity) {
        const updateVariantStocks = await tx.variantStock.update({
          where: {
            id: currentWarehouseVariantStocks.id,
          },
          data: {
            quantity: currentWarehouseVariantStocks.quantity - quantity,
          },
        });

        const updateOrder = await tx.order.update({
          where: { id: orderId },
          data: {
            status: 'ON_PROGRESS',
          },
        });

        return updateOrder;
      }

      const otherWarehouseVariantStocks = await tx.variantStock.findMany({
        where: {
          variantId,
          quantity: {
            gte: quantity,
          },
          warehouseId: {
            not: currentWarehouseVariantStocks.warehouseId,
          },
        },
        include: {
          warehouse: true,
        },
      });

      if (!otherWarehouseVariantStocks)
        throw new Error('Cannot find any variant stock data');

      const closestWarehouseVariantStock = haversineUtils<{
        id: number;
        quantity: number;
        warehouseId: number;
        warehouse: {
          id: number;
          name: string;
          street: string;
          city: string;
          province: string;
          state: string;
          lat: number;
          lon: number;
          subdistrict: string | null;
        };
      }>(
        {
          lat: currentWarehouseVariantStocks.warehouse.lat,
          lon: currentWarehouseVariantStocks.warehouse.lon,
        },
        otherWarehouseVariantStocks.map((val) => {
          return {
            lat: val.warehouse.lat,
            lon: val.warehouse.lon,
            data: val,
          };
        }),
      );

      const updateCurrentWarehouseVariantStock = await tx.variantStock.update({
        where: {
          id: currentWarehouseVariantStocks.id,
        },
        data: {
          quantity: 0,
        },
      });

      const updateClosestVariantStock = await tx.variantStock.update({
        where: {
          id: closestWarehouseVariantStock.data.id,
        },
        data: {
          quantity:
            closestWarehouseVariantStock.data.quantity -
            quantity +
            currentWarehouseVariantStocks.quantity,
        },
      });

      const stockMutation = await tx.stockMutation.create({
        data: {
          quantity: quantity - currentWarehouseVariantStocks.quantity,
          status: 'DONE',
          type: 'AUTOMATION',
          fromWarehouseId: closestWarehouseVariantStock.data.warehouseId,
          toWarehouseId: currentWarehouseVariantStocks.warehouseId,
          productId: currentWarehouseVariantStocks.variant.productId,
          variantId: currentWarehouseVariantStocks.variantId,
        },
      });

      const updateOrder = await tx.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: 'ON_PROGRESS',
        },
      });

      return updateOrder;
    } catch (error) {
      throw error;
    }
  });
};
