import { getOrderService } from '@/services/order/getOrderService';
import { getOrdersService } from '@/services/order/getOrdersService';
import {
  IPayloadPostOrder,
  postOrderService,
} from '@/services/order/postOrderService';
import { Request, Response, NextFunction } from 'express';

export class OrderController {
  async getOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const orderId = Number(req.params.id as string);
      const response = await getOrderService(orderId);
      return res.status(200).send(response);
    } catch (error) {
      next();
    }
  }
  async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await getOrdersService();
      return res.status(200).send(response);
    } catch (error) {
      next();
    }
  }
  async postOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user.id;
      const body: IPayloadPostOrder = {
        discount: 0,
        payment_method: 'MANUAL',
        shippingCost: 1,
        shippingDetail: 1,
        total: 0,
      };
      const response = await postOrderService(userId, body);
      return res.status(200).send(response);
    } catch (error) {
      next();
    }
  }
}
