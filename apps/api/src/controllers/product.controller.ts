import { NextFunction, Request, Response } from 'express';
import { getProductService } from '@/services/product/getProductService';
import { getProductsService } from '@/services/product/getProductsService';
import { postProductService } from '@/services/product/postProductService';
import { patchProductService } from '@/services/product/patchProductService';
import { deleteProductService } from '@/services/product/deleteProductService';
import { Product } from '@prisma/client';
import { CreateProductParams, ProductPostBody } from '@/types/product.type';

export class ProductController {
  async getProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await getProductService(Number(req.params.id));
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const filterString = (req.query.filter as string) || '';
      const sizeString = (req.query.size as string) || '';
      const colorString = (req.query.color as string) || '';
      const query = {
        take: parseInt(req.query.take as string) || 10,
        page: parseInt(req.query.page as string) || 1,
        sortBy: (req.query.sortBy as string) || 'createdAt',
        sortOrder: (req.query.sortOrder as string) || 'desc',
        search: (req.query.search as string) || '',
        filter: {
          size: sizeString.length >= 2 ? sizeString.split(',') : undefined,
          color: colorString.length > 2 ? colorString.split(',') : undefined,
          filter:
            filterString.length > 2
              ? filterString.split(',').map((val) => {
                  return { name: val };
                })
              : undefined,
        },
      };
      // const response = await getProductsService(query);
      // return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  async postProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files.length) {
        return res.status(400).send({ message: 'no image uploaded' });
      }
      const categories = JSON.parse(req.body.category) as string[];
      const data = {
        user: res.locals.user,
        warehouseId: Number(req.body.warehouse) || undefined,
        product: JSON.parse(req.body.product) as ProductPostBody,
        categories: categories,
        image: files,
        variant: JSON.parse(req.body.variant),
      };
      const response = await postProductService(data);
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  async patchProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const files = req.files as Express.Multer.File[];
      const categories = req.body.category
        ? (JSON.parse(req.body.category) as string[])
        : [];
      const body = {
        user: res.locals.user,
        isDelete: req.body.isDelete ? JSON.parse(req.body.isDelete) : undefined,
        warehouseId: Number(req.body.warehouse) || undefined,
        product: req.body.product
          ? (JSON.parse(req.body.product) as ProductPostBody)
          : undefined,
        categories: categories,
        images: files,
        variant: req.body.variant ? JSON.parse(req.body.variant) : [],
      };
      const response = await patchProductService(id, body);
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await deleteProductService(
        res.locals.user,
        Number(req.params.id),
      );
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}
