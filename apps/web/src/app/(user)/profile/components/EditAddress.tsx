// 'use client';

// import { Input } from '@/components/ui/input';
// import useUpdateAddress from '@/hooks/api/user/useEditAddress';
// import useGetProvince from '@/hooks/api/user/useGetProvince';
// import { useFormik } from 'formik';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// interface Province {
//   id: number;
//   provinceName: string;
//   cities: {
//     cityName: string;
//     postal_code: string;
//     subdistricts: { subdistrictName: string }[];
//   }[];
// }

// interface Address {
//   id: number;
//   name: string;
//   street: string;
//   city: string;
//   province: string;
//   postalCode: string;
//   isPrimary: boolean;
//   subdistricts: string;
// }

// interface EditAddressProps {
//   setShowEditAddress: (value: boolean) => void;
//   addressId: Address;
// }

// export const EditAddress = ({
//   setShowEditAddress,
//   addressId,
// }: EditAddressProps) => {
//   const { getProvince } = useGetProvince();
//   const [provinces, setProvinces] = useState<Province[]>([]);
//   const [cities, setCities] = useState<Province['cities']>([]);
//   const [subdistricts, setSubdistricts] = useState<
//     { subdistrictName: string }[]
//   >([]);
//   const [selectedCity, setSelectedCity] = useState<string>('');

//   const router = useRouter();
//   const { updateAddress } = useUpdateAddress();
//   const formik = useFormik({
//     initialValues: {
//       name: addressId.name,
//       street: addressId.street,
//       city: addressId.city,
//       province: addressId.province,
//       postalCode: addressId.postalCode,
//       subdistricts: addressId.subdistricts,
//       isPrimary: false,
//     },
//     onSubmit: (values) => {
//       updateAddress(values);
//     },
//   });
//   console.log(formik.values);
//   const handleProvinceChange = (selectedProvince: string) => {
//     formik.setFieldValue('province', selectedProvince);
//     const selectedProvinceData = provinces.find(
//       (province) => province.provinceName === selectedProvince,
//     );

//     if (selectedProvinceData) {
//       setCities(selectedProvinceData.cities);
//       formik.setFieldValue('city', '');
//       setSubdistricts([]);
//     }
//   };

//   useEffect(() => {
//     const fetchProvinces = async () => {
//       try {
//         const response = await getProvince();
//         setProvinces(response);
//         console.log(response);
//       } catch (error) {}
//     };
//     fetchProvinces();
//   }, []);

//   const handleCityChange = (selectedCity: string) => {
//     formik.setFieldValue('city', selectedCity);
//     setSelectedCity(selectedCity);

//     const selectedCityData = cities.find(
//       (city) => city.cityName === selectedCity,
//     );

//     if (selectedCityData) {
//       const postalCode = selectedCityData.postal_code;
//       formik.setFieldValue('postalCode', postalCode);
//       setSubdistricts(selectedCityData.subdistricts);

//       formik.setFieldValue('subdistrict', '');
//     }
//   };
//   return (
//     <div className="h-full">
//       <div className="flex justify-between">
//         <div className="text-xl font-semibold">Input your Address</div>
//         <button
//           className="ml-1 bg-black text-white font-medium p-2 rounded-md"
//           type="button"
//           onClick={() => setShowEditAddress(false)}
//         >
//           Back
//         </button>
//       </div>
//       <form
//         onSubmit={formik.handleSubmit}
//         className="mt-5 gap-4 flex max-md:flex-col w-full"
//       >
//         <div className="flex flex-col gap-y-5 md:w-1/3">
//           <div>
//             <span className="ml-1 text-sm font-semibold">Detail Alamat</span>
//             <Input
//               name="name"
//               type="text"
//               onChange={formik.handleChange}
//               value={formik.values.name}
//             />
//           </div>
//           <div>
//             <span className="ml-1 text-sm font-semibold">Street</span>
//             <Input
//               name="street"
//               type="text"
//               onChange={formik.handleChange}
//               value={formik.values.street}
//             />
//           </div>

