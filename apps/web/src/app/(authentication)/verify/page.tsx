'use client';
import useVerifyToken from '@/hooks/api/auth/useVerivyToken';
import { useFormik } from 'formik';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

const verify = () => {
  const { verifyToken } = useVerifyToken();
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    onSubmit: (values) => {
      verifyToken(values);
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
            Verivy your email
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
            verify
          </button>
        </form>
      </div>
    </>
  );
};
export default verify;
