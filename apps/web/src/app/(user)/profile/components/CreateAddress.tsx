import { Input } from '@/components/ui/input';
import useCreateAddress from '@/hooks/api/user/useCreateAddress';
import useGetProvince from '@/hooks/api/user/useGetProvince';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';

interface Province {
  id: number;
  provinceName: string;
  cities: {
    cityName: string;
    postal_code: string;
    subdistricts: { subdistrictName: string }[];
  }[];
}

interface CreateAddressProps {
  setShowCreateAddress: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateAddress = ({ setShowCreateAddress }: CreateAddressProps) => {
  const { createAddress } = useCreateAddress();
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
      postalCode: '',
      subdistrict: '',
    },
    onSubmit: (values) => {
      createAddress(values);
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
      const postalCode = selectedCityData.postal_code;
      formik.setFieldValue('postalCode', postalCode);
      setSubdistricts(selectedCityData.subdistricts);

      formik.setFieldValue('subdistrict', '');
    }
  };

  return (
    <div className="h-full">
      <div className="flex justify-between">
        <div className="text-xl font-semibold">Input your Address</div>
        <button
          className="ml-1 bg-black text-white font-medium p-2 rounded-md"
          type="button"
          onClick={() => setShowCreateAddress(false)}
        >
          Back
        </button>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="mt-5 gap-4 flex max-md:flex-col w-full"
      >
        <div className="flex flex-col gap-y-5 md:w-1/3">
          <div>
            <span className="ml-1 text-sm font-semibold">Detail Alamat</span>
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
            <span className="ml-1 text-sm font-semibold">Sub District</span>
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
            Add to Address
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAddress;
