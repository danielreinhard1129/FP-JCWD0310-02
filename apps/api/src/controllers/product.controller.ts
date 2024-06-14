import { Request, Response } from 'express';
import prisma from '@/prisma';
import { GetProductService } from '@/services/products/getProductService';
import { GetProductsService } from '@/services/products/getProductsService';
import { PostProductService } from '@/services/products/postProductService';
import { PatchProductService } from '@/services/products/patchProductService';

export class ProductController {
  async getProduct(req: Request, res: Response) {
    const id = Number(req.params.id);
    const response = await GetProductService(id);
    return res.status(200).send(response);
  }
  async getProducts(req: Request, res: Response) {
    const filterString = (req.query.filter as string) || '';
    const filter =
      filterString.length > 2
        ? filterString.split(',').map((val, indx) => {
            return {
              name: { contains: val },
            };
          })
        : [{ name: { contains: '' } }];
    const query = {
      take: parseInt(req.query.take as string) || 10,
      page: parseInt(req.query.page as string) || 1,
      sortBy: (req.query.sortBy as string) || 'createdAt',
      sortOrder: (req.query.sortOrder as string) || 'desc',
      search: (req.query.search as string) || '',
      warehouse: Number(req.query.warehouse) || undefined,
      userId: Number(req.query.userId),
      userRole: (req.query.userRole as string) || undefined,
      filter,
    };
    const response = await GetProductsService(query);
    return res.status(200).send(response);
  }

  async postProduct(req: Request, res: Response) {
    const files = req.files as Express.Multer.File[];
    if (!files.length) {
      return res.status(200).send({ messages: 'no image uploaded' });
    }
    const response = await PostProductService({ ...req.body, image: files });
    return res.status(200).send(response);
  }
  async patchProduct(req: Request, res: Response) {
    const id = Number(req.params.id);
    const response = await PatchProductService(id, req.body);
    return res.status(200).send(response);
  }
}
