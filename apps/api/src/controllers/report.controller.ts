import { getSalesReportsSerivce } from '@/services/report/getSalesReportsService';
import { getStocksReportsService } from '@/services/report/getStocksReportsService';
import dayjs from 'dayjs';
import { NextFunction, Request, Response } from 'express';

export class ReportController {
  async getSalesReport(req: Request, res: Response, next: NextFunction) {
    try {
      const warehouseId = Number(req.params.id);
      const userId = Number(res.locals.user.id);
      const date = {
        startDate: new Date(
          (req.query.startDate as string) ||
            new Date(dayjs(new Date()).startOf('months').toISOString()),
        ),
        endDate: new Date(
          (req.query.endDate as string) ||
            new Date(dayjs(new Date()).endOf('months').toISOString()),
        ),
      };
      const response = await getSalesReportsSerivce(warehouseId, userId, date);
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
  async getStocksReport(req: Request, res: Response, next: NextFunction) {
    try {
      const warehouseId = Number(req.params.id);
      const userId = Number(res.locals.user.id);
      const date = {
        startDate: new Date(
          (req.query.startDate as string) ||
            new Date(dayjs(new Date()).startOf('months').toISOString()),
        ),
        endDate: new Date(
          (req.query.endDate as string) ||
            new Date(dayjs(new Date()).endOf('months').toISOString()),
        ),
      };
      const response = await getStocksReportsService(warehouseId, userId, date);
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}
