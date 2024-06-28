import { WarehouseController } from '@/controllers/warehouse.controller';
import { verifyToken } from '@/lib/jwt';
import { Router } from 'express';

export class WarehouseRouter {
  private router: Router;
  private warehouseController: WarehouseController;

  constructor() {
    this.warehouseController = new WarehouseController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/createWarehouse',
      this.warehouseController.createWarehouse,
    );
    this.router.get('/getWarehouses', this.warehouseController.getWarehouses);
    this.router.post(
      '/createWarehouse',
      this.warehouseController.createWarehouseAdmin,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
