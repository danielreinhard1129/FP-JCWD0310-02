import { StockMutationController } from '@/controllers/stock-mutation.controller';
import { verifyToken } from '@/lib/jwt';
import { Router } from 'express';

export class StockMutationRouter {
  private router: Router;
  private stockMutationController: StockMutationController;

  constructor() {
    this.stockMutationController = new StockMutationController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/warehouses',
      verifyToken,
      this.stockMutationController.getWarehouses,
    );
    this.router.get(
      '/',
      verifyToken,
      this.stockMutationController.getStockMutations,
    );
    this.router.post(
      '/',
      verifyToken,
      this.stockMutationController.postStockMutationsConfirmation,
    );
  }
  getRouter(): Router {
    return this.router;
  }
}
