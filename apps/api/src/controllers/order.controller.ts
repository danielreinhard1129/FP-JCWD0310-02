import { getOrderService } from '@/services/order/getOrderService';
import { getOrdersService } from '@/services/order/getOrdersService';
import {
  IPayloadPostOrder,
  postOrderService,
} from '@/services/order/postOrderService';
import { postOrderTransactionService } from '@/services/order/postOrderTransactionService';
import { Request, Response, NextFunction } from 'express';

export class OrderController {
  async getOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const orderId = Number(req.params.id as string);
      const response = await getOrderService(orderId);
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
  async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user.id;
      const response = await getOrdersService(userId);
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
  async postOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user.id;
      const response = await postOrderService(userId);
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  async postOrderTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user.id;
      const orderId = Number(req.params.id as string);
      const response = await postOrderTransactionService(
        orderId,
        userId,
        req.body.type,
      );
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}
