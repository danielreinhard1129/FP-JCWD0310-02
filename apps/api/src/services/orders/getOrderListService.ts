import prisma from '@/prisma';

export interface OrderQueryParams {
  limit?: string;
  page?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  orderId?: string;
}

export const getOrderListService = async (body: OrderQueryParams) => {
  try {
    const { limit = 10, page = 1, status, startDate, endDate, orderId } = body;
    const take = parseInt(limit as string, 10);
    const skip = (parseInt(page as string, 10) - 1) * take;

    let where: any = {};

    if (status) {
      where.status = status as string;
    }
    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate as string),
        lte: new Date(endDate as string),
      };
    }
    if (orderId) {
      where.id = orderId as string;
    }

    const totalOrders = await prisma.order.count({ where });
    const orders = await prisma.order.findMany({
      where,
      take,
      skip,
      include: {
        orderItems: true,
        user: true,
        warehouse: true,
      },
    });

    const totalPages = Math.ceil(totalOrders / take);

    return {
      totalOrders,
      totalPages,
      orders,
      page: parseInt(page as string, 10),
      limit: take,
    };
  } catch (error) {
    throw error;
  }
};
