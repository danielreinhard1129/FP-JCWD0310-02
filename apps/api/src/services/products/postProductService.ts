import prisma from '@/prisma';
import { Product, Variant, VariantStock } from '@prisma/client';

interface VariantWithStocks extends Pick<Variant, 'size' | 'color'> {
  stock: Pick<VariantStock, 'quantity'>;
}

interface CreateProductParams {
  user: {
    id: number;
  };
  warehouseId: number;
  product: Pick<Product, 'name' | 'description'>;
  category: string[];
  image: Express.Multer.File[];
  variant: VariantWithStocks[];
}

export const postProductService = async (body: CreateProductParams) => {
  try {
    const userId = Number(body.user.id);
    const warehouseId = Number(body.warehouseId);
    const { product, image, variant, category } = body;

    const user = await prisma.users.findFirst({
      where: {
        id: userId,
      },
      include: {
        employee: {
          include: { warehouse: true },
        },
      },
    });

    // Validation user data
    if (!user) throw new Error('We cannot find your user data');

    // Validation for user credential as super admin
    if (user.role !== 'SUPER_ADMIN') {
      throw new Error('You are not a super admin');
    }

    // Validation for body parameter
    if (
      !product.name &&
      !product.description &&
      !category &&
      variant.length < 1
    ) {
      return new Error('Something is error with the input data');
    }
    const categoryObj = category.map((val) => {
      return { name: val.charAt(0).toUpperCase() + val.slice(1) };
    });

    const createProduct = await prisma.$transaction(async (tx) => {
      try {
        const isExistTitle = await tx.product.findFirst({
          where: {
            name: body.product.name,
          },
        });

        if (isExistTitle) {
          return { messages: 'Product title is used!' };
        }

        const newProduct = await tx.product.create({
          data: product,
        });

        const imageData = await tx.productImage.createMany({
          data: image.map((val) => {
            return {
              productId: newProduct.id,
              url: `/public/images/${val.filename}`,
            };
          }),
        });

        const newCategory = await tx.category.createMany({
          data: categoryObj,
          skipDuplicates: true,
        });

        const existCategory = await tx.category.findMany({
          where: {
            OR: category.map((val) => {
              return {
                name: {
                  contains: val,
                },
              };
            }),
          },
        });

        const productCategoryObj = existCategory.map((val) => {
          return {
            productId: newProduct.id,
            CategoryId: val.id,
          };
        });

        const productCategory = await tx.productCategory.createMany({
          data: [...productCategoryObj],
          skipDuplicates: true,
        });

        const productVariant = variant.map((val) => {
          return {
            productId: newProduct.id,
            color: val.color,
            size: val.size,
          };
        });

        const newProductVariant = await tx.variant.createMany({
          data: [...productVariant],
        });

        const existProductVariant = await tx.variant.findMany({
          where: {
            productId: newProduct.id,
          },
        });

        const productVariantStock = variant.reduce((prev: any, val) => {
          return { ...prev, [`${val.color}_${val.size}`]: val.stock };
        }, {});

        const existProductVariantWithStock = existProductVariant.map((val) => {
          return {
            variantId: val.id,
            quantity: Number(
              productVariantStock[`${val.color}_${[val.size]}`].quantity,
            ),
            warehouseId,
          };
        });

        const newVariantStock = await tx.variantStock.createMany({
          data: existProductVariantWithStock,
        });

        return {
          product: newProduct,
          image: imageData,
          category: existCategory,
          variant: existProductVariant,
          stock: existProductVariantWithStock,
        };
      } catch (error) {
        throw error;
      }
    });

    return {
      ...createProduct,
    };
  } catch (error) {
    throw error;
  }
};
