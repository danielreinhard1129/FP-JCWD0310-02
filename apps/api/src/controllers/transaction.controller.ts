import { getRajaOngkirService } from '@/services/transaction/getRajaOngkirService';
import { getTransactionService } from '@/services/transaction/getTransactionService';
import { postTransactionPaymentProof } from '@/services/transaction/postTransactionPaymentProof';
import { NextFunction, Request, Response } from 'express';

export class TransactionController {
  async getTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.params.id as string;
      const response = await getTransactionService(params);
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
  async getTransactions(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).send('OK');
    } catch (error) {
      next(error);
    }
  }
  async postTransactionPaymentProof(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const files = req.files as Express.Multer.File[];
      const userId = res.locals.user.id;
      if (!files.length) {
        return res.status(400).send({ message: 'no image uploaded' });
      }
      const response = await postTransactionPaymentProof(
        files[0],
        userId,
        req.body.invoiceNumber,
      );
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
  async getRajaOngkir(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getRajaOngkirService(req.body);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
