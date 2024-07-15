'use client';
import React from 'react';

import useRegister from '@/hooks/api/auth/useRegister';
import { useFormik } from 'formik';
import useRegisterGoogleAuth from '@/hooks/api/auth/useRegisterGoogleAuth';
import Image from 'next/image';
import logo from '../../../../public/logo-dark.png';
import { validationSchema } from './validationSchema';

const Register = () => {
  const { register } = useRegister();
  const { googleRegister } = useRegisterGoogleAuth();
  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      role: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      register(values);
    },
  });
  return (
    <div className="h-screen w-screen flex bg-white">
      <div className="md:w-1/2 h-full flex justify-center items-center md:block relative">
        <div className="relative h-full">
          <img
            src="/landing_page/img_auth.png"
            alt="Short Pants"
            className="w-full h-full rounded-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent rounded-xl"></div>
          <div className="absolute inset-x-0 top-10 md:top-20 flex justify-center text-3xl md:text-9xl font-bold max-md:hidden">
            <Image src={logo} alt="logo" width={400} height={400} />
          </div>
        </div>
      </div>
      <div className="md:w-1/2 flex items-center justify-center max-md:absolute max-md:mx-10 ">
        <div className="flex flex-col">
          <form
            className="flex flex-col gap-y-4 md:w-[480px]"
            onSubmit={formik.handleSubmit}
          >
            <div className="text-4xl font-bold max-md:text-center">
              Register
            </div>

            <div className="text-xl font-bold md:my-2">Your Name</div>
            <input
              className="w-full md:max-w-md h-12 px-4 py-2.5 rounded-lg border border-neutral-800"
              placeholder="First Name"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              name="firstName"
              type="text"
            />
            <input
              className="w-full md:max-w-md h-12 px-4 py-2.5 rounded-lg border border-neutral-800"
              placeholder="Last Name"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              name="lastName"
              type="text"
            />
            <div className="text-xl font-bold md:my-2">Login Details</div>
            <input
              className="w-full md:max-w-md h-12 px-4 py-2.5 rounded-lg border border-neutral-800"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email"
              type="email"
            />
            <input
              className="w-full md:max-w-md h-12 px-4 py-2.5 rounded-lg border border-neutral-800"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
              name="password"
              type="password"
            />
            <div className="flex items-center">
              <input type="checkbox" className="w-4 h-4 mr-4 p-2" />
              <div className="max-md:text-sm">
                <span>Make sure the account you are using is correct</span>
                <br />
                <span>applies to all login options below. More info.</span>
              </div>
            </div>
            <button className="w-full p-4 text-base rounded-lg mt-2 bg-black text-white font-semibold">
              Register
            </button>
            <div className="text-center md:my-2 font-bold max-md:">OR</div>
          </form>
          <button
            type="submit"
            onClick={() => googleRegister()}
            className="w-full p-2.5 text-base rounded-lg border border-black flex items-center justify-center text-black font-semibold"
          >
            <img
              src="/logo/google.png"
              width="32"
              height="32"
              alt="Google logo"
              className="mr-2"
            />
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
