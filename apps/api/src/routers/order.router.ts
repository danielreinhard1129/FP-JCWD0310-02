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
    this.router.get('/:id', verifyToken, this.orderController.getOrder);
    this.router.get('/', verifyToken, this.orderController.getOrders);
    this.router.post(
      '/:id',
      verifyToken,
      this.orderController.postOrderTransaction,
    );
    this.router.post('/', verifyToken, this.orderController.postOrder);
  }

  getRouter(): Router {
    return this.router;
  }
}
