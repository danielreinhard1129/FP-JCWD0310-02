import prisma from '@/prisma';

interface ILocationData {
  id: number;
  warehouse: {
    lat: number;
    lon: number;
  };
  warehouseId: number;
  quantity: number;
  variantId: number;
}

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

      const closestWarehouseVariantStock = getClosestLocation(
        currentWarehouseVariantStocks,
        otherWarehouseVariantStocks,
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
          id: closestWarehouseVariantStock.id,
        },
        data: {
          quantity:
            closestWarehouseVariantStock.quantity -
            quantity +
            currentWarehouseVariantStocks.quantity,
        },
      });

      const stockMutation = await tx.stockMutation.create({
        data: {
          quantity: quantity - currentWarehouseVariantStocks.quantity,
          status: 'DONE',
          type: 'AUTOMATION',
          fromWarehouseId: closestWarehouseVariantStock.warehouseId,
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

const getClosestLocation = (
  targetLocation: ILocationData,
  locationData: ILocationData[],
) => {
  const vectorDistance = (dx: number, dy: number) =>
    Math.sqrt(dx * dx + dy * dy);

  const locationDistance = (
    location1: ILocationData,
    location2: ILocationData,
  ) => {
    const dx = location1.warehouse.lat - location2.warehouse.lat;
    const dy = location1.warehouse.lon - location2.warehouse.lon;
    return vectorDistance(dx, dy);
  };

  return locationData.reduce((a, b) => {
    const prevDistance = locationDistance(targetLocation, a);
    const currDistance = locationDistance(targetLocation, b);
    return prevDistance < currDistance ? a : b;
  });
};
