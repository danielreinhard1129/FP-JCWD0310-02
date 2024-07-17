'use client';
import { useEffect, useState } from 'react';
import useWarehousesAdmin from '@/hooks/api/user/useGetAdmins';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import useGetWarehouse from '@/hooks/warehouses/useGetWarehouse';
import { Trash2, FilePenLine } from 'lucide-react';
import useDeleteWarehouse from '@/hooks/warehouses/useDeleteWarehouse';
import { useRouter } from 'next/navigation';
import useGetEmployes from '@/hooks/api/user/useGetEmployes';
import { useFormik } from 'formik';
import useUpdateEmploye from '@/hooks/api/user/useUpdateEmploye';
import { useModal } from '@/hooks/useModal';
import useGetWarehouseAdmin from '@/hooks/api/user/useGetWarehouseAdmin';
interface Warehouse {
  id: number;
  name: string;
  street: string;
  city: string;
  province: string;
  subdistrict: string;
  employee: [userId: number];
}

interface Admin {
  id: number;
  user: {
    firstName: string;
  };
}
const ListWarehouse = () => {
  const router = useRouter();
  const { updateEmploye } = useUpdateEmploye();
  const { deleteWarehouse } = useDeleteWarehouse();
  const { getWarehouse } = useGetWarehouse();
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const { getEmployes } = useGetEmployes();
  const [adminList, setAdminList] = useState<Admin[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { ModalAsync, setOpen, setTitle } = useModal();
  const [selectedWarehouseId, setSelectedWarehouseId] = useState(0);
  const { getWarehouseAdmin } = useGetWarehouseAdmin();
  const fetchAdminWarehouse = async () => {
    try {
      const data = await getWarehouseAdmin();
      setAdminList(data.data);
    } catch (error) {
      console.error('Error fetching admin warehouse:', error);
    }
  };

  useEffect(() => {
    fetchAdminWarehouse();
  }, []);
  const fetchWarehouses = async (page: number) => {
    try {
      const data = await getWarehouse();
      setWarehouses(data.slice((page - 1) * itemsPerPage, page * itemsPerPage));
    } catch (error) {
      console.error('Error fetching warehouses:', error);
    }
  };

  useEffect(() => {
    fetchWarehouses(currentPage);
  }, [currentPage]);
  const handleDelete = async (warehouseId: number) => {
    try {
      await deleteWarehouse(warehouseId);
      fetchWarehouses(currentPage);
      setOpen(false);
    } catch (error) {
      console.error('Error deleting warehouse:', error);
    }
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const confirmDeleteAddress = (id: number) => {
    setSelectedWarehouseId(id);
    setOpen(true);
    setTitle('Delete Address');
  };
  return (
    <div className="px-4 py-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>List Warehouse</CardTitle>
            <Link href="/admin/warehouses/create">
              <Button>Create Warehouse</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div
            className="relative  text-sm md:mt-8 md:h-[350px]"
            // style={{ scrollbarWidth: 'none' }}
          >
            <table className="w-full table-auto">
              <thead>
                <tr className="sticky top-0 bg-gray-200">
                  <th className="px-4 py-2">No</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Alamat</th>
                  <th className="px-4 py-2 max-md:hidden">Penanggung Jawab</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody className="overscroll-contain font-medium text-center">
                {warehouses.map((warehouse, index) => (
                  <tr key={warehouse.id}>
                    {/* //<td className="px-4 py-2">{index + 1}</td>*/}
                    <td className="px-4 py-2">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-4 py-2">{warehouse.name}</td>
                    <td className="px-4 py-2">{`${warehouse.street}, ${warehouse.subdistrict} ,${warehouse.city}, ${warehouse.province} `}</td>

                    <td className="px-4 py-2 max-md:hidden">
                      {adminList
                        .filter((admin) => admin.id === warehouse.employee[0])
                        .map((admin, index) => (
                          <p key={index}>{admin.user.firstName}</p>
                        ))}
                    </td>
                    <td className="px-4 py-2 flex justify-center gap-4">
                      <Trash2
                        className="cursor-pointer"
                        // onClick={() => handleDelete(warehouse.id)}
                        onClick={() => confirmDeleteAddress(warehouse.id)}
                      />
                      <FilePenLine
                        className="cursor-pointer"
                        onClick={() => {
                          router.replace(
                            `/admin/warehouses/edit/${warehouse.id}`,
                          );
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end -mt-2">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-3 py-1 mx-1 border rounded"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-3 py-1 mx-1 border rounded"
            >
              Next
            </button>
          </div>
        </CardContent>
      </Card>

      <ModalAsync
        loading={false}
        handleOk={() => handleDelete(selectedWarehouseId)}
        description=" are you sure you want to delete this address"
      />
    </div>
  );
};

export default ListWarehouse;
// // ('use client');
// // import { useEffect, useState } from 'react';
// // import useWarehousesAdmin from '@/hooks/api/user/useGetAdmins';
// // import { Button } from '@/components/ui/button';
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // import Link from 'next/link';
// // import useGetWarehouse from '@/hooks/warehouses/useGetWarehouse';
// // import { Trash2, FilePenLine } from 'lucide-react';
// // import useDeleteWarehouse from '@/hooks/warehouses/useDeleteWarehouse';
// // import { useRouter } from 'next/navigation';
// // import useGetEmployes from '@/hooks/api/user/useGetEmployes';
// // import { useFormik } from 'formik';
// // import useUpdateEmploye from '@/hooks/api/user/useUpdateEmploye';

// // interface Warehouse {
// //   id: number;
// //   name: string;
// //   street: string;
// //   city: string;
// //   province: string;
// //   subdistrict: string;
// // }

// // interface Admin {
// //   id: number;
// //   user: {
// //     firstName: string;
// //   };
// // }

// // const ListWarehouse = () => {
// //   const router = useRouter();
// //   const { updateEmploye } = useUpdateEmploye();
// //   const { deleteWarehouse } = useDeleteWarehouse();
// //   const { getWarehouse } = useGetWarehouse();
// //   const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
// //   const { getEmployes } = useGetEmployes();
// //   const [adminList, setAdminList] = useState<Admin[]>([]);

// //   const [currentPage, setCurrentPage] = useState(1);
// //   const itemsPerPage = 5; // Menentukan jumlah item per halaman

// //   const fetchWarehouses = async (page: number) => {
// //     try {
// //       const data = await getWarehouse();
// //       setWarehouses(data.slice((page - 1) * itemsPerPage, page * itemsPerPage));
// //     } catch (error) {
// //       console.error('Error fetching warehouses:', error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchWarehouses(currentPage);
// //   }, [currentPage]);

// //   useEffect(() => {
// //     const fetchAdmins = async () => {
// //       try {
// //         const admins = await getEmployes();
// //         setAdminList(admins);
// //       } catch (error) {
// //         console.error('Error fetching admins:', error);
// //       }
// //     };
// //     fetchAdmins();
// //   }, []);

// //   const handleDelete = async (warehouseId: number) => {
// //     try {
// //       await deleteWarehouse(warehouseId);
// //       fetchWarehouses(currentPage);
// //     } catch (error) {
// //       console.error('Error deleting warehouse:', error);
// //     }
// //   };

// //   const handlePageChange = (page: number) => {
// //     setCurrentPage(page);
// //   };

// //   const formik = useFormik({
// //     initialValues: {
// //       id: 0,
// //       warehousesId: 0,
// //     },
// //     onSubmit: (values) => {
// //       // updateEmploye(values);
// //     },
// //   });

// //   return (
// //     <div className="px-4 py-4">
// //       <Card>
// //         <CardHeader>
// //           <div className="flex justify-between">
// //             <CardTitle>List Warehouse</CardTitle>
// //             <Link href="/admin/warehouses/create">
// //               <Button>Create Warehouse</Button>
// //             </Link>
// //           </div>
// //         </CardHeader>
// //         <CardContent>
// //           <div className="relative text-sm md:mt-8 md:h-[350px]">
// //             <table className="w-full table-auto">
// //               <thead>
// //                 <tr className="sticky top-0 bg-gray-200">
// //                   <th className="px-4 py-2">No</th>
// //                   <th className="px-4 py-2">Name</th>
// //                   <th className="px-4 py-2">Alamat</th>
// //                   <th className="px-4 py-2 max-md:hidden">Penanggung Jawab</th>
// //                   <th className="px-4 py-2">Action</th>
// //                 </tr>
// //               </thead>
// //               <tbody className="overscroll-contain font-medium text-center">
// //                 {warehouses.map((warehouse, index) => (
// //                   <tr key={warehouse.id}>
// //                     <td className="px-4 py-2">
// //                       {(currentPage - 1) * itemsPerPage + index + 1}
// //                     </td>
// //                     <td className="px-4 py-2">{warehouse.name}</td>
// //                     <td className="px-4 py-2">{`${warehouse.street}, ${warehouse.subdistrict}, ${warehouse.city}, ${warehouse.province}`}</td>
// //                     <td className="px-4 py-2 max-md:hidden">
// //                       <select
// //                         className="appearance-auto rounded py-2 px-3 focus:outline-none"
// //                         onChange={(e) => {
// //                           formik.handleChange(e);
// //                           formik.setFieldValue('id', e.target.value);
// //                           formik.setFieldValue('warehousesId', warehouse.id);
// //                         }}
// //                         value={formik.values.id}
// //                       >
// //                         <option value="">Select Admin</option>
// //                         {adminList.map((admin) => (
// //                           <option key={admin.id} value={admin.id}>
// //                             {admin.user.firstName}
// //                           </option>
// //                         ))}
// //                       </select>
// //                     </td>
// //                     <td className="px-4 py-2 flex justify-center gap-4">
// //                       <Trash2
// //                         className="cursor-pointer"
// //                         onClick={() => handleDelete(warehouse.id)}
// //                       />
// //                       <FilePenLine
// //                         className="cursor-pointer"
// //                         onClick={() => {
// //                           router.replace(
// //                             `/admin/warehouses/edit/${warehouse.id}`,
// //                           );
// //                         }}
// //                       />
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //             <div className="flex justify-center mt-4">
// //               <button
// //                 disabled={currentPage === 1}
// //                 onClick={() => handlePageChange(currentPage - 1)}
// //                 className="px-3 py-1 mx-1 border rounded"
// //               >
// //                 Previous
// //               </button>
// //               <button
// //                 onClick={() => handlePageChange(currentPage + 1)}
// //                 className="px-3 py-1 mx-1 border rounded"
// //               >
// //                 Next
// //               </button>
// //             </div>
// //           </div>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // };

// // export default ListWarehouse;
