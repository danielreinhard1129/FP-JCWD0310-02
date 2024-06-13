import { CartController } from '@/controllers/cart.controller';
import { Router } from 'express';

export class CartRouter {
  private router: Router;
  private cartController: CartController;

  constructor() {
    this.cartController = new CartController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', this.cartController.CreateItemCartController);
    this.router.get('/:id', this.cartController.GetCartItemsByUserId);
    this.router.put('/:id', this.cartController.IncrementItemController);
    this.router.put('/:id', this.cartController.DecrementItemController);
    this.router.delete('/:id', this.cartController.DeleteCartById);
  }

  getRouter(): Router {
    return this.router;
  }
}
