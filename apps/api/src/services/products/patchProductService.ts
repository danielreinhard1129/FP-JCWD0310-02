import prisma from '@/prisma';
import { Product } from '@prisma/client';
import fs from 'fs';
import { join } from 'path';

interface UpdateProductParams extends Pick<Product, 'name' | 'description'> {
  productCategory: string[];
  user: {
    id: number;
  };
}

export const patchProductService = async (
  id: number,
  body: UpdateProductParams,
  files: Express.Multer.File[],
) => {
  try {
    const { name, description, productCategory, user: userData } = body;

    const user = await prisma.users.findFirst({
      where: { id: userData.id },
      include: { employee: true },
    });

    if (!user) {
      return {
        message: 'You are not authorize for update product!',
      };
    }

    if (!user.employee || user.role !== 'SUPER_ADMIN') {
      return {
        message: 'You are not authorize for update product!',
      };
    }

    const product = await prisma.product.findFirst({
      where: { id },
    });

    if (!product) {
      return {
        message: 'Cannot found the product',
      };
    }

    const updateProduct = await prisma.$transaction(async (tx) => {
      try {
        const newProduct = await tx.product.update({
          where: { id: product.id },
          data: { name, description },
        });

        const productImages = await tx.productImages.findMany({
          where: { productId: newProduct.id },
        });

        if (productImages.length && files.length) {
          productImages.map((val) => {
            const imagePath = join(__dirname, '../../..' + val.url);
            if (fs.existsSync(imagePath)) {
              fs.unlinkSync(imagePath);
            }
          });
          const deleteImage = await tx.productImages.deleteMany({
            where: { productId: newProduct.id },
          });
        }

        if (files.length) {
          const newImages = await tx.productImages.createMany({
            data: files.map((val) => {
              return {
                productId: newProduct.id,
                url: `/public/images/${val.filename}`,
              };
            }),
            skipDuplicates: true,
          });
        }
        return newProduct;
      } catch (error) {
        throw error;
      }
    });

    return {
      messages: 'Success Update',
      data: updateProduct,
    };
  } catch (error) {
    throw error;
  }
};
