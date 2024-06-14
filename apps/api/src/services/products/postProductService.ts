import prisma from '@/prisma';
import { Category, Product, Variant, VariantStocks } from '@prisma/client';

interface VariantWithStocks extends Pick<Variant, 'size' | 'color'> {
  stock: Pick<VariantStocks, 'quantity'>;
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

// IMAGE POST RESPONSE FROM MULTER
// "image": [
//         {
//             "fieldname": "image",
//             "originalname": "sepatu.jpg.jpg",
//             "encoding": "7bit",
//             "mimetype": "image/jpeg",
//             "destination": "C:\\Users\\sdhz\\Desktop\\purwadhika\\FP-JCWD0310-02\\apps\\api\\public/images",
//             "filename": "IMG1718303296494.jpg",
//             "path": "C:\\Users\\sdhz\\Desktop\\purwadhika\\FP-JCWD0310-02\\apps\\api\\public\\images\\IMG1718303296494.jpg",
//             "size": 78690
//         },
//         {
//             "fieldname": "image",
//             "originalname": "snippet.png",
//             "encoding": "7bit",
//             "mimetype": "image/png",
//             "destination": "C:\\Users\\sdhz\\Desktop\\purwadhika\\FP-JCWD0310-02\\apps\\api\\public/images",
//             "filename": "IMG1718303296495.png",
//             "path": "C:\\Users\\sdhz\\Desktop\\purwadhika\\FP-JCWD0310-02\\apps\\api\\public\\images\\IMG1718303296495.png",
//             "size": 1563011
//         }
//     ]

export const PostProductService = async (body: CreateProductParams) => {
  try {
    const {
      user: userId,
      warehouseId,
      product,
      image,
      category,
      variant,
    } = body;

    const user = await prisma.users.findFirst({
      where: {
        id: Number(userId.id),
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
          return new Error('Product title is used!');
        }

        const newProduct = await tx.product.create({
          data: product,
        });

        const imageData = await tx.productImages.createMany({
          data: image.map((val) => {
            return { productId: newProduct.id, url: val.path };
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
            quantity:
              productVariantStock[`${val.color}_${[val.size]}`].quantity,
            warehouseId,
          };
        });

        const newVariantStock = await tx.variantStocks.createMany({
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
      messages: 'Success create product',
      data: createProduct,
    };
  } catch (error) {
    throw error;
  }
};
