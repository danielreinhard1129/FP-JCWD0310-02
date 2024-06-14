import { Router } from 'express';

import { AuthController } from '@/controllers/auth.controller';
import { verifyToken } from '@/lib/jswt';

export class AuthRouter {
  private router: Router;
  private authController: AuthController;
  constructor() {
    this.authController = new AuthController();
    this.router = Router();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.router.post(
      '/login',

      this.authController.loginController,
    );
    this.router.post('/register', this.authController.registerController);
    // this.router.post('/keeplogin', this.authController.keeploginController);
  }
  getRouter(): Router {
    return this.router;
  }
}
