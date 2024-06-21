'use client';

import { User } from '@/app/types/user.type';
import { Input } from '@/components/ui/input';
import useGetUser from '@/hooks/api/user/useGetUser';
import useUpdateUser from '@/hooks/api/user/useUpdateUser';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
interface userArgs extends User {
  password: string;
  email: string;
  profileImageUrl: string;
}

const ProfilePage = () => {
  const { updateUser } = useUpdateUser();
  const { getUser } = useGetUser();
  const [user, setUser] = useState<userArgs>({} as userArgs);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const received = {
          id: 0,
          email: '',
          firstName: '',
          isVerify: '',
          password: '',
          profileImageUrl: '',
          role: '',
        };
        const response = await getUser(received);
        setUser(response);
        console.log(response);
      } catch (error) {}
    };
    fetchUser();
  }, []);
  const formik = useFormik({
    initialValues: {
      password: user.password,
      email: user.email,
      firstName: user.firstName,
      profileImageUrl: user.profileImageUrl,
    },
    onSubmit: (values) => {
      updateUser(values);
    },
  });
  //   const{}=useAppSelector((state)=>state.user)

  return (
    <div className=" h-full">
      <div className="text-3xl">Profile</div>
      <form
        className="flex max-md:flex-col gap-10 mt-11 max-md:items-center"
        onSubmit={formik.handleSubmit}
      >
        <div className="w-80 border-4 border-gray-300 rounded-lg shadow-lg max-h-72 flex flex-col justify-center items-center p-4">
          <img
            src={user.profileImageUrl}
            className="w-40 h-40 rounded-sm shadow-md"
            alt="Profile Image"
          />
          <div className="text-center mt-4 text-gray-600 bg-gray-50 p-2">
            <input type="file" id="fileInput" className="hidden" />
            <label htmlFor="fileInput" className="cursor-pointer">
              <p className="text-sm">
                Upload a new avatar, larger image will be resized automatically
              </p>
              <p className="text-sm font-semibold">
                Maximum upload size is <b>1 MB</b>
              </p>
            </label>
          </div>
        </div>
        <div className="md:w-2/3 max-md:w-80 border-4 p-4 flex flex-col gap-y-4 text-black  font-normal border-gray-300 rounded-lg shadow-lg">
          <div>
            <span className="ml-1 text-sm font-semibold">First Name</span>
            <Input
              name="firstName"
              type="text"
              defaultValue={user.firstName}
              onChange={formik.handleChange}
              //   value={formik.values.firstName}
            ></Input>
          </div>
          <div>
            <span className="ml-1 text-sm font-semibold">Email</span>
            <Input
              name="email"
              type="email"
              defaultValue={user.email}
              onChange={formik.handleChange}
              //   value={formik.values.email}
            ></Input>
          </div>
          <div>
            <span className="ml-1 text-sm font-semibold">Password</span>
            <Input
              name="password"
              type="password"
              defaultValue={user.password}
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
  );
};
export default ProfilePage;
