import prisma from '@/prisma';
import axios from 'axios';

interface Address {
  name: string;
  street: string;
  subdistrict: string;
  city: string;
  province: string;
  postalCode: string;
}
const OPEN_CAGE_API_KEY = '30d89911e50c41329178651b1a706345';

export const createAddressService = async (body: Address, id: number) => {
  const { city, province, subdistrict } = body;
  const address = `${subdistrict}, ${city}, ${province}, Indonesia`;
  try {
    let lat;
    let lon;
    const existingUser = await prisma.users.findFirst({
      where: { id },
    });
    if (!existingUser) {
      throw new Error('User not found');
    }
    const response = await axios.get(
      'https://api.opencagedata.com/geocode/v1/json',
      {
        params: {
          q: address,
          key: OPEN_CAGE_API_KEY,
        },
      },
    );

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
    console.log(lat, lon);
    return await prisma.address.create({
      data: {
        ...body,
        userId: id,
        lat: lat,
        lon: lon,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
