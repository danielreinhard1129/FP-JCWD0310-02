import { ProductController } from '@/controllers/product.controller';
import { verifyToken } from '@/lib/jswt';
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
    this.router.get('/', verifyToken, this.productController.getProducts);
    this.router.get('/:id', verifyToken, this.productController.getProduct);
    this.router.post(
      '/',
      verifyToken,
      uploader('IMG', '/images').array('image'),
      this.productController.postProduct,
    );
    this.router.patch('/:id', verifyToken, this.productController.patchProduct);
  }

  getRouter(): Router {
    return this.router;
  }
}
