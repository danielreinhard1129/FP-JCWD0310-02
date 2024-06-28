import prisma from '@/prisma';
import axios from 'axios';

interface Address {
  id: number;
  name: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  isPrimary: boolean;
  subdistrict: string;
}
const OPEN_CAGE_API_KEY = '30d89911e50c41329178651b1a706345';
export const updateAddressService = async (body: Address, id: number) => {
  try {
    const { city, province, subdistrict } = body;
    const address = `${subdistrict}, ${city}, ${province}, Indonesia`;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${OPEN_CAGE_API_KEY}`;

    const existingUser = await prisma.address.findFirst({
      where: { userId: id },
    });
    console.log(existingUser);
    if (!existingUser) {
      throw new Error('Address not found');
    }
    if (body.isPrimary === true) {
      await prisma.address.updateMany({
        where: { userId: id },
        data: {
          isPrimary: false,
        },
      });
    }

    const getLongLat = await axios.get(url);
    const response = await prisma.address.update({
      where: { id: body.id },
      data: {
        ...body,

        lat: getLongLat.data.results[1].geometry.lat,
        lon: getLongLat.data.results[1].geometry.lng,
      },
    });
    console.log(response);
    return {
      message: 'Address updated successfully',
      data: response,
    };
  } catch (error) {
    throw error;
    console.log(error);
  }
};
