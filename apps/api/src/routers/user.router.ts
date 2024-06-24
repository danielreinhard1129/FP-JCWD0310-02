import { UserController } from '@/controllers/user.controller';
import { verifyToken } from '@/lib/jwt';
import { Router } from 'express';

export class UserRouter {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/geolocation', this.userController.createAddress);
    this.router.get('/:id', this.userController.getUser);
    this.router.post(
      '/update/:id',
      verifyToken,
      this.userController.updateUser,
    );
  }
  getRouter(): Router {
    return this.router;
  }
}
