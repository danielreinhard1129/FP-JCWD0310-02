'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import useWarehousesAdmin from '@/hooks/api/user/useGetAdmins';
import useCreateAdmin from '@/hooks/warehouses/useCreateAdmin';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useEffect, useState } from 'react';
interface UserArgs {
  id: number;
  email: string;
  role: string;
  firstName: string;
  password: string;
  employee: {
    ktp: string;
    npwp: string;
    salary: number;
  };
}

const UpdateWarehouseAdminPage = (adminId: number) => {
  console.log(adminId);
  //   const { createAdmin } = useCreateAdmin();
  const { getWarehousesAdmin } = useWarehousesAdmin();
  //   const [users, setUsers] = useState<UserArgs[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getWarehousesAdmin();
        // setUsers(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      ktp: '',
      npwp: '',
      salary: 0,
    },
    onSubmit: (values) => {
      //   createAdmin(values);
    },
  });
  console.log(formik.values);
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
            className="relative overflow-y-auto text-sm md:mt-8 md:h-[380px]"
            style={{ scrollbarWidth: 'none' }}
          >
            <form onSubmit={formik.handleSubmit} className="mt-5 w-full">
              <div className="w-full flex max-md:flex-col  gap-4  ">
                {' '}
                <div className="flex flex-col gap-y-5 md:w-1/3">
                  <div>
                    <span className="ml-1 text-sm font-semibold">
                      First Name
                    </span>
                    <Input
                      name="firstName"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.firstName}
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
                      value={formik.values.lastName}
                    />
                  </div>
                  <div>
                    <span className="ml-1 text-sm font-semibold">Email</span>
                    <Input
                      name="email"
                      type="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                  </div>
                  <div>
                    <span className="ml-1 text-sm font-semibold">Password</span>
                    <Input
                      name="password"
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
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
                      value={formik.values.ktp}
                    />
                  </div>
                  <div>
                    <span className="ml-1 text-sm font-semibold">NPWP</span>
                    <Input
                      name="npwp"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.npwp}
                    />
                  </div>
                  <div>
                    <span className="ml-1 text-sm font-semibold">Salary</span>
                    <Input
                      name="salary"
                      type="number"
                      onChange={formik.handleChange}
                      value={formik.values.salary}
                    />
                  </div>
                  <button
                    className="mt-4 bg-black text-white font-medium p-2 rounded-md"
                    type="submit"
                  >
                    Create to Admin
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

// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import useWarehousesAdmin from '@/hooks/api/user/useGetAdmins';
// import useCreateAdmin from '@/hooks/warehouses/useCreateAdmin';
// import { useFormik } from 'formik';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';

// interface UserArgs {
//   id: number;
//   email: string;
//   role: string;
//   firstName: string;
//   password: string;
//   employee: {
//     ktp: string;
//     npwp: string;
//     salary: number;
//   };
// }

// const UpdateWarehouseAdminPage = (adminId: number) => {
//   console.log(adminId);

//   const { getWarehousesAdmin } = useWarehousesAdmin();
//   const { createAdmin } = useCreateAdmin();
//   const [users, setUsers] = useState<UserArgs[]>([]);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await getWarehousesAdmin();
//         setUsers(response.data);
//         console.log(response);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchUser();
//   }, []);

//   const formik = useFormik({
//     initialValues: {
//       firstName: '',
//       lastName: '',
//       email: '',
//       password: '',
//       ktp: '',
//       npwp: '',
//       salary: 0,
//     },
//     onSubmit: (values) => {
//       createAdmin(values);
//     },
//   });

//   console.log(formik.values);

//   return (
//     <div className="px-4 py-4">
//       <Card>
//         <CardHeader>
//           <div className="flex justify-between">
//             <CardTitle>Create Admin</CardTitle>
//             <Link href="/admin/manage-data">
//               <Button>Back</Button>
//             </Link>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <div
//             className="relative overflow-y-auto text-sm md:mt-8 md:h-[380px]"
//             style={{ scrollbarWidth: 'none' }}
//           >
//             <form onSubmit={formik.handleSubmit} className="mt-5 w-full">
//               <div className="w-full flex max-md:flex-col gap-4">
//                 <div className="flex flex-col gap-y-5 md:w-1/3">
//                   <div>
//                     <span className="ml-1 text-sm font-semibold">
//                       First Name
//                     </span>
//                     <Input
//                       name="firstName"
//                       type="text"
//                       onChange={formik.handleChange}
//                       value={formik.values.firstName}
//                     />
//                   </div>
//                   <div>
//                     <span className="ml-1 text-sm font-semibold">
//                       Last Name
//                     </span>
//                     <Input
//                       name="lastName"
//                       type="text"
//                       onChange={formik.handleChange}
//                       value={formik.values.lastName}
//                     />
//                   </div>
//                   <div>
//                     <span className="ml-1 text-sm font-semibold">Email</span>
//                     <Input
//                       name="email"
//                       type="email"
//                       onChange={formik.handleChange}
//                       value={formik.values.email}
//                     />
//                   </div>
//                   <div>
//                     <span className="ml-1 text-sm font-semibold">Password</span>
//                     <Input
//                       name="password"
//                       type="password"
//                       onChange={formik.handleChange}
//                       value={formik.values.password}
//                     />
//                   </div>
//                 </div>
//                 <div className="flex flex-col gap-y-5 md:w-1/3">
//                   <div>
//                     <span className="ml-1 text-sm font-semibold">No Ktp</span>
//                     <Input
//                       name="ktp"
//                       type="text"
//                       onChange={formik.handleChange}
//                       value={formik.values.ktp}
//                     />
//                   </div>
//                   <div>
//                     <span className="ml-1 text-sm font-semibold">NPWP</span>
//                     <Input
//                       name="npwp"
//                       type="text"
//                       onChange={formik.handleChange}
//                       value={formik.values.npwp}
//                     />
//                   </div>
//                   <div>
//                     <span className="ml-1 text-sm font-semibold">Salary</span>
//                     <Input
//                       name="salary"
//                       type="number"
//                       onChange={formik.handleChange}
//                       value={formik.values.salary}
//                     />
//                   </div>
//                   <button
//                     className="mt-4 bg-black text-white font-medium p-2 rounded-md"
//                     type="submit"
//                   >
//                     Create Admin
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default UpdateWarehouseAdminPage;
