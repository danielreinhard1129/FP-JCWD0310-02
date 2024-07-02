import prisma from '@/prisma';
import axios from 'axios';
interface Warehouse {
  name: string;
  street: string;
  city: string;
  province: string;
  subdistrict: string;
}
const OPEN_CAGE_API_KEY = '30d89911e50c41329178651b1a706345';
export const createWarehouseService = async (body: Warehouse) => {
  const { name, city, province, subdistrict } = body;
  try {
    let lat = '';
    let lon = '';
    const state = 'Indonesia';
    const address = `${subdistrict}, ${city}, ${province}, Indonesia`;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${OPEN_CAGE_API_KEY}`;
    const existingWarehouse = await prisma.warehouse.findFirst({
      where: {
        name,
      },
    });
    if (existingWarehouse) {
      throw new Error('Warehouse already exists');
    }
    console.log(url);
    const response = await axios.get(url);
    // console.log(response.data.results[1].geometry);

    if (response.data.results[1]?.geometry !== undefined) {
      lat = response.data.results[1]?.geometry?.lat;
      lon = response.data.results[1]?.geometry?.lng;
    } else {
      lat = response.data.results[0]?.geometry?.lat;
      lon = response.data.results[0]?.geometry?.lng;
    }

    return await prisma.warehouse.create({
      data: {
        ...body,
        state: 'Indonesia',
        lat: Number(lat),
        lon: Number(lon),
      },
    });
  } catch (error) {
    throw error;
  }
};
