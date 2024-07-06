import { getSalesReportsSerivce } from '@/services/report/getSalesReportsService';
import { getStocksReportsService } from '@/services/report/getStocksReportsService';
import { NextFunction, Request, Response } from 'express';

export class ReportController {
  async getSalesReport(req: Request, res: Response, next: NextFunction) {
    try {
      const warehouseId = Number(req.params.id);
      const userId = Number(res.locals.user.id);
      const response = await getSalesReportsSerivce(warehouseId, userId);
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
  async getStocksReport(req: Request, res: Response, next: NextFunction) {
    try {
      const warehouseId = Number(req.params.id);
      const userId = Number(res.locals.user.id);
      const response = await getStocksReportsService(warehouseId, userId);
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}
