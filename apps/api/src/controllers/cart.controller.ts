import { createCartsService } from '@/services/cart/createCartsService';
import { decreaseCartService } from '@/services/cart/decreaseCart';
import { deleteCartservice } from '@/services/cart/deleteCartItemService';
import { getUserCartByIdService } from '@/services/cart/getCartsByUserIdService';
import { increaseCartService } from '@/services/cart/incrementCartService';
import { NextFunction, Request, Response } from 'express';

export class CartController {
  async CreateItemCartController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const body = {
        productId: Number(req.body.productId),
        userId: Number(req.body.userId),
        quantity: Number(req.body.quantity),
        variantId: Number(req.body.variantId),
      };
      const result = await createCartsService(body);

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
