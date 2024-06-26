import { NextFunction, Request, Response } from 'express';
import { userService } from '../services/user/getUser.service';
import { updateUserService } from '@/services/user/updateUser.service';
import axios from 'axios';
import { createAddressService } from '@/services/user/createAddress.service';
import { deleteAddressService } from '@/services/user/deleteAddress.service';
import { updateAddressService } from '@/services/user/updateAddress.service';
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
      const response = await updateUserService(req.body, Number(req.params.id));
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
  async createAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await createAddressService(
        req.body,
        Number(req.params.id),
      );
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await deleteAddressService(
        Number(req.params.id),
        req.body,
      );
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
  async updateAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await updateAddressService(
        req.body,
        Number(req.params.id),
      );
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}
