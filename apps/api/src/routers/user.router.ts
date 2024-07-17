import { UserController } from '@/controllers/user.controller';
import { verifyToken } from '@/lib/jwt';
import { uploader } from '@/lib/uploader';
import { Router } from 'express';

export class UserRouter {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.initializeRoutes();
  }
  // getUserAddress
  private initializeRoutes(): void {
    this.router.get('/geolocation', this.userController.createAddress);
    this.router.get('/get-admin', this.userController.getAdmin);
    this.router.get('/getUsers', this.userController.getUsers);
    this.router.get(
      '/get-users-address/:id',
      this.userController.getUserAddress,
    );
    this.router.get('/get-employes', this.userController.getEmployes);
    this.router.put('/update-employe/:id', this.userController.updateEmploye);
    this.router.get('/provinces', this.userController.getAddress);
    this.router.get('/:id', this.userController.getUser);
    this.router.put(
      '/update/:id',
      uploader('IMG', '/images').array('images'),
      this.userController.updateUser,
    );
    this.router.post(`/createAddress/:id`, this.userController.createAddress);
    this.router.delete(`/deleteAddress/:id`, this.userController.deleteAddress);
    this.router.post('/updateAddress/:id', this.userController.updateAddress);
  }

  getRouter(): Router {
    return this.router;
  }
}
