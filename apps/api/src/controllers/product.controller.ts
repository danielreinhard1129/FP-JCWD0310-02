import { Request, Response } from 'express';
import prisma from '@/prisma';
import { GetProductService } from '@/services/products/getProductService';
import { GetProductsService } from '@/services/products/getProductsService';
import { PostProductService } from '@/services/products/postProductService';
import { PatchProductService } from '@/services/products/patchProductService';

export class ProductController {
  async getProduct(req: Request, res: Response) {
    const id = Number(req.params.id);
    const response = GetProductService(id);
    return res.status(200).send(response);
  }
  async getProducts(req: Request, res: Response) {
    const query = {
        take : parseInt(req.query.take as string) || 10,
        page : parseInt(req.query.page as string) || 1,
        sortBy : req.query.sortBy as string || 'createdAt',
        sortOrder : req.query.sortOrder as string || 'desc',
        search : req.query.search as string || '',
        filter : req.query.filter as string || '',
    };
    const response = GetProductsService(query);
    return res.status(200).send(response);
  }
  async postProduct(req: Request, res: Response) {
    const response = PostProductService(req.body);
    return res.status(200).send(response);
  }
  async patchProduct(req: Request, res: Response) {
    const id = Number(req.params.id);
    const response = PatchProductService(id,req.body);
    return res.status(200).send(response);
  }
}
