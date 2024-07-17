'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import useWarehousesAdmin from '@/hooks/api/user/useGetAdmins';
import { useFormik } from 'formik';
import Link from 'next/link';
import { User } from '@/app/types/user.type';
import UseUpdateWarehouse from '@/hooks/warehouses/useUpdateWarehouse';
import useUpdateWarehouseAdmin from '@/hooks/warehouses/useUpdateWarehouseAdmin';

interface userArgs {
  id: number;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  password: string;
  employee: {
    ktp: string;
    npwp: string;
    salary: number;
  };
}

const UpdateWarehouseAdminPage = () => {
  const { getWarehousesAdmin } = useWarehousesAdmin();
  const { updateWarehouseAdmin } = useUpdateWarehouseAdmin();
  const [users, setUsers] = useState<userArgs>();
  const path = location.pathname;
  const id = path.split('/').pop();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (id) {
          const response = await getWarehousesAdmin();
          const findUser = response.data.find(
            (userData: userArgs) => userData.id === Number(id),
          );
          if (findUser) {
            setUsers(findUser);
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      firstName: users?.firstName || '',
      lastName: users?.lastName || '',
      email: users?.email || '',
      password: users?.password || '',
      ktp: users?.employee?.ktp || '',
      npwp: users?.employee?.npwp || '',
      salary: users?.employee?.salary || 0,
    },
    onSubmit: (values) => {
      updateWarehouseAdmin(values, Number(id));
    },
    enableReinitialize: true,
    //belum ada edit
  });

  return (
    <div className="px-4 py-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>Update Admin</CardTitle>
            <Link href="/admin/manage-data">
              <Button>Back</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div
            className="relative overflow-y-auto text-sm md:mt-8 md:h-[380px]"
            style={{ scrollbarWidth: 'none' }}
          >
            <form onSubmit={formik.handleSubmit} className="mt-5 w-full">
              <div className="w-full flex max-md:flex-col gap-4">
                <div className="flex flex-col gap-y-5 md:w-1/3">
                  <div>
                    <span className="ml-1 text-sm font-semibold">
                      First Name
                    </span>
                    <Input
                      name="firstName"
                      type="text"
                      onChange={formik.handleChange}
                      defaultValue={users?.firstName}
                    />
                  </div>
                  <div>
                    <span className="ml-1 text-sm font-semibold">
                      Last Name
                    </span>
                    <Input
                      name="lastName"
                      type="text"
                      onChange={formik.handleChange}
                      defaultValue={users?.lastName}
                    />
                  </div>
                  <div>
                    <span className="ml-1 text-sm font-semibold">Email</span>
                    <Input
                      name="email"
                      type="email"
                      onChange={formik.handleChange}
                      defaultValue={users?.email}
                    />
                  </div>
                  <div>
                    <span className="ml-1 text-sm font-semibold">Password</span>
                    <Input
                      name="password"
                      type="password"
                      onChange={formik.handleChange}
                      defaultValue={users?.password}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-y-5 md:w-1/3">
                  <div>
                    <span className="ml-1 text-sm font-semibold">No Ktp</span>
                    <Input
                      name="ktp"
                      type="text"
                      onChange={formik.handleChange}
                      defaultValue={users?.employee?.ktp}
                    />
                  </div>
                  <div>
                    <span className="ml-1 text-sm font-semibold">NPWP</span>
                    <Input
                      name="npwp"
                      type="text"
                      onChange={formik.handleChange}
                      defaultValue={users?.employee?.npwp}
                    />
                  </div>
                  <div>
                    <span className="ml-1 text-sm font-semibold">Salary</span>
                    <Input
                      name="salary"
                      type="number"
                      onChange={formik.handleChange}
                      defaultValue={users?.employee?.salary}
                    />
                  </div>
                  <button
                    className="mt-4 bg-black text-white font-medium p-2 rounded-md"
                    type="submit"
                  >
                    Update Admin
                  </button>
                </div>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateWarehouseAdminPage;
