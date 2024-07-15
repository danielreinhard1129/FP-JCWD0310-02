import { check, query, param, body } from 'express-validator';
import { validatorErrorHandler } from './errorHandler';

const addProduct = [
  body('product', 'Errors')
    .custom((val) => true)
    .withMessage('Something is error')
    .bail(),
];

export const productValidation: any = {
  add: [addProduct, validatorErrorHandler],
};
