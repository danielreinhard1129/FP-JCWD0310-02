import { getOrderListService } from '@/services/orders/getOrderListService';
import { NextFunction, Request, Response } from 'express';

export class OrderController {
  async getOrderListController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await getOrderListService(req.query);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
