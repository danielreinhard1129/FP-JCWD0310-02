import { StockController } from '@/controllers/stock.controller';
import { verifyToken } from '@/lib/jwt';
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
    this.router.get('/:id', verifyToken, this.stockController.getStock);
    this.router.get('/', verifyToken, this.stockController.getStocks);
    this.router.post('/:id', verifyToken, this.stockController.postStock);
  }
  getRouter(): Router {
    return this.router;
  }
}
