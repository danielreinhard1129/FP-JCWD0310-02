import prisma from '@/prisma';
import { CreateProductParams } from '@/types/product.type';
import { Product, Variant, VariantStock } from '@prisma/client';

export const postProductService = async (body: CreateProductParams) => {
  try {
    if (!body.user) {
      throw new Error('Please Login');
    }
    const userId = Number(body.user.id);
    const product = {
      name: body.product.name,
      description: body.product.description,
      price: Number(body.product.price),
    };
    const { image, variant, categories } = body;

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
    if (!user || !user.employee)
      throw new Error('We cannot find your user data as employee');

    // Validation for user credential as super admin
    if (user.role !== 'SUPER_ADMIN') {
      throw new Error('You are not a super admin');
    }

    const warehouseId = Number(body.warehouseId) || user.employee.warehouseId;

    // Validation for body parameter
    if (
      !product.name &&
      !product.description &&
      !categories &&
      variant.length < 1
    ) {
      return new Error('Something is error with the input data');
    }
    const categoryObj = categories.map((val) => {
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
          throw new Error('Product title is used!');
        }

        const newProduct = await tx.product.create({
          data: product,
        });

        const imageData = await tx.productImage.createMany({
          data: image.map((val) => {
            return {
              productId: newProduct.id,
              url: `images/${val.filename}`,
            };
          }),
          skipDuplicates: true,
        });

        const newCategory = await tx.category.createMany({
          data: categoryObj,
          skipDuplicates: true,
        });

        const existCategory = await tx.category.findMany({
          where: {
            OR: categories.map((val) => {
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

        const allWarehouses = await tx.warehouse.findMany({});
        const allProductVariant = await tx.variant.findMany({
          where: {
            productId: newProduct.id,
          },
        });
        const variantStocksBatchArr = allWarehouses.reduce((a: any, b) => {
          return [
            ...a,
            ...allProductVariant.map((val) => {
              return {
                quantity: 0,
                variantId: val.id,
                warehouseId: b.id,
              };
            }),
          ];
        }, []);

        const variantStock = await tx.variantStock.createMany({
          data: variantStocksBatchArr,
        });

        return {
          message: 'Success creating product',
          product: newProduct,
          image: imageData,
          category: existCategory,
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
