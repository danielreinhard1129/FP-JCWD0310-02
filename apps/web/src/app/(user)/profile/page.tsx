'use client';
import React from 'react';
import { User } from '@/app/types/user.type';
import { Input } from '@/components/ui/input';
import useGetUser from '@/hooks/api/user/useGetUser';
import useUpdateUser from '@/hooks/api/user/useUpdateUser';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { ProfileAddress } from './components/ProfileAddress';
interface userArgs extends User {
  email: string;
  profileImageUrl: string;
}

const ProfilePage = () => {
  const { updateUser } = useUpdateUser();
  const { getUser } = useGetUser();
  const [user, setUser] = useState<userArgs>({} as userArgs);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const received = {
          id: 0,
          email: '',
          firstName: '',
          isVerify: '',
          profileImageUrl: '',
          role: '',
        };
        const response = await getUser(received);
        formik.setValues(response);
        console.log(response);
      } catch (error) {}
    };
    fetchUser();
  }, []);
  const formik = useFormik({
    initialValues: {
      password: '',
      email: '',
      firstName: '',
      profileImageUrl: '',
    },
    onSubmit: (values) => {
      updateUser(values);
    },
  });
  console.log(formik.values);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      // setImagePreviewUrl(url);
      formik.setFieldValue('profileImageUrl', url);
    }
  };

  return (
    <div className=" md:h-full flex flex-col ">
      <div className="h-3/5">
        {' '}
        <div className="text-3xl ">Profile</div>
        <form
          className="flex max-md:flex-col gap-10 mt-11 max-md:items-center"
          onSubmit={formik.handleSubmit}
        >
          <div className="w-80 border-4 border-gray-300 rounded-lg shadow-lg max-h-72 flex flex-col justify-center items-center p-4">
            <img
              // src={imagePreviewUrl}
              src={formik.values.profileImageUrl}
              className="w-40 h-40 rounded-sm shadow-md"
            />
            <div className="text-center mt-4 text-gray-600 bg-gray-50 p-2">
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleFileChange}
                // value={formik.values.profileImageUrl}
              />
              <label htmlFor="fileInput" className="cursor-pointer">
                <p className="text-sm">
                  Upload a new avatar, larger image will be resized
                  automatically
                </p>
                <p className="text-sm font-semibold">
                  Maximum upload size is <b>1 MB</b>
                </p>
              </label>
            </div>
          </div>
          <div className="md:w-full max-md:w-80 border-4 p-4 flex flex-col gap-y-4 text-black  font-normal border-gray-300 rounded-lg shadow-lg">
            <div>
              <span className="ml-1 text-base font-semibold">First Name</span>
              <Input
                name="firstName"
                type="text"
                defaultValue={formik.values.firstName}
                onChange={formik.handleChange}
                //   value={formik.values.firstName}
              ></Input>
            </div>
            <div>
              <span className="ml-1 text-base font-semibold">Email</span>
              <Input
                name="email"
                type="email"
                defaultValue={formik.values.email}
                onChange={formik.handleChange}
                //   value={formik.values.email}
              ></Input>
            </div>
            <div>
              <span className="ml-1 text-base font-semibold">Password</span>
              <Input
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                //   value={formik.values.password}
              ></Input>
            </div>
            <button
              className="ml-1 bg-black text-white font-medium p-2 rounded-md mt-4 mx-auto"
              type="submit"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>

      <div className="flex justify-center items-center h-1/2  ">
        {/* <div className="w-full h-full max mt-8 max-md:w-80 border-4 p-4 flex flex-col gap-y-4 text-black font-normal border-gray-300 rounded-lg shadow-lg">
          <div className="flex justify-between">
            <div className="text-xl">Address</div>
            <button
              className="ml-1 bg-black text-white font-medium p-2 rounded-md "
              type="submit"
            >
              Add Address
            </button>
          </div>
          <div>input</div>
        </div> */}
        <ProfileAddress />
      </div>
    </div>
  );
};
export default ProfilePage;
