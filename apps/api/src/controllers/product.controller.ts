import { Request, Response } from 'express';
import { getProductService } from '@/services/products/getProductService';
import { getProductsService } from '@/services/products/getProductsService';
import { postProductService } from '@/services/products/postProductService';
import { patchProductService } from '@/services/products/patchProductService';

export class ProductController {
  async getProduct(req: Request, res: Response) {
    const response = await getProductService(Number(req.params.id));
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
      userId: Number(req.body.user.id),
      filter,
    };
    const response = await getProductsService(query);
    return res.status(200).send(response);
  }

  async postProduct(req: Request, res: Response) {
    const files = req.files as Express.Multer.File[];
    if (!files.length) {
      return res.status(200).send({ messages: 'no image uploaded' });
    }
    const response = await postProductService({
      ...req.body,
      user: res.locals.user,
      image: files,
    });
    return res.status(200).send(response);
  }

  async patchProduct(req: Request, res: Response) {
    const id = Number(req.params.id);
    const files = req.files as Express.Multer.File[];
    if (!files.length) {
      return res.status(200).send({ messages: 'no image uploaded' });
    }
    const response = await patchProductService(
      id,
      { ...req.body, user: res.locals.user },
      files,
    );
    return res.status(200).send(response);
  }
}
