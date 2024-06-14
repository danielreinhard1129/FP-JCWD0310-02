import { GetStockService } from '@/services/stock/getStockService';
import { GetStocksService } from '@/services/stock/getStocksService';
import { Request, Response } from 'express';
export class StockController {
  async getStock(req: Request, res: Response) {
    const response = await GetStockService(req.body);
    return res.status(200).send('');
  }
  async getStocks(req: Request, res: Response) {
    const query = {
      take: Number(req.query.take as string) || 50,
      page: Number(req.query.page as string) || 1,
      search: (req.query.search as string) || '',
      warehouseId: (req.query.warehouseId as string) || undefined,
    };
    const { userId, role } = req.body;
    const response = await GetStocksService({ userId, role }, query);
    return res.status(200).send(response);
  }
  async postStock(req: Request, res: Response) {
    // const id = Number(req.params.id);
    // const response = await PostStockService();
    return res.status(200).send('response');
  }
}
