import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  email: Yup.string().email('Email is invalid').required('Email is required'),
  firstName: Yup.string()
    .min(2, 'First Name must be at least 2 characters')
    .required('First Name is required'),
  lastName: Yup.string()
    .min(2, 'Last Name must be at least 2 characters')
    .required('Last Name is required'),

  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});
