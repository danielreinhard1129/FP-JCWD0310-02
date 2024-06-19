import { createTrxService } from '@/services/transactions/createTrxService';
import { getTrxByIdService } from '@/services/transactions/getTrxById';
import { NextFunction, Request, Response } from 'express';

export class TrxController {
  async createTrxController(req: Request, res: Response) {
    const data = await createTrxService(req.body);

    return res.status(201).json(data);
  }

  async getTrxById(req: Request, res: Response, next: NextFunction) {
    try {
      const { transaction_id } = req.params;
      const result = await getTrxByIdService(transaction_id);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
