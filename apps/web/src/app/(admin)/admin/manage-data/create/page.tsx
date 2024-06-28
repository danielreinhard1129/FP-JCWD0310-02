'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

interface UserArgs {
  id: number;
  email: string;

  firstName: string;
  password: string;
}

const CreateWarehouseAdminPage = () => {
  return (
    <div className="px-4 py-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>Create Admin</CardTitle>
            <Link href="/admin/manage-data">
              <Button>Back</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div
            className="relative overflow-y-auto text-sm md:mt-8 md:h-[350px]"
            style={{ scrollbarWidth: 'none' }}
          >
            <form
              //   onSubmit={formik.handleSubmit}
              className="mt-5 gap-4 flex max-md:flex-col w-full"
            >
              <div className="flex flex-col gap-y-5 md:w-1/3">
                <div>
                  <span className="ml-1 text-sm font-semibold">Nama</span>
                  <Input
                    name="name"
                    type="text"
                    // onChange={formik.handleChange}
                    // value={formik.values.name}
                  />
                </div>
                <div>
                  <span className="ml-1 text-sm font-semibold">Email</span>
                  <Input
                    name="street"
                    type="text"
                    // onChange={formik.handleChange}
                    // value={formik.values.street}
                  />
                </div>
                <div>
                  <span className="ml-1 text-sm font-semibold">Password</span>
                  <Input
                    name="street"
                    type="password"
                    // onChange={formik.handleChange}
                    // value={formik.values.street}
                  />
                </div>
                <button
                  className="mt-4 bg-black text-white font-medium p-2 rounded-md"
                  type="submit"
                >
                  Create to Admin
                </button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateWarehouseAdminPage;
