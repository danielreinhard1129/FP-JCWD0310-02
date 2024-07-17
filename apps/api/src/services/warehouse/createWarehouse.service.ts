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
    const response = await axios.get(url);
    const results = response.data.results;
    if (results.length > 0) {
      const lastResult = results[results.length - 1];
      lat = lastResult?.geometry?.lat;
      lon = lastResult?.geometry?.lng;

      if (lat === undefined || lon === undefined) {
        throw new Error(
          'Latitude or Longitude is undefined in the response data.',
        );
      }
    } else {
      throw new Error('No results found.');
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
