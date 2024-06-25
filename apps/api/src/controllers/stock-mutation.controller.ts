import { getStockMutationsService } from '@/services/stock-mutations/getStockMutations';
import { postStockMutationsConfirmationService } from '@/services/stock-mutations/postStockConfirmation';
import { NextFunction, Request, Response } from 'express';
export class StockMutationController {
  async getStockMutations(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await getStockMutationsService(res.locals.user.id);
      res.status(200).send(response);
    } catch (error) {
      next();
    }
  }
  async postStockMutationsConfirmation(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const response = await postStockMutationsConfirmationService(
        res.locals.user.id,
        Number(req.body.stockMutationId),
        Number(req.body.fromWarehouseId),
        Number(req.body.toWarehouseId),
        Number(req.body.quantity),
        req.body.type,
      );
      res.status(200).send(response);
    } catch (error) {
      next();
    }
  }
}
