'use client';
import Image from 'next/image';
import ShoesImage from '../../../../../public/sepatu.jpg';
import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

const ProductDetailPage = ({ params }: { params: { id: number } }) => {
  return (
    <>
      <title>Jaket Kulit</title>
      <section className="w-full bg-gray-300">
        <div
          id="content"
          className="p-4 grid md:grid-flow-col-dense grid-flow-row-dense gap-8"
        >
          <div
            id="left-content"
            className="w-full h-fit grid grid-cols-2 gap-4"
          >
            <Image alt="image" src={ShoesImage} className="" />
            <Image alt="image" src={ShoesImage} className="" />
            <Image alt="image" src={ShoesImage} className="" />
            <Image alt="image" src={ShoesImage} className="" />
          </div>
          <div
            id="right-content"
            className="md:w-[30vw] w-full flex flex-col gap-4"
          >
            <Button className="cursor-none text-xs w-28 p-2 h-10 bg-blue-500">
              New Release
            </Button>
            <Label className="font-bold text-2xl">
              ADIDAS 4DFWD X PARLEY RUNNING SHOES
            </Label>
            <Label className="font-bold text-lg text-blue-500">
              Rp.500.000,00
            </Label>
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <Label className="text-base">SIZE</Label>
                <Label className="underline font-medium text-xs">
                  SIZE CHART
                </Label>
              </div>
              <div
                id="size-select"
                className="grid grid-cols-[repeat(auto-fit,minmax(32px,32px))] gap-[2px] justify-between text-xs"
              >
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-md flex justify-center items-center">
                  XS
                </div>
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-md flex justify-center items-center">
                  S
                </div>
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-md flex justify-center items-center">
                  M
                </div>
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-md flex justify-center items-center">
                  L
                </div>
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-md flex justify-center items-center">
                  XL
                </div>
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-md flex justify-center items-center">
                  XXL
                </div>
              </div>
            </div>
            <div id="button-group" className="gap-1 flex flex-col">
              <div className="flex gap-1 w-full">
                <div className="basis-full font-bold text-sm flex justify-center items-center bg-primary text-primary-foreground rounded-md">
                  Add To Cart
                </div>
                <div className="w-8 h-8 basis-10 bg-primary grid justify-center rounded-md items-center">
                  <Heart className="text-primary-foreground" width={16} />
                </div>
              </div>
              <div className="w-full h-8 bg-blue-500 text-sm font-bold rounded-md flex justify-center items-center font-bold text-primary-foreground">
                BUY IT NOW
              </div>
            </div>
            <div>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Repudiandae suscipit aperiam fugit ut nemo fuga iure amet
                tenetur, assumenda omnis earum maiores? Omnis qui voluptatibus
                autem veritatis totam, voluptatem doloribus!
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetailPage;
