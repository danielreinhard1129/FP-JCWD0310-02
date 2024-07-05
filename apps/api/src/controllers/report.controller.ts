import { getSalesReportsSerivce } from '@/services/report/getSalesReportsService';
import { getStocksReportsService } from '@/services/report/getStocksReportsService';
import { NextFunction, Request, Response } from 'express';

export class ReportController {
  async getSalesReport(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await getSalesReportsSerivce();
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
  async getStocksReport(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await getStocksReportsService();
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}
