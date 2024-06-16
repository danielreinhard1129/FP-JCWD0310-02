import prisma from '@/prisma';
import { OrderStatus, Prisma } from '@prisma/client';

interface OrderQuery {
  status?: OrderStatus;
  page?: number;
  limit?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
  orderNumber?: string;
}

export const getOrderListService = async (query: OrderQuery) => {
  const {
    status,
    page = 1,
    limit = 10,
    startDate,
    endDate,
    orderNumber,
  } = query;
  try {
    let where: Prisma.OrderWhereInput = {};

    if (status) {
      where.status = status;
    }

    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    if (orderNumber) {
      where.id = parseInt(orderNumber);
    }

    const totalOrders = await prisma.order.count({ where });
    const totalPage = Math.ceil(totalOrders / limit);

    const order = await prisma.order.findMany({
      where,
      skip: (page - 1) * limit,
      include: {
        orderItems: true,
        payments: true,
        user: true,
        warehouse: true,
      },
    });

    return {
      totalOrders,
      totalPage,
      order,
      page,
      limit,
    };
  } catch (error) {
    throw error;
  }
};
