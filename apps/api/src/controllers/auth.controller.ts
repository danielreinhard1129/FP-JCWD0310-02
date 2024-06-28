import { Request, Response, NextFunction } from 'express';
import { loginService } from '../services/auth/login.service';
import { registerService } from '@/services/auth/register.service';
import { loginGoogleService } from '@/services/auth/logingoogle.service';
import { registerGoogleService } from '@/services/auth/registerGoogle.service';
import { authVerifyService } from '@/services/auth/authVerify.service';
import { verifyEmail } from '@/services/auth/authVerifyEmail.service';
import { resetPassword } from '@/services/auth/resetPassword.service';

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
  async verifyController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authVerifyService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async verifyEmailController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await verifyEmail(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async resetPaswwordController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await resetPassword(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