//           <div className="flex flex-col">
//             <span className="ml-1 text-sm font-semibold">Province</span>
//             <select
//               name="province"
//               // onChange={(e) => handleProvinceChange(e.target.value)}
//               value={formik.values.province}
//               className="text-black p-3 box-shadow cursor-pointer rounded-sm border-2 border-solid border-slate-400 bg-white"
//             >
//               <option value="" disabled>
//                 Select Province
//               </option>
//               {provinces.map((province, index) => (
//                 <option key={index} value={province.provinceName}>
//                   {province.provinceName}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="flex flex-col gap-y-5 md:w-1/3">
//           <div className="flex flex-col">
//             <span className="ml-1 text-sm font-semibold">City</span>
//             <select
//               name="city"
//               // onChange={(e) => handleCityChange(e.target.value)}
//               value={formik.values.city}
//               className="text-black p-3 box-shadow cursor-pointer rounded-sm border-2 border-solid border-slate-400 bg-white"
//             >
//               <option value="" disabled>
//                 Select City
//               </option>
//               {cities.map((city, index) => (
//                 <option key={index} value={city.cityName}>
//                   {city.cityName}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="flex flex-col">
//             <span className="ml-1 text-sm font-semibold">Sub District</span>
//             <select
//               name="subdistrict"
//               onChange={formik.handleChange}
//               // value={formik.values.subdistrict}
//               className="text-black p-3 box-shadow cursor-pointer rounded-sm border-2 border-solid border-slate-400 bg-white"
//             >
//               <option value="" disabled>
//                 Select Sub District
//               </option>
//               {subdistricts.map((subdistrict, index) => (
//                 <option key={index} value={subdistrict.subdistrictName}>
//                   {subdistrict.subdistrictName}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <button
//             className="mt-4 bg-black text-white font-medium p-2 rounded-md"
//             type="submit"
//           >
//             Add to Address
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };
// useEffect(() => {
//   const fetchProvinces = async () => {
//     try {
//       const response = await getProvince();
//       setProvinces(response);
//       console.log(response);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   fetchProvinces();
// }, []);

'use client';

import { Input } from '@/components/ui/input';
import useUpdateAddress from '@/hooks/api/user/useEditAddress';
import useGetProvince from '@/hooks/api/user/useGetProvince';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';

interface Province {
  id: number;
  provinceName: string;
  cities: {
    cityName: string;
    postal_code: string;
    subdistricts: { subdistrictName: string }[];
  }[];
}

interface Address {
  id: number;
  name: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  isPrimary: boolean;
  subdistricts: string;
}

interface EditAddressProps {
  setShowEditAddress: (value: boolean) => void;
  addressId: Address;
}

