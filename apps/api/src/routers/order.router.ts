import { OrderController } from '@/controllers/order.controller';
import { verifyToken } from '@/lib/jwt';
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
    this.router.get('/:id', this.orderController.getOrder);
    this.router.get('/', this.orderController.getOrders);
    this.router.post('/', this.orderController.postOrder);
  }

  getRouter(): Router {
    return this.router;
  }
}
