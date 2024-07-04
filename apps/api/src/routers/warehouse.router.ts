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
      '/create-warehouse-admin',
      verifyToken,
      this.warehouseController.createWarehouseAdmin,
    );
    this.router.delete(
      '/delete-warehouse-admin/:id',
      this.warehouseController.deletedWarehouseAdmin,
    );
    this.router.delete(
      '/delete-warehouse/:id',
      this.warehouseController.deleteWarehouse,
    );
    this.router.post(
      '/update-warehouse/:id',
      this.warehouseController.updateWarehouse,
    );
    this.router.post(
      '/update-warehouse-admin/:id',
      this.warehouseController.updateWarehouseAdmin,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
