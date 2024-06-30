'use client';
import { InputImages } from '@/components/InputImages';
import { PreviewImages } from '@/components/PreviewImages';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetTransaction } from '@/hooks/transactions/useGetTransaction';
import { usePostPaymentProof } from '@/hooks/transactions/usePostPaymentProof';
import { useNotification } from '@/hooks/useNotification';
import { BASE_API_URL } from '@/utils/config';
import { Separator } from '@radix-ui/react-separator';
import { Trash, X } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { FileWithPath } from 'react-dropzone';

const TransactionsPage = () => {
  const query = useSearchParams();
  const { openNotification } = useNotification();
  const formatPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
  const { data, isError, refetch } = useGetTransaction(
    query.get('payment') || '',
  );
  const [fileImage, setFileImage] = useState<FileWithPath>();
  const imageResults = useMemo(() => {
    if (fileImage) {
      return URL.createObjectURL(fileImage);
    }
  }, [fileImage]);
  const { mutateAsync } = usePostPaymentProof();
  const handlePostPaymentProof = () => {
    if (fileImage) {
      openNotification.async(
        mutateAsync({
          images: fileImage,
          invoiceNumber: query.get('payment') || '',
        }),
        () => refetch(),
      );
    }
  };

  if (isError || !data) {
    return (
      <div className="w-full min-h-[60vh] gap-2 font-rubik flex flex-col justify-center items-center">
        <Label className="text-3xl font-bold">Something is error</Label>
        <Label className="font-semibold text-lg">
          We cannot find your transactions
        </Label>
      </div>
    );
  }

  if (!isError && data) {
    return (
      <div className="w-full h-full gap-8 flex flex-col font-rubik">
        <Card>
          <CardHeader>
            <CardTitle>
              Orders Detail : {data.data.transaction.invoiceNumber}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <Label>
                Transaction date :{' '}
                {new Date(data.data.order.createdAt).toLocaleString()}
              </Label>
              <Label>Status : {data.data.order.status}</Label>
              {/* <Label>Status : {data.data.order.}</Label> */}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Products Detail</CardTitle>
          </CardHeader>
          <CardContent>
            <Separator />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Product Variant</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.order.orderItems.map((val, indx) => {
                  return (
                    <TableRow key={indx}>
                      <TableCell>{val.product.name}</TableCell>
                      <TableCell>
                        {val.variant.color} {val.variant.size}
                      </TableCell>
                      <TableCell>{val.quantity}</TableCell>
                      <TableCell>
                        {formatPrice.format(val.quantity * val.product.price)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}></TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-4">
                      <Label className="flex justify-between">
                        Subtotal :
                        {formatPrice.format(
                          data.data.order.orderItems.reduce(
                            (a, b) => a + b.quantity * b.product.price,
                            0,
                          ),
                        )}
                      </Label>
                      <Label>Shipment : {formatPrice.format(50000)}</Label>
                      <Label>
                        Total :{' '}
                        {formatPrice.format(
                          data.data.order.orderItems.reduce(
                            (a, b) => a + b.quantity * b.product.price,
                            0,
                          ) + 50000,
                        )}
                      </Label>
                    </div>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Payment proof</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 justify-center items-center">
            <div className="flex justify-center items-center mt-4 mb-4 border-2 border-dashed rounded-xl">
              {data.data.transaction.paymentProof ? (
                <Image
                  alt="paymentProof"
                  src={`${BASE_API_URL}/assets/${data.data.transaction.paymentProof}`}
                  width={400}
                  height={400}
                  className="rounded-xl"
                />
              ) : (
                <div>
                  {imageResults ? (
                    <div className="relative">
                      <div
                        onClick={() => setFileImage(undefined)}
                        className="absolute w-8 h-8 rounded-full border-red-500 flex justify-center items-center right-[-30px] top-[-30px]"
                      >
                        <Trash className="text-red-500" />
                      </div>
                      <Image
                        alt="paymentProof"
                        src={imageResults}
                        width={400}
                        height={400}
                        className="rounded-xl"
                      />
                    </div>
                  ) : (
                    <div className="flex min-w-60 min-h-60 w-full px-6 py-6 h-full justify-center items-center">
                      <Label className="text-2xl font-bold">
                        No payment proof yet!
                      </Label>
                    </div>
                  )}
                  <div className="w-full">
                    <InputImages
                      isError={false}
                      label=""
                      onDrop={(e) => setFileImage(e[0])}
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="font-rubik flex justify-center items-center mt-4">
            <Button
              disabled={!!data.data.transaction.paymentProof}
              onClick={handlePostPaymentProof}
            >
              {!data.data.transaction.paymentProof
                ? 'Submit payment proof'
                : 'Waiting Admin Confirmation'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
};

export default TransactionsPage;
