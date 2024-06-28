import { GetStockService } from '@/services/stocks/getStockService';
import { GetStocksService } from '@/services/stocks/getStocksService';
import { PostStockService } from '@/services/stocks/postStockService';
import { NextFunction, Request, Response } from 'express';
export class StockController {
  async getStock(req: Request, res: Response, next: NextFunction) {
    try {
      const warehouseId = req.query.warehouse as string;
      const response = await GetStockService(
        Number(req.params.id),
        res.locals.user,
        Number(warehouseId),
      );
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
  async getStocks(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        take: Number(req.query.take as string) || 5,
        page: Number(req.query.page as string) || 1,
        search: (req.query.search as string) || '',
        warehouseId: req.query.warehouseId as string,
      };
      const response = await GetStocksService(res.locals.user, query);
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
  async postStock(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const response = await PostStockService({
        quantity: Number(req.body.quantity as string),
        userId: res.locals.user.id,
        variantId: id,
        toWarehouseId: Number(req.body.toWarehouse as string),
        fromWarehouseId: Number(req.body.fromWarehouse as string) || undefined,
        type: req.body.type,
      });
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}
