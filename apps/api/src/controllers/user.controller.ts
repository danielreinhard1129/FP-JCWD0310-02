import { NextFunction, Request, Response } from 'express';
import { userService } from '../services/user/getUser.service';
import { updateUser } from '@/services/user/updateUser.service';
import axios from 'axios';
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
  async createAddress(req: Request, res: Response, next: NextFunction) {
    const OPEN_CAGE_API_KEY = '30d89911e50c41329178651b1a706345';
    try {
      const response = await axios.get(
        'https://api.opencagedata.com/geocode/v1/json',
        {
          params: {
            // q: `${city}, ${province}`,
            q: `Cirebon,Jawa Barat`,
            key: OPEN_CAGE_API_KEY,
          },
        },
      );
      console.log('ini response data' + response.data);
      console.log(
        'ini response data results[0].geometry' +
          response.data.results[0].geometry,
      );
      res.status(200).send(response.data.results[0].geometry.lat);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Terjadi kesalahan saat mengambil data geolokasi' });
    }
  }
}
