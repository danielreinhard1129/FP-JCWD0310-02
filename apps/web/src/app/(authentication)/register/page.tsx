'use client';
import React from 'react';

import useRegister from '@/hooks/api/auth/useRegister';
import { useFormik } from 'formik';
import useRegisterGoogleAuth from '@/hooks/api/auth/useRegisterGoogleAuth';
import Image from 'next/image';
import logo from '../../../../public/logo-dark.png';
import { validationSchema } from './validationSchema';
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
    // validationSchema,
    onSubmit: (values) => {
      register(values);
    },
  });
  // return (
  //   <div className="h-screen w-screen flex bg-white">
  //     <div className="md:w-1/2 h-full flex justify-center items-center md:block relative">
  //       <div className="relative h-full">
  //         <img
  //           src="/landing_page/img_auth.png"
  //           alt="Short Pants"
  //           className="w-full h-full rounded-xl"
  //         />
  //         <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent rounded-xl"></div>
  //         <div className="absolute inset-x-0 top-10 md:top-20 flex justify-center text-3xl md:text-9xl font-bold max-md:hidden">
  //           <Image src={logo} alt="logo" width={400} height={400} />
  //         </div>
  //       </div>
  //     </div>
  //     <div className="md:w-1/2 flex items-center justify-center max-md:absolute max-md:mx-10 ">
  //       <div className="flex flex-col">
  //         <form
  //           className="flex flex-col gap-y-4 md:w-[480px]"
  //           onSubmit={formik.handleSubmit}
  //         >
  //           <div className="text-4xl font-bold max-md:text-center">
  //             Register
  //           </div>

  //           <div className="text-xl font-bold md:my-2">Your Name</div>
  //           <input
  //             className="w-full md:max-w-md h-12 px-4 py-2.5 rounded-lg border border-neutral-800"
  //             placeholder="First Name"
  //             onChange={formik.handleChange}
  //             value={formik.values.firstName}
  //             name="firstName"
  //             type="text"
  //           />
  //           <input
  //             className="w-full md:max-w-md h-12 px-4 py-2.5 rounded-lg border border-neutral-800"
  //             placeholder="Last Name"
  //             onChange={formik.handleChange}
  //             value={formik.values.lastName}
  //             name="lastName"
  //             type="text"
  //           />
  //           <div className="text-xl font-bold md:my-2">Login Details</div>
  //           <input
  //             className="w-full md:max-w-md h-12 px-4 py-2.5 rounded-lg border border-neutral-800"
  //             placeholder="Email"
  //             onChange={formik.handleChange}
  //             value={formik.values.email}
  //             name="email"
  //             type="email"
  //           />
  //           <input
  //             className="w-full md:max-w-md h-12 px-4 py-2.5 rounded-lg border border-neutral-800"
  //             placeholder="Password"
  //             onChange={formik.handleChange}
  //             value={formik.values.password}
  //             name="password"
  //             type="password"
  //           />

  //           <button
  //             type="submit"
  //             className="w-full p-4 text-base rounded-lg mt-2 bg-black text-white font-semibold"
  //           >
  //             Register
  //           </button>
  //           <div className="text-center md:my-2 font-bold max-md:">OR</div>
  //         </form>
  //         <button
  //           type="submit"
  //           onClick={() => googleRegister()}
  //           className="w-full p-2.5 text-base rounded-lg border border-black flex items-center justify-center text-black font-semibold"
  //         >
  //           <img
  //             src="/logo/google.png"
  //             width="32"
  //             height="32"
  //             alt="Google logo"
  //             className="mr-2"
  //           />
  //           Sign up with Google
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row bg-white">
      <div className="md:w-1/2 h-full flex justify-center items-center relative">
        <div className="relative h-full w-full">
          <img
            src="/landing_page/img_auth.png"
            alt="Short Pants"
            className="w-full h-full object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent rounded-xl"></div>

          <div className="absolute inset-x-0 top-10 md:top-20 md:flex justify-center text-3xl md:text-9xl font-bold hidden">
            <Image src={logo} alt="logo" width={400} height={400} />
          </div>
        </div>
      </div>
      <div className="md:w-1/2 flex items-center justify-center mx-4 md:mx-0 max-md:absolute max-md:inset-x-0 max-md:top-10 bg-white bg-opacity-80 p-8 rounded-xl shadow-lg ">
        <div className="flex flex-col w-full max-w-md">
          <form
            className="flex flex-col gap-y-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="text-4xl font-bold text-center md:text-left">
              Register
            </div>
            <div className="text-xl font-bold md:my-2">Your Name</div>
            <input
              className="w-full h-12 px-4 py-2.5 rounded-lg border border-neutral-800"
              placeholder="First Name"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              onBlur={formik.handleBlur}
              name="firstName"
              type="text"
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="text-red-500 text-sm -my-4">
                {formik.errors.firstName}
              </div>
            ) : null}
            <input
              className="w-full h-12 px-4 py-2.5 rounded-lg border border-neutral-800"
              placeholder="Last Name"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              onBlur={formik.handleBlur}
              name="lastName"
              type="text"
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="text-red-500 text-sm -my-4">
                {formik.errors.lastName}
              </div>
            ) : null}
            <div className="text-xl font-bold md:my-2">Login Details</div>
            <input
              className="w-full h-12 px-4 py-2.5 rounded-lg border border-neutral-800"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              name="email"
              type="email"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm -my-4">
                {formik.errors.email}
              </div>
            ) : null}
            <input
              className="w-full h-12 px-4 py-2.5 rounded-lg border border-neutral-800"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              name="password"
              type="password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm -my-4">
                {formik.errors.password}
              </div>
            ) : null}
            <button
              className="w-full p-4 text-base rounded-lg mt-2 bg-black text-white font-semibold"
              type="submit"
            >
              Register
            </button>
            <div className="text-center my-2 font-bold">OR</div>
          </form>
          <button
            type="button"
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
