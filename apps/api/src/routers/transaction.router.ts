import { CartController } from '@/controllers/cart.controller';
import { TransactionController } from '@/controllers/transaction.controller';
import { verifyToken } from '@/lib/jwt';
import { uploader } from '@/lib/uploader';
import { Router } from 'express';

export class TransactionRouter {
  private router: Router;
  private transactionController: TransactionController;

  constructor() {
    this.transactionController = new TransactionController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/rajaongkir', this.transactionController.getRajaOngkir);
    this.router.get('/:id', this.transactionController.getTransaction);
    this.router.get('/', this.transactionController.getTransactions);
    this.router.post(
      '/',
      verifyToken,
      uploader('IMG', '/images').array('images'),
      this.transactionController.postTransactionPaymentProof,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
