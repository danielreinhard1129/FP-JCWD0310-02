import { GetStockService } from '@/services/stock/getStockService';
import { GetStocksService } from '@/services/stock/getStocksService';
import { NextFunction, Request, Response } from 'express';
export class StockController {
  async getStock(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await GetStockService(
        Number(req.params.id),
        res.locals.user,
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
        warehouseId: (req.query.warehouseId as string) || undefined,
      };
      const response = await GetStocksService(res.locals.user, query);
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
  async postStock(req: Request, res: Response, next: NextFunction) {
    try {
      // const id = Number(req.params.id);
      // const response = await PostStockService();
      return res.status(200).send('response');
    } catch (error) {
      next(error);
    }
  }
}
