// import { TrxController } from '@/controllers/trx.controller';
// import { Router } from 'express';

// export class TrxRouter {
//   private router: Router;
//   private trxController: TrxController;

//   constructor() {
//     this.trxController = new TrxController();
//     this.router = Router();
//     this.initializeRoutes();
//   }

//   private initializeRoutes(): void {
//     this.router.post('/', this.trxController.createTrxController);
//     this.router.post('/notification', this.trxController.createTrxNotification);

//     this.router.get('/:transaction_id', this.trxController.getTrxById);
//   }

//   getRouter(): Router {
//     return this.router;
//   }
// }
