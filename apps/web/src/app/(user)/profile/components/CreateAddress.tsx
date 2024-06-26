'use client';

import { Input } from '@/components/ui/input';
import useCreateAddress from '@/hooks/api/user/useCreateAddress';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
interface CreateAddressProps {
  setShowCreateAddress: React.Dispatch<React.SetStateAction<boolean>>;
}
export const CreateAddress = (
  { setShowCreateAddress }: CreateAddressProps,
  id: number,
) => {
  const { createAddress } = useCreateAddress();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: '',
      street: '',
      city: '',
      province: '',
      postalCode: '',
    },
    onSubmit: (values) => {
      createAddress(values);
    },
  });
  const handleBack = () => {
    setShowCreateAddress(false);
  };
  console.log(formik.values);
  return (
    <div className="h-full">
      <div className="flex justify-between ">
        <div className="text-xl font-semibold">Input your Address</div>
        <button
          className="ml-1 bg-black text-white font-medium p-2 rounded-md "
          type="submit"
          onClick={() => handleBack()}
        >
          Back
        </button>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="mt-5 gap-4 flex max-md:flex-col  w-full"
      >
        <div className="flex flex-col gap-y-5  md:w-1/3 ">
          <div>
            <span className="ml-1 text-sm font-semibold">Detail Alamat</span>
            <Input
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
            ></Input>
          </div>
          <div>
            <span className="ml-1 text-sm font-semibold">Street</span>
            <Input
              name="street"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.street}
            ></Input>
          </div>
          <div>
            <span className="ml-1 text-sm font-semibold">Province</span>
            <Input
              name="province"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.province}
            ></Input>
          </div>
        </div>
        <div className="flex flex-col gap-y-5 md:w-1/3 ">
          {' '}
          <div>
            <span className="ml-1 text-sm font-semibold">City</span>
            <Input
              name="city"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.city}
            ></Input>
          </div>
          <div>
            <span className="ml-1 text-sm font-semibold">Postal Code</span>
            <Input
              name="postalCode"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.postalCode}
            ></Input>
          </div>
          <button
            className="mt-4 bg-black text-white font-medium p-2 rounded-md "
            type="submit"
          >
            Add to Address
          </button>
        </div>
      </form>
    </div>
  );
};
