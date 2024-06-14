import { createCartsService } from '@/services/carts/createCartsService';
import { decreaseCartService } from '@/services/carts/decreaseCart';
import { deleteCartservice } from '@/services/carts/deleteCartItemService';
import { getUserCartByIdService } from '@/services/carts/getCartsByUserIdService';
import { increaseCartService } from '@/services/carts/incrementCartService';
import { NextFunction, Request, Response } from 'express';

export class CartController {
  async CreateItemCartController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await createCartsService(req.body);

      return res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }

  async IncrementItemController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const result = await increaseCartService(Number(id));

      return res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }

  async DecrementItemController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const result = await decreaseCartService(Number(id));

      return res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }

  async GetCartItemsByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await getUserCartByIdService(Number(id));

      return res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }

  async DeleteCartById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await deleteCartservice(Number(id));

      return res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
}
