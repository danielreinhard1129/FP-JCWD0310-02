import prisma from '@/prisma';
import axios from 'axios';

interface Address {
  name: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  // isPrimary: boolean;
}
const OPEN_CAGE_API_KEY = '30d89911e50c41329178651b1a706345';
export const createAddressService = async (body: Address, id: number) => {
  try {
    const { city, province } = body;
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
          q: `${city}, ${province}`,

          key: OPEN_CAGE_API_KEY,
        },
      },
    );
    console.log('ini response data' + response.data);
    console.log(
      'ini response data results[0].geometry' +
        response.data.results[0].geometry,
    );

    return await prisma.address.create({
      data: {
        ...body,
        userId: id,

        lat: response.data.results[0].geometry.lat,
        lon: response.data.results[0].geometry.lng,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
