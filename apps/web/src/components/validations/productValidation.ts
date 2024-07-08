import { array, number, object, string } from 'yup';

const productValidation = object({
  product: object({
    description: string()
      .required('Product description is required!')
      .min(20, 'Product description minimal is 20'),
    name: string()
      .required('Product name is required!')
      .min(3, 'Product name minimal is 3'),
    price: number()
      .required('Product price is required!')
      .min(50000, 'Product price minimum is Rp.50.000,00'),
  }),
  category: array()
    .of(string().min(3, 'Product category minimum length is 3!'))
    .optional(),
  image: array()
    .required('Product image is required!')
    .min(1, 'Product image is required!'),
  variant: array()
    .of(
      object().shape({
        color: string().required('Variant color cannot be empty!'),
        size: string().required('Variant size cannot be empty'),
      }),
    )
    .required('Product variant is required!')
    .min(1, 'Product variant minimum is 1'),
  warehouse: number().required('Something is error with your admin data!'),
});
export default productValidation;
