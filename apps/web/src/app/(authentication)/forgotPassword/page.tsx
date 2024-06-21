'use client';
import useVerifyEmail from '@/hooks/api/auth/useVerifyEmail';
import { useFormik } from 'formik';

const verify = () => {
  const { verifyEmail } = useVerifyEmail();
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: (values) => {
      verifyEmail(values);
    },
  });
  console.log(formik.values);
  return (
    <>
      <div className="flex flex-col h-screen w-screen justify-center items-center">
        <form
          className="w-1/4 flex flex-col gap-y-8"
          onSubmit={formik.handleSubmit}
        >
          <div className="text-3xl text-center text-semibold">
            Verify your email
          </div>
          <div className="text-xl text-semibold">Input your Email</div>
          <input
            className="w-full h-12 px-4 py-2.5 rounded-lg border border-neutral-800"
            type="email"
            name="email"
            placeholder="Input your email"
            onChange={formik.handleChange}
            value={formik.values.email}
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
