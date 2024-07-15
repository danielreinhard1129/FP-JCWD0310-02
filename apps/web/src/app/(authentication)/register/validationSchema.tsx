import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  email: Yup.string().required('email is required').email(),
  password: Yup.string().required('password is required'),
  firstName: Yup.string().required('firstName is required'),
});
