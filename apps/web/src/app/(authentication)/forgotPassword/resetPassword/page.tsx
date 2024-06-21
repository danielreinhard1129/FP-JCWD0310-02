'use client';
import useResetPassword from '@/hooks/api/auth/useResetPassword';
import useVerifyToken from '@/hooks/api/auth/useVerifyToken';
import { useFormik } from 'formik';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

const verify = () => {
  const { resetPassword } = useResetPassword();
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    onSubmit: (values) => {
      resetPassword(values);
    },
  });
  return (
    <>
      <div className="flex flex-col h-screen w-screen justify-center items-center">
        <form
          className="w-1/4 flex flex-col gap-y-8"
          onSubmit={formik.handleSubmit}
        >
          <div className="text-3xl text-center text-semibold">
            Update your password
          </div>
          <div className="text-xl text-semibold">Input your password</div>
          <input
            className="w-full h-12 px-4 py-2.5 rounded-lg border border-neutral-800"
            type="password"
            name="password"
            placeholder="Input your password"
            onChange={formik.handleChange}
            value={formik.values.password}
          ></input>
          <button
            className="p-4 w-full bg-black text-white rounded-lg"
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
    </>
  );
};
export default verify;
