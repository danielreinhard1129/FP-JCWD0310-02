import prisma from '@/prisma';

import axios from 'axios';
const OPEN_CAGE_API_KEY = '30d89911e50c41329178651b1a706345';
interface Warehouse {
  id: number;
  name: string;
  street: string;
  city: string;
  province: string;
  subdistrict: string;
  adminId?: number;
}
export const updateWarehouseService = async (body: Warehouse, id: number) => {
  const { name, city, province, subdistrict, adminId, street } = body;
  try {
    let lat = '';
    let lon = '';
    const state = 'Indonesia';
    const address = `${subdistrict}, ${city}, ${province}, Indonesia`;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${OPEN_CAGE_API_KEY}`;
    const existingWarehouse = await prisma.warehouse.findFirst({
      where: {
        id,
      },
    });
    if (!existingWarehouse) {
      throw new Error('Warehouse not found');
    }
    const response = await axios.get(url);

    if (response.data.results[1]?.geometry !== undefined) {
      lat = response.data.results[1]?.geometry?.lat;
      lon = response.data.results[1]?.geometry?.lng;
    } else {
      lat = response.data.results[0]?.geometry?.lat;
      lon = response.data.results[0]?.geometry?.lng;
    }
    await prisma.employee.updateMany({
      where: {
        userId: Number(adminId),
      },
      data: {
        warehouseId: id,
      },
    });
    return await prisma.warehouse.update({
      where: {
        id,
      },
      data: {
        name,
        city,
        province,
        subdistrict,
        state,
        street,
        lat: Number(lat),
        lon: Number(lon),
      },
    });
  } catch (error) {
    throw error;
  }
};
