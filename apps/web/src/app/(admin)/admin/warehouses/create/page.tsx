'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import useGetProvince from '@/hooks/api/user/useGetProvince';
import useCreateWarehouse from '@/hooks/warehouses/useCreateWarehouse';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Province {
  id: number;
  provinceName: string;
  cities: {
    cityName: string;
    subdistricts: { subdistrictName: string }[];
  }[];
}

const CreateWarehousePage = () => {
  const { createWarehouse } = useCreateWarehouse();
  const { getProvince } = useGetProvince();
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<Province['cities']>([]);
  const [subdistricts, setSubdistricts] = useState<
    { subdistrictName: string }[]
  >([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await getProvince();
        setProvinces(response);
      } catch (error) {}
    };
    fetchProvinces();
  }, []);
  const formik = useFormik({
    initialValues: {
      name: '',
      street: '',
      city: '',
      province: '',
      subdistrict: '',
    },
    onSubmit: (values) => {
      createWarehouse(values);
    },
  });

  const handleProvinceChange = (selectedProvince: string) => {
    formik.setFieldValue('province', selectedProvince);
    const selectedProvinceData = provinces.find(
      (province) => province.provinceName === selectedProvince,
    );

    if (selectedProvinceData) {
      setCities(selectedProvinceData.cities);
      formik.setFieldValue('city', '');
      setSubdistricts([]);
    }
  };

  const handleCityChange = (selectedCity: string) => {
    formik.setFieldValue('city', selectedCity);
    setSelectedCity(selectedCity);

    const selectedCityData = cities.find(
      (city) => city.cityName === selectedCity,
    );

    if (selectedCityData) {
      setSubdistricts(selectedCityData.subdistricts);
      formik.setFieldValue('subdistrict', '');
    }
  };

  return (
    <div className="px-4 py-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>Create Warehouse</CardTitle>
            <Link href="/admin/warehouses">
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
              onSubmit={formik.handleSubmit}
              className="mt-5 gap-4 flex max-md:flex-col w-full"
            >
              <div className="flex flex-col gap-y-5 md:w-1/3">
                <div>
                  <span className="ml-1 text-sm font-semibold">
                    Nama Warehouse
                  </span>
                  <Input
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                </div>
                <div>
                  <span className="ml-1 text-sm font-semibold">Street</span>
                  <Input
                    name="street"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.street}
                  />
                </div>

                <div className="flex flex-col">
                  <span className="ml-1 text-sm font-semibold">Province</span>
                  <select
                    name="province"
                    onChange={(e) => handleProvinceChange(e.target.value)}
                    value={formik.values.province}
                    className="text-black p-3 box-shadow cursor-pointer rounded-sm border-2 border-solid border-slate-400 bg-white"
                  >
                    <option value="" disabled>
                      Select Province
                    </option>
                    {provinces.map((province, index) => (
                      <option key={index} value={province.provinceName}>
                        {province.provinceName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-y-5 md:w-1/3">
                <div className="flex flex-col">
                  <span className="ml-1 text-sm font-semibold">City</span>
                  <select
                    name="city"
                    onChange={(e) => handleCityChange(e.target.value)}
                    value={formik.values.city}
                    className="text-black p-3 box-shadow cursor-pointer rounded-sm border-2 border-solid border-slate-400 bg-white"
                  >
                    <option value="" disabled>
                      Select City
                    </option>
                    {cities.map((city, index) => (
                      <option key={index} value={city.cityName}>
                        {city.cityName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <span className="ml-1 text-sm font-semibold">
                    Sub District
                  </span>
                  <select
                    name="subdistrict"
                    onChange={formik.handleChange}
                    value={formik.values.subdistrict}
                    className="text-black p-3 box-shadow cursor-pointer rounded-sm border-2 border-solid border-slate-400 bg-white"
                  >
                    <option value="" disabled>
                      Select Sub District
                    </option>
                    {subdistricts.map((subdistrict, index) => (
                      <option key={index} value={subdistrict.subdistrictName}>
                        {subdistrict.subdistrictName}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  className="mt-4 bg-black text-white font-medium p-2 rounded-md"
                  type="submit"
                >
                  Add to Warehouse
                </button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default CreateWarehousePage;
