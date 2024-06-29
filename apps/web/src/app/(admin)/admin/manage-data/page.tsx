'use client';
import { useEffect, useState } from 'react';
import useWarehousesAdmin from '@/hooks/api/user/useGetAdmins';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { FilePenLine, Trash2 } from 'lucide-react';
import useDeleteWarehouseAdmin from '@/hooks/warehouses/useDeleteWarehouseAdmin';
import UpdateWarehouseAdminPage from './edit/page';
import { useRouter } from 'next/navigation';

interface UserArgs {
  id: number;
  email: string;
  role: string;
  firstName: string;
  password: string;
}

const ManageDataUserPage = () => {
  const router = useRouter();
  const { getWarehousesAdmin } = useWarehousesAdmin();
  const [users, setUsers] = useState<UserArgs[]>([]);
  const { deleteWarehouseAdmin } = useDeleteWarehouseAdmin();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getWarehousesAdmin();
        setUsers(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);
  console.log(users);
  return (
    <div className="px-4 py-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>List Warehouse Admin</CardTitle>
            <Link href="/admin/manage-data/create">
              <Button>Create Warehouse Admin</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div
            className="relative overflow-y-auto text-sm md:mt-8 md:h-[350px]"
            style={{ scrollbarWidth: 'none' }}
          >
            <table className="w-full table-auto">
              <thead>
                <tr className="sticky top-0 bg-gray-200">
                  <th className="px-4 py-2">No</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2 max-md:hidden">Password</th>
                  <th className="px-4 py-2 max-md:hidden">Role</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody className="overscroll-contain font-medium text-center">
                {users
                  .filter((users) => users.role !== 'CUSTOMER')
                  .map((user, index) => (
                    <tr key={user.id}>
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{user.firstName}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2 max-md:hidden">
                        {/* {user.password} */}
                        {'**********'}
                      </td>
                      <td className="px-4 py-2 max-md:hidden">{user.role}</td>
                      <td className="px-4 py-2 flex justify-center gap-4">
                        {/* <Button>Edit</Button> */}
                        <Trash2
                          className="cursor-pointer"
                          onClick={() => deleteWarehouseAdmin(user.id)}
                        />
                        <FilePenLine
                          className="cursor-pointer"
                          onClick={() => {
                            UpdateWarehouseAdminPage(user.id);
                            router.push('/admin/manage-data/edit');
                          }}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageDataUserPage;
