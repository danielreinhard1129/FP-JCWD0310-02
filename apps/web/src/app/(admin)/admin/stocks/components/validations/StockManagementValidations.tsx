import { number, object } from 'yup';

export const RequestStocksValidations = object({
  toWarehouse: number().required('Something is error with to Warehouse Data'),
  quantity: number()
    .required('Quantity is required')
    .min(5, 'Minimum requested quantity is 5'),
  warehouseFrom: number()
    .required('Warehouse from is required')
    .min(1, 'Warehouse cannot be empty'),
  variant: number()
    .required('Variant cannot be empty')
    .min(1, 'Variant cannot be empty'),
});

export const AddStocksValidations = object({
  toWarehouse: number().required('Something is error with to Warehouse Data'),
  quantity: number()
    .required('Quantity is required')
    .min(5, 'Minimum requested quantity is 5'),
  variant: number()
    .required('Variant cannot be empty')
    .min(1, 'Variant cannot be empty'),
});
