import { createWarehouseService } from '@/services/warehouse/createWarehouse.service';
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
}
