import { Request, Response, NextFunction } from 'express';
import { loginService } from '../services/auth/login.service';
import { registerService } from '@/services/auth/register.service';
import { keeploginService } from '@/services/auth/keep-login.service';

export class AuthController {
  async loginController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await loginService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async registerController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await registerService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async keeploginController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await keeploginService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
