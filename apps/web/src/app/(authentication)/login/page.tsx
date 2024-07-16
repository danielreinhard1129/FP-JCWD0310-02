'use client';

import useLoginGoogleAuth from '@/hooks/api/auth/useLoginGoogleAuth';
import useLogin from '@/hooks/api/auth/useLogin';

import { useFormik } from 'formik';
import { Route } from 'lucide-react';
import Image from 'next/image';
import logo from '../../../../public/logo-dark.png';

import { useRouter } from 'next/navigation';
import { validationSchema } from './validationSchema';

const Login = () => {
  const { login } = useLogin();
  const router = useRouter();
  const { googleLogin } = useLoginGoogleAuth();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      role: '',
    },
    validationSchema,
    onSubmit: (values) => {
      login(values);
    },
  });
  console.log(formik.values);
  return (
    <div className="h-screen w-screen flex flex-col md:flex-row bg-white ">
      <div className="md:w-1/2 h-full flex justify-center items-center md:block relative">
        <img
          src="/landing_page/img_auth.png"
          alt="Short Pants"
          className="w-full h-full rounded-xl object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent rounded-xl"></div>
        <div className="absolute inset-x-0 top-10 md:top-20 flex justify-center text-3xl md:text-9xl font-bold max-md:hidden">
          <Image src={logo} alt="logo" width={400} height={400} />
        </div>
      </div>
      <div className="md:w-1/2 flex items-center justify-center mx-4 md:mx-0 max-md:absolute max-md:inset-x-0 max-md:top-10 bg-white bg-opacity-80 p-8 rounded-xl shadow-lg">
        <div className="flex flex-col gap-y-5 w-full max-w-md">
          <form
            className="flex flex-col gap-y-7 w-full max-w-md"
            onSubmit={formik.handleSubmit}
          >
            <div className="text-4xl font-bold max-md:text-center">Login</div>
            <div
              className="text-2xl font-semibold cursor-pointer"
              onClick={() => router.replace('/forgotPassword')}
            >
              Forgot your password?
            </div>
            <input
              className="w-full h-12 px-4 py-2.5 rounded-lg border border-neutral-800"
              placeholder="Email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              type="text"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm -my-4">
                {formik.errors.email}
              </div>
            ) : null}
            <input
              className="w-full h-12 px-4 py-2.5 rounded-lg border border-neutral-800"
              placeholder="Password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm -my-5">
                {formik.errors.password}
              </div>
            ) : null}
            <div className="flex items-center"></div>
            <button className="w-full p-4 text-base rounded-lg bg-black text-white font-semibold -mb-3">
              Login
            </button>
            <div className="text-center md:my-2 font-bold max-md:">OR</div>
          </form>
          <button
            type="submit"
            onClick={() => googleLogin()}
            className="w-full p-2.5 text-base rounded-lg border border-black flex items-center justify-center text-black font-semibold"
          >
            <img
              src="/logo/google.png"
              width={32}
              height={32}
              alt="Google logo"
              className="mr-2"
            />
            Sign in with Google
          </button>

          <div className="text-base text-gray-600">
            Not a member?{' '}
            <a
              href="#"
              onClick={() => router.replace('/register')}
              className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out"
            >
              Sign up now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
