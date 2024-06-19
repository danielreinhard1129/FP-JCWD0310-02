// import prisma from '@/prisma';
// import { User } from '@/types/user.type';

// export const registerService = async (body: User) => {
//   const { email, password, firstName, lastName } = body;

//   const existingUser = await prisma.users.findFirst({
//     where: { email },
//   });

//   if (existingUser) {
//     throw new Error('User already exists');
//   }

//   return await prisma.users.create({
//     data: { ...body, role: 'CUSTOMER', isDelete: false },
//   });
// };
