import { NextFunction, Request, Response } from 'express';
import { userService } from '../services/user/getUser.service';
import { updateUser } from '@/services/user/updateUser.service';
export class UserController {
  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await userService(
        res.locals.user,
        Number(req.params.id),
      );
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await updateUser(req.body, Number(req.params.id));
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}
