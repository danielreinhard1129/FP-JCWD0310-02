'use client';

import useLoginGoogleAuth from '@/hooks/api/auth/useLoginGoogleAuth';
import useLogin from '@/hooks/api/auth/useLogin';

import { useFormik } from 'formik';

const Login = () => {
  const { login } = useLogin();
  const { googleLogin } = useLoginGoogleAuth();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      role: '',
    },
    onSubmit: (values) => {
      login(values);
    },
  });
  return (
    <div className="h-screen w-screen flex flex-col md:flex-row bg-white ">
      <div className="md:w-1/2 h-full flex justify-center items-center md:block relative">
        <img
          src="/landing_page/img _auth.png"
          alt="Short Pants"
          className="w-full h-full rounded-xl object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent rounded-xl"></div>
        <div className="absolute text-3xl md:text-9xl text-center inset-0 top-10 md:top-20 font-bold max-md:hidden">
          LOGO
        </div>
      </div>
      <div className="md:w-1/2 flex items-center justify-center max-md:absolute max-md:mt-10 max-md:mx-10">
        <div className="flex flex-col gap-y-5 w-full max-w-md">
          <form
            className="flex flex-col gap-y-7 w-full max-w-md"
            onSubmit={formik.handleSubmit}
          >
            <div className="text-4xl font-bold max-md:text-center">Login</div>
            <div className="text-2xl font-semibold">Forgot your password?</div>
            <input
              className="w-full h-12 px-4 py-2.5 rounded-lg border border-neutral-800"
              placeholder="Email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              type="text"
            />
            <input
              className="w-full h-12 px-4 py-2.5 rounded-lg border border-neutral-800"
              placeholder="Password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <div className="flex items-center">
              <input type="checkbox" className="w-4 h-4 mr-4 p-2" />
              <div className="max-md:text-sm">
                <span>Make sure the account you are using is correct</span>
                <br />
                <span>applies to all login options below. More info.</span>
              </div>
            </div>
            <button className="w-full p-4 text-base rounded-lg bg-black text-white font-semibold">
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
        </div>
      </div>
    </div>
  );
};

export default Login;
