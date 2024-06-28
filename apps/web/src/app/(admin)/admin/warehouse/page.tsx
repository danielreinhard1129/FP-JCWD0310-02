'use client';
import { useEffect, useState } from 'react';
import useWarehousesAdmin from '@/hooks/api/user/useGetAdmins';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

const listWarehouse = () => {
  return (
    <div className="px-4 py-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>List Warehouse</CardTitle>
            <Link href="/admin/warehouse/create">
              <Button>Create Warehouse</Button>
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
                  <th className="px-4 py-2">Alamat</th>
                  <th className="px-4 py-2 max-md:hidden">Penanggung Jawab</th>
                  {/* <th className="px-4 py-2 max-md:hidden">Role</th> */}
                  <th className="px-4 py-2">Edit</th>
                </tr>
              </thead>
              {/* <tbody className="overscroll-contain font-medium text-center">
                {users
                  .filter((users) => users.role !== 'CUSTOMER')
                  .map((user, index) => (
                    <tr key={user.id}>
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{user.firstName}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2 max-md:hidden">
                        {/* {user.password} 
                        {'**********'}
                      </td>
                      <td className="px-4 py-2 max-md:hidden">{user.role}</td>
                      <td className="px-4 py-2">
                        <Button>Edit</Button>
                      </td>
                    </tr>
                  ))}
              </tbody> */}
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default listWarehouse;