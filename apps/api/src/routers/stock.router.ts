import { StockController } from '@/controllers/stock.controller';
import { Router } from 'express';

export class StockRouter {
  private router: Router;
  private stockController: StockController;

  constructor() {
    this.stockController = new StockController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.stockController.getStocks);
    this.router.get('/:id', this.stockController.getStock);
    this.router.post('/:id', this.stockController.postStock);
  }
  getRouter(): Router {
    return this.router;
  }
}
