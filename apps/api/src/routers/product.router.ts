import { ProductController } from '@/controllers/product.controller';
import { verifyToken } from '@/lib/jwt';
import { uploader } from '@/lib/uploader';
import { Router } from 'express';

export class ProductRouter {
  private router: Router;
  private productController: ProductController;

  constructor() {
    this.productController = new ProductController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/:id', this.productController.getProduct);
    this.router.get('/', this.productController.getProducts);
    this.router.post(
      '/',
      verifyToken,
      uploader('IMG', '/images').array('images'),
      this.productController.postProduct,
    );
    this.router.patch(
      '/:id',
      verifyToken,
      uploader('IMG', '/images').array('images'),
      this.productController.patchProduct,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
