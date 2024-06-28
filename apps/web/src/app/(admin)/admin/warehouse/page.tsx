'use client';
import { useEffect, useState } from 'react';
import useWarehousesAdmin from '@/hooks/api/user/useGetAdmins';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import useGetWarehouse from '@/hooks/warehouses/useGetWarehouse';
interface Warehouse {
  id: number;
  name: string;
  street: string;
  city: string;
  province: string;
  subdistrict: string;
}
// peanggungjawan: string;}
const ListWarehouse = () => {
  const { getWarehouse } = useGetWarehouse();
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const data = await getWarehouse();
        setWarehouses(data);
      } catch (error) {}
    };
    fetchWarehouses();
  }, [getWarehouse]);

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
                  <th className="px-4 py-2">Edit</th>
                </tr>
              </thead>
              <tbody className="overscroll-contain font-medium text-center">
                {warehouses.map((warehouse, index) => (
                  <tr key={warehouse.id}>
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{warehouse.name}</td>
                    <td className="px-4 py-2">{`${warehouse.street}, ${warehouse.subdistrict} ,${warehouse.city}, ${warehouse.province} `}</td>
                    {/* <td className="px-4 py-2">{warehouse.alamat}</td> */}
                    <td className="px-4 py-2 max-md:hidden">ds</td>
                    <td className="px-4 py-2">
                      <Button>Edit</Button>
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

export default ListWarehouse;
