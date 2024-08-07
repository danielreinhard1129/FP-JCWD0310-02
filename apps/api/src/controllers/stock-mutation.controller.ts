import { getStockMutationsService } from '@/services/stock-mutation/getStockMutations';
import { getStockWarehouses } from '@/services/stock-mutation/getStockWarehouses';
import { postStockMutationsConfirmationService } from '@/services/stock-mutation/postStockConfirmation';
import { NextFunction, Request, Response } from 'express';

type getStockMutationsStatus =
  | 'DONE'
  | 'WAIT_CONFIRMATION'
  | 'ON_PROGRESS'
  | 'REJECT'
  | undefined;

export class StockMutationController {
  async getStockMutations(req: Request, res: Response, next: NextFunction) {
    try {
      const status: getStockMutationsStatus =
        req.query.status == 'WAIT_CONFIRMATION'
          ? 'WAIT_CONFIRMATION'
          : req.query.status == 'ON_PROGRESS'
            ? 'ON_PROGRESS'
            : req.query.status == 'DONE'
              ? 'DONE'
              : req.query.status == 'REJECT'
                ? 'REJECT'
                : undefined;
      const query = {
        page: Number(req.query.page),
        take: Number(req.query.take),
        status: status,
        warehouseId: Number(req.query.warehouseId),
      };
      const response = await getStockMutationsService(
        res.locals.user.id,
        query,
      );
      res.status(200).send(response);
    } catch (error) {
      next(error);
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
      next(error);
    }
  }
  async getWarehouses(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await getStockWarehouses(
        Number(req.query.warehouse) || undefined,
      );
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}
