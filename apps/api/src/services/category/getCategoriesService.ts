import prisma from '@/prisma';

export const getCategoriesService = async () => {
  try {
    const categories = await prisma.category.findMany({});
    const variants = await prisma.variant.findMany();
    const uniqueVariants = variants.reduce(
      (a: { color: string[]; size: string[] }, b) => {
        const tempObj = a;
        if (a.color.indexOf(b.color) == -1 && b.color.length)
          tempObj.color.push(b.color);
        if (a.size.indexOf(b.size) == -1 && b.size.length)
          tempObj.size.push(b.size);
        return tempObj;
      },
      {
        color: [],
        size: [],
      },
    );
    return { categories, variants: uniqueVariants };
  } catch (error) {
    throw error;
  }
};
