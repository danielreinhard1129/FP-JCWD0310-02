'use client';
import React, { useEffect, useState } from 'react';
import { User } from '@/app/types/user.type';
import { Input } from '@/components/ui/input';
import useGetUser from '@/hooks/api/user/useGetUser';
import useUpdateUser from '@/hooks/api/user/useUpdateUser';
import { useFormik } from 'formik';
import { ProfileAddress } from './components/ProfileAddress';
import { BASE_API_URL } from '@/utils/config';

interface userArgs extends User {
  email: string;
  profileImageUrl: string[];
}

const ProfilePage = () => {
  const { updateUser } = useUpdateUser();
  const { getUser } = useGetUser();

  const [imagePreviewUrl, setImagePreviewUrl] = useState<string[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const received = {
          id: 0,
          email: '',
          firstName: '',
          isVerify: '',
          profileImageUrl: [],
          role: '',
        };
        const response = await getUser(received);

        formik.setValues(response);
        console.log(response.profileImageUrl);
      } catch (error) {}
    };
    fetchUser();
  }, []);

  const formik = useFormik({
    initialValues: {
      password: '',
      email: '',
      firstName: '',
      profileImageUrl: [],
    },
    onSubmit: (values) => {
      updateUser(values);
    },
  });
  console.log(formik.values);
  console.log(typeof formik.values.profileImageUrl);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const fileURLs = fileArray.map((file) => URL.createObjectURL(file));
      setImagePreviewUrl(fileURLs);
      formik.setFieldValue('profileImageUrl', fileArray);
    }
  };
  const googleImage = formik.values.profileImageUrl.toString();

  return (
    <div className="md:h-full flex flex-col">
      <div className="h-3/5">
        <div className="text-3xl">Profile</div>
        <form
          className="flex max-md:flex-col gap-10 mt-11 max-md:items-center"
          onSubmit={formik.handleSubmit}
        >
          <div className="w-80 border-4 border-gray-300 rounded-lg shadow-lg max-h-72 flex flex-col justify-center items-center p-4">
            <img
              src={
                imagePreviewUrl.length > 0
                  ? imagePreviewUrl[0]
                  : googleImage.includes('google')
                    ? googleImage
                    : `${BASE_API_URL}/assets${formik.values.profileImageUrl}`
              }
              className="w-40 h-40 rounded-sm shadow-md"
            />

            <div className="text-center mt-4 text-gray-600 bg-gray-50 p-2">
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleFileChange}
                multiple
              />
              <label htmlFor="fileInput" className="cursor-pointer">
                <p className="text-sm">
                  Upload a new avatar, larger images will be resized
                  automatically
                </p>
                <p className="text-sm font-semibold">
                  Maximum upload size is <b>1 MB</b>
                </p>
              </label>
            </div>
          </div>
          <div className="md:w-full max-md:w-80 border-4 p-4 flex flex-col gap-y-4 text-black font-normal border-gray-300 rounded-lg shadow-lg">
            <div>
              <span className="ml-1 text-base font-semibold">First Name</span>
              <Input
                name="firstName"
                type="text"
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <span className="ml-1 text-base font-semibold">Email</span>
              <Input
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
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
      <div className="flex justify-center items-center h-1/2">
        <ProfileAddress />
      </div>
    </div>
  );
};

export default ProfilePage;
{
  /* <img
              src={
                imagePreviewUrl.length > 0
                  ? imagePreviewUrl[0]
                  : `${BASE_API_URL}/assets${formik.values.profileImageUrl}`
              }
              className="w-40 h-40 rounded-sm shadow-md"
              alt="Profile Image"
            /> */
}
{
  /* {imagePreviewUrl.map((url, index) => (
              <img
                key={index}
                src={url}
                className="w-40 h-40 rounded-sm shadow-md mb-2"
                alt={`Profile ${index}`}
              />
            ))} */
}
{
  /* {imagePreviewUrl.map((url, index) => (
              <img
                key={index}
                src={url}
                src={`${BASE_API_URL}/assets${formik.values.profileImageUrl}`}
                className="w-40 h-40 rounded-sm shadow-md mb-2"
                alt={`Profile ${index}`}
              />
            ))} */
}
{
  /* <img
              // src={`${BASE_API_URL}/assets/${val}`}
              // src={`${BASE_API_URL}/assets${formik.values.profileImageUrl}`}
              className="w-40 h-40 rounded-sm shadow-md"
              alt="Profile Image"
            /> */
}
