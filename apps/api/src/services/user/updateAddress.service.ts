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

    const existingUser = await prisma.address.findFirst({
      where: { userId: id },
    });

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
      const Latitude = lastResult?.geometry?.lat;
      const Longitude = lastResult?.geometry?.lng;

      if (Latitude === undefined || Longitude === undefined) {
        throw new Error(
          'Latitude or Longitude is undefined in the response data.',
        );
      }

      await prisma.address.update({
        where: { id: body.id },
        data: {
          ...body,
          lat: Latitude,
          lon: Longitude,
        },
      });

      return {
        message: 'Address updated successfully',
        data: response.data,
      };
    } else {
      throw new Error('No results found.');
    }
  } catch (error) {
    throw error;
  }
};
