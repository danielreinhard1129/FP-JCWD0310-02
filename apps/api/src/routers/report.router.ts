import { ReportController } from '@/controllers/report.controller';
import { verifyToken } from '@/lib/jwt';
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
    this.router.get(
      '/sales/:id',
      verifyToken,
      this.reportController.getSalesReport,
    );
    this.router.get(
      '/stocks/:id',
      verifyToken,
      this.reportController.getStocksReport,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