export const EditAddress = ({
  setShowEditAddress,
  addressId,
}: EditAddressProps) => {
  const { getProvince } = useGetProvince();
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<Province['cities']>([]);
  const [subdistricts, setSubdistricts] = useState<
    { subdistrictName: string }[]
  >([]);
  const [selectedCity, setSelectedCity] = useState<string>(addressId.city);

  const router = useRouter();
  const { updateAddress } = useUpdateAddress();
  const formik = useFormik({
    initialValues: {
      id: addressId.id,
      name: addressId.name,
      street: addressId.street,
      city: addressId.city,
      province: addressId.province,
      postalCode: addressId.postalCode,
      subdistricts: addressId.subdistricts,
      isPrimary: addressId.isPrimary,
    },
    onSubmit: (values) => {
      updateAddress(values);
    },
  });

  const handleProvinceChange = (selectedProvince: string) => {
    if (!selectedProvince) return;
    formik.setFieldValue('province', selectedProvince);
    const selectedProvinceData = provinces.find(
      (province) => province.provinceName === selectedProvince,
    );

    if (selectedProvinceData) {
      setCities(selectedProvinceData.cities);
      formik.setFieldValue('city', ' ');
      setSubdistricts([]);
    }
  };

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await getProvince();
        setProvinces(response);
        console.log(response);

        const selectedProvinceData = response.find(
          (province: Province) => province.provinceName === addressId.province,
        );
        const selectedSubdistrict = selectedProvinceData?.cities.find(
          (city: Province['cities'][0]) => city.cityName === addressId.city,
        );

        if (selectedProvinceData && selectedSubdistrict) {
          setCities(selectedProvinceData.cities);
          setSubdistricts(selectedSubdistrict.subdistricts);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProvinces();
  }, [addressId.province]);

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

      formik.setFieldValue('subdistrict', addressId.subdistricts);
    }
  };

  return (
    <div className="h-full">
      <div className="flex justify-between">
        <div className="text-xl font-semibold">Input your Address</div>
        <button
          className="ml-1 bg-black text-white font-medium p-2 rounded-md"
          type="button"
          onClick={() => setShowEditAddress(false)}
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
              value={formik.values.subdistricts}
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
          <div className="flex gap-4">
            <Switch
              checked={formik.values.isPrimary}
              onCheckedChange={(isChecked) =>
                formik.setFieldValue('isPrimary', isChecked)
              }
            />
            <span className=" text-sm font-semibold">Main Address</span>
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

// 'use client';

// import { Input } from '@/components/ui/input';
// import useUpdateAddress from '@/hooks/api/user/useEditAddress';
// import useGetProvince from '@/hooks/api/user/useGetProvince';
// import { useFormik } from 'formik';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { Switch } from '@/components/ui/switch';
// interface Province {
//   id: number;
//   provinceName: string;
//   cities: {
//     cityName: string;
//     postal_code: string;
//     subdistricts: { subdistrictName: string }[];
//   }[];
// }

// interface Address {
//   id: number;
//   name: string;
//   street: string;
//   city: string;
//   province: string;
//   postalCode: string;
//   isPrimary: boolean;
//   subdistricts: string;
// }

// interface EditAddressProps {
//   setShowEditAddress: (value: boolean) => void;
//   addressId: Address;
// }

// export const EditAddress = ({
//   setShowEditAddress,
//   addressId,
// }: EditAddressProps) => {
//   const { getProvince } = useGetProvince();
//   const [provinces, setProvinces] = useState<Province[]>([]);
//   const [cities, setCities] = useState<Province['cities']>([]);
//   const [subdistricts, setSubdistricts] = useState<
//     { subdistrictName: string }[]
//   >([]);
//   const [selectedCity, setSelectedCity] = useState<string>(addressId.city);
//   const [selectedSubdistrict, setSelectedSubdistrict] = useState<string>(
//     addressId.subdistricts,
//   );

//   const router = useRouter();
//   const { updateAddress } = useUpdateAddress();
//   const formik = useFormik({
//     initialValues: {
//       name: addressId.name,
//       street: addressId.street,
//       city: addressId.city,
//       province: addressId.province,
//       postalCode: addressId.postalCode,
//       subdistricts: addressId.subdistricts,
//       isPrimary: addressId.isPrimary,
//     },
//     onSubmit: (values) => {
//       updateAddress(values);
//     },
//   });

//   const handleProvinceChange = (selectedProvince: string) => {
//     if (!selectedProvince) return;

//     formik.setFieldValue('province', selectedProvince);
//     const selectedProvinceData = provinces.find(
//       (province) => province.provinceName === selectedProvince,
//     );

//     if (selectedProvinceData) {
//       setCities(selectedProvinceData.cities);
//       formik.setFieldValue('city', '');
//       setSubdistricts([]);
//     }
//   };

//   useEffect(() => {
//     const fetchProvinces = async () => {
//       try {
//         const response = await getProvince();
//         setProvinces(response);
//         console.log(response);

//         const selectedProvinceData = response.find(
//           (province: Province) => province.provinceName === addressId.province,
//         );

//         if (selectedProvinceData) {
//           setCities(selectedProvinceData.cities);
//           setSubdistricts(selectedProvinceData.cities[0].subdistricts);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchProvinces();
//   }, [addressId.province]);

//   const handleCityChange = (selectedCity: string) => {
//     formik.setFieldValue('city', selectedCity);
//     setSelectedCity(selectedCity);

//     const selectedCityData = cities.find(
//       (city) => city.cityName === selectedCity,
//     );

//     if (selectedCityData) {
//       const postalCode = selectedCityData.postal_code;
//       formik.setFieldValue('postalCode', postalCode);
//       setSubdistricts(selectedCityData.subdistricts);
//       formik.setFieldValue(
//         'subdistrictName',
//         selectedCityData.subdistricts[0]?.subdistrictName,
//       );
//     }
//   };

//   return (
//     <div className="h-full">
//       <div className="flex justify-between">
//         <div className="text-xl font-semibold">Input your Address</div>
//         <button
//           className="ml-1 bg-black text-white font-medium p-2 rounded-md"
//           type="button"
//           onClick={() => setShowEditAddress(false)}
//         >
//           Back
//         </button>
//       </div>
//       <form
//         onSubmit={formik.handleSubmit}
//         className="mt-5 gap-4 flex max-md:flex-col w-full"
//       >
//         <div className="flex flex-col gap-y-5 md:w-1/3">
//           <div>
//             <span className="ml-1 text-sm font-semibold">Detail Alamat</span>
//             <Input
//               name="name"
//               type="text"
//               onChange={formik.handleChange}
//               value={formik.values.name}
//             />
//           </div>
//           <div>
//             <span className="ml-1 text-sm font-semibold">Street</span>
//             <Input
//               name="street"
//               type="text"
//               onChange={formik.handleChange}
//               value={formik.values.street}
//             />
//           </div>

//           <div className="flex flex-col">
//             <span className="ml-1 text-sm font-semibold">Province</span>
//             <select
//               name="province"
//               onChange={(e) => handleProvinceChange(e.target.value)}
//               value={formik.values.province}
//               className="text-black p-3 box-shadow cursor-pointer rounded-sm border-2 border-solid border-slate-400 bg-white"
//             >
//               <option value="" disabled>
//                 Select Province
//               </option>
//               {provinces.map((province, index) => (
//                 <option key={index} value={province.provinceName}>
//                   {province.provinceName}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="flex flex-col gap-y-5 md:w-1/3">
//           <div className="flex flex-col">
//             <span className="ml-1 text-sm font-semibold">City</span>
//             <select
//               name="city"
//               onChange={(e) => handleCityChange(e.target.value)}
//               value={formik.values.city}
//               className="text-black p-3 box-shadow cursor-pointer rounded-sm border-2 border-solid border-slate-400 bg-white"
//             >
//               <option value="" disabled>
//                 Select City
//               </option>
//               {cities.map((city, index) => (
//                 <option key={index} value={city.cityName}>
//                   {city.cityName}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="flex flex-col">
//             <span className="ml-1 text-sm font-semibold">Sub District</span>
//             <select
//               name="subdistrict"
//               onChange={formik.handleChange}
//               value={formik.values.subdistricts}
//               defaultValue={selectedSubdistrict}
//               className="text-black p-3 box-shadow cursor-pointer rounded-sm border-2 border-solid border-slate-400 bg-white"
//             >
//               <option value="" disabled>
//                 Select Sub District
//               </option>
//               {subdistricts.map((subdistrict, index) => (
//                 <option key={index} value={subdistrict.subdistrictName}>
//                   {subdistrict.subdistrictName}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="flex gap-4">
//             <Switch
//               // checked={formik.values.isPrimary}
//               onChange={(checked) => formik.setFieldValue('isPrimary', checked)}
//             />
//             <span className=" text-sm font-semibold">Main Address</span>
//           </div>

//           <button
//             className="mt-4 bg-black text-white font-medium p-2 rounded-md"
//             type="submit"
//           >
//             Add to Address
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };
