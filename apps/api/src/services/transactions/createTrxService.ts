import prisma from '@/prisma';
import { nanoid } from 'nanoid';

type ProductWithQuantity = {
  id: number;
  quantity: number;
};

export const createTrxService = async (body: any) => {
  const { products, userId } = body;

  try {
    const productsWithQuantity: ProductWithQuantity[] = products.map(
      (product: any) => ({
        id: product.id,
        quantity: product.quantity,
      }),
    );

    const productsFromDB = await prisma.product.findMany({
      where: { id: { in: productsWithQuantity.map(({ id }) => id) } },
    });

    if (productsFromDB.length === 0) {
      throw new Error('Products not found');
    }

    const user = await prisma.users.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const transaction_id = `TRX-${nanoid(4)}-${nanoid(8)}`;
    const gross_amount = productsFromDB.reduce((acc, product) => {
      const productQuantity = productsWithQuantity.find(
        (p) => p.id === product.id,
      )?.quantity;
      return acc + (productQuantity ? productQuantity * product.price : 0);
    }, 0);

    console.log(gross_amount);

    const authString = btoa(`${process.env.MIDTRANS_SERVER_KEY}:`);

    const payload = {
      transaction_details: { order_id: transaction_id, gross_amount },
      item_details: productsFromDB.map((product) => ({
        id: product.id,
        price: product.price,
        quantity:
          productsWithQuantity.find((p) => p.id === product.id)?.quantity ?? 0,
        name: product.name,
      })),
      callbacks: {
        finish: `http://localhost:3000/order-status?transaction_id=${transaction_id}`,
        error: `http://localhost:3000/order-status?transaction_id=${transaction_id}`,
        pending: `http://localhost:3000/order-status?transaction_id=${transaction_id}`,
      },
    };

    const response = await fetch(
      'https://app.sandbox.midtrans.com/snap/v1/transactions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Basic ${authString}`,
        },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      throw new Error('Error! Failed to create transaction');
    }

    const data = await response.json();

    console.log(data.token);
    console.log(data.redirect_url);

    const order = await prisma.$transaction(async (tx) => {
      const createOrder = await tx.order.create({
        data: {
          id: transaction_id,
          status: 'WAIT_USER',
          total: gross_amount,
          shippingCost: 0,
          shippingDetail: 0,
          discount: 0,
          userId,
          warehouseId: 1,
          snap_token: data.token,
          snap_redirect_url: data.redirect_url,
        },
      });

      const detailOrder = await tx.orderItems.createMany({
        data: productsFromDB.map((item) => ({
          //   id: `TRX-ITEM-${nanoid(10)}`,
          orderId: transaction_id,
          productId: item.id,
          variantId: 1,
          //   quantity:
          //     productsWithQuantity.find((p) => p.id === item.id)?.quantity ?? 0,
        })),
      });

      const payment = await prisma.payments.create({
        data: {
          invoiceNumber: transaction_id,
          paymentMethod: 'MIDTRANS',
          snapToken: data.token,
          snapRedirectUrl: data.redirect_url,
          // orderId: createOrder.id,
        },
      });

      return createOrder;
    });

    return order;
  } catch (error) {
    throw error;
  }
};
