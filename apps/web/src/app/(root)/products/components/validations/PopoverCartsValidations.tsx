import { number, object, string } from 'yup';
export const popOverCartsValidations = object({
  quantity: number()
    .required('Quantity cannot be empty or zero')
    .min(1, 'Quantity minimum is 1'),
  variantId: number()
    .required('Variant cannot be empty')
    .min(1, 'Variant cannot be empty'),
});
