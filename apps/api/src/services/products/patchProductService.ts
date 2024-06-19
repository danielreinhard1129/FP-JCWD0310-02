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
      throw new Error('You are not authorize for update product!');
    }

    if (!user.employee || user.role !== 'SUPER_ADMIN') {
      throw new Error('You are not authorize for update product!');
    }

    const product = await prisma.product.findFirst({
      where: { id },
    });

    if (!product) {
      throw new Error('Cannot found the product');
    }

    const updateProduct = await prisma.$transaction(async (tx) => {
      try {
        const newProduct = await tx.product.update({
          where: { id: product.id },
          data: { name, description },
        });

        const newCategory = await tx.category.createMany({
          data: productCategory.map((val) => {
            return { name: val };
          }),
          skipDuplicates: true,
        });

        const existCategory = await tx.category.findMany({
          where: {
            name: {
              in: productCategory,
            },
          },
        });

        const deleteProductCategory = await tx.productCategory.deleteMany({
          where: {
            productId: newProduct.id,
          },
        });

        const newProductCategory = await tx.productCategory.createMany({
          data: existCategory.map((val) => {
            return {
              productId: newProduct.id,
              CategoryId: val.id,
            };
          }),
        });

        const productImages = await tx.productImage.findMany({
          where: { productId: newProduct.id },
        });

        if (productImages.length && files.length) {
          productImages.map((val) => {
            const imagePath = join(__dirname, '../../..' + val.url);
            if (fs.existsSync(imagePath)) {
              fs.unlinkSync(imagePath);
            }
          });
          const deleteImage = await tx.productImage.deleteMany({
            where: { productId: newProduct.id },
          });
        }

        if (files.length) {
          const newImages = await tx.productImage.createMany({
            data: files.map((val) => {
              return {
                productId: newProduct.id,
                url: `images/${val.filename}`,
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
