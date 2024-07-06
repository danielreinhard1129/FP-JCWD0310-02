import prisma from '@/prisma';

export const getEmployesService = async () => {
  try {
    const response = await prisma.employee.findMany({
      include: { user: { select: { firstName: true } } },
      where: { warehouse: null },
    });
    return response;
  } catch (error) {}
};
