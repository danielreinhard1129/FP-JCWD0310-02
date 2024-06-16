import { OrderController } from '@/controllers/order.controllers';
import { Router } from 'express';

export class OrderRouter {
  private router: Router;
  private orderController: OrderController;

  constructor() {
    this.orderController = new OrderController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/lists', this.orderController.getOrderListController);
  }

  getRouter(): Router {
    return this.router;
  }
}
