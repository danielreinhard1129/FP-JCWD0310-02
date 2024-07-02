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
  try {
    let lat;
    let lon;
    const { city, province, subdistrict } = body;

    const address = `${subdistrict}, ${city}, ${province}, Indonesia`;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${OPEN_CAGE_API_KEY}`;

    console.log(subdistrict, city, province);
    const existingUser = await prisma.users.findFirst({
      where: { id },
    });
    if (!existingUser && existingUser === null) {
      throw new Error('User not found');
    }
    const response = await axios.get(url);
    if (response.data.results[1]?.geometry?.lat === undefined) {
      lat = response.data.results[0]?.geometry?.lat;
      lon = response.data.results[0]?.geometry?.lng;
    } else {
      lat = response.data.results[1]?.geometry?.lat;
      lon = response.data.results[1]?.geometry?.lng;
    }

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
