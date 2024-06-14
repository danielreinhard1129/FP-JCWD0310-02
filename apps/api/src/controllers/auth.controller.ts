import { Request, Response, NextFunction } from 'express';
import { loginService } from '../services/auth/login.service';
import { registerService } from '@/services/auth/register.service';
import { loginGoogleService } from '@/services/auth/logingoogle.service';
import { registerGoogleService } from '@/services/auth/registerGoogle.service';

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
  async loginGoogleController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await loginGoogleService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async registerGoogleController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await registerGoogleService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
