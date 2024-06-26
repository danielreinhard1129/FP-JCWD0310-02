'use client';

import { Input } from '@/components/ui/input';
import useUpdateAddress from '@/hooks/api/user/useEditAddress';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
interface Address {
  id: number;
  name: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  isPrimary: boolean;
}

interface EditAddressProps {
  setShowEditAddress: (value: boolean) => void;
  addressId: Address;
}

export const EditAddress = ({
  setShowEditAddress,
  addressId,
}: EditAddressProps) => {
  const router = useRouter();
  const { updateAddress } = useUpdateAddress();
  const formik = useFormik({
    initialValues: {
      name: addressId.name,
      street: addressId.street,
      city: addressId.city,
      province: addressId.province,
      postalCode: addressId.postalCode,
      isPrimary: false,
    },
    onSubmit: (values) => {
      updateAddress(values);
    },
  });
  console.log(formik.values);
  const handleBack = () => {
    setShowEditAddress(false);
  };

  return (
    <div className="h-full">
      <div className="flex justify-between ">
        <div className="text-xl font-semibold">Edit your Address</div>
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
              defaultValue={addressId.name}
              className="text-gray-600"
            ></Input>
          </div>
          <div>
            <span className="ml-1 text-sm font-semibold">Street</span>
            <Input
              name="street"
              type="text"
              onChange={formik.handleChange}
              defaultValue={addressId.street}
              className="text-gray-600"
            ></Input>
          </div>
          <div>
            <span className="ml-1 text-sm font-semibold">Province</span>
            <Input
              name="province"
              type="text"
              onChange={formik.handleChange}
              defaultValue={addressId.province}
              className="text-gray-600"
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
              defaultValue={addressId.city}
              className="text-gray-600"
            ></Input>
          </div>
          <div>
            <span className="ml-1 text-sm font-semibold">Postal Code</span>
            <Input
              name="postalCode"
              type="text"
              onChange={formik.handleChange}
              defaultValue={addressId.postalCode}
              className="text-gray-600"
            ></Input>
          </div>
          <button
            className="mt-4 bg-black text-white font-medium p-2 rounded-md "
            type="submit"
          >
            Edit to Address
          </button>
        </div>
      </form>
    </div>
  );
};
