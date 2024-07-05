import { ReportController } from '@/controllers/report.controller';
import { Router } from 'express';

export class ReportRouter {
  private router: Router;
  private reportController: ReportController;

  constructor() {
    this.reportController = new ReportController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.reportController.getSalesReport);
    this.router.get('/stocks', this.reportController.getStocksReport);
  }

  getRouter(): Router {
    return this.router;
  }
}
