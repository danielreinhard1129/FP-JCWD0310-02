import prisma from '@/prisma';

export const getCategoriesService = async () => {
  try {
    const categories = await prisma.category.findMany({});
    return categories;
  } catch (error) {
    throw error;
  }
};
