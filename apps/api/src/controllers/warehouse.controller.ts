import { createWarehouseService } from '@/services/warehouse/createWarehouse.service';
import { createWarehouseAdminService } from '@/services/warehouse/createWarehouseAdmin';
import { deleteWarehouseAdminService } from '@/services/warehouse/deletedWarehouseAdmin.service';
import { getWarehouseService } from '@/services/warehouse/getWarehouses.service';
import { NextFunction, Request, Response } from 'express';
export class WarehouseController {
  async createWarehouse(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await createWarehouseService(req.body);
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
  async getWarehouses(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await getWarehouseService();
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
  async createWarehouseAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await createWarehouseAdminService(req.body);
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
  async deletedWarehouseAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await deleteWarehouseAdminService(Number(req.params.id));
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}
