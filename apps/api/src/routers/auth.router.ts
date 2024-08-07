import { Router } from 'express';

import { AuthController } from '@/controllers/auth.controller';
import { verifyToken } from '@/lib/jwt';

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
    this.router.post(
      '/verify',
      verifyToken,
      this.authController.verifyController,
    );
    this.router.post('/register', this.authController.registerController);
    this.router.post(
      '/login/google',

      this.authController.loginGoogleController,
    );
    this.router.post(
      '/register/google',
      this.authController.registerGoogleController,
    );
    this.router.post(
      '/verify-email',
      this.authController.verifyEmailController,
    );
    this.router.post(
      '/reset-password',
      this.authController.resetPaswwordController,
    );
  }
  getRouter(): Router {
    return this.router;
  }
}
