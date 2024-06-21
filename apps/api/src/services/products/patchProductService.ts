import prisma from '@/prisma';
import { Prisma, Product, Variant } from '@prisma/client';
import fs from 'fs';
import { join } from 'path';

interface UpdateProductParams {
  categories: string[];
  user: {
    id: number;
  };
  images: Express.Multer.File[];
  product?: {
    name: string;
    description: string;
    price: number;
  };
  variant: Variant[];
  isDelete: boolean;
}

export const patchProductService = async (
  id: number,
  body: UpdateProductParams,
) => {
  try {
    const { categories, variant, images, isDelete, user: userData } = body;
    const productParam = body.product
      ? body.product
      : { name: undefined, description: undefined, price: undefined };
    const { description, name, price } = productParam;

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
          data: {
            name,
            description,
            isDelete,
            price: price ? Number(price) : undefined,
          },
        });

        const existVariant = await tx.variant.findMany({
          where: { productId: newProduct.id },
        });

        const uniqueVariant = variant.reduce(
          (a: Prisma.VariantCreateManyInput[], b) => {
            if (
              existVariant.every((c) => c.color != b.color || c.size != b.size)
            ) {
              a.push({
                color: b.color,
                size: b.size,
                productId: newProduct.id,
                isDelete: false,
              });
            }
            return a;
          },
          [],
        );

        const newVariant = await tx.variant.createMany({
          data: uniqueVariant,
        });

        const newCategory = await tx.category.createMany({
          data: categories.map((val) => {
            return { name: val };
          }),
          skipDuplicates: true,
        });

        const existCategory = await tx.category.findMany({
          where: {
            name: {
              in: categories,
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

        if (images.length) {
          productImages.map((val) => {
            const imagePath = join(__dirname, '../../..' + val.url);
            if (fs.existsSync(imagePath)) {
              fs.unlinkSync(imagePath);
            }
          });
          const deleteImage = await tx.productImage.deleteMany({
            where: { productId: newProduct.id },
          });
          const newImages = await tx.productImage.createMany({
            data: images.map((val) => {
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
      images,
    };
  } catch (error) {
    throw error;
  }
};
