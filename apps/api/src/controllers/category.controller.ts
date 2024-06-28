import { getCategoriesService } from '@/services/category/getCategoriesService';
import { NextFunction, Request, Response } from 'express';
export class CategoryController {
  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await getCategoriesService();
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}
