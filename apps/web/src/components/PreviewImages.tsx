'use client';
import Image from 'next/image';
import { FC, useMemo } from 'react';
import { Trash2 } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { Card, CardContent } from './ui/card';
import { Label } from './ui/label';

interface PreviewImagesProps {
  fileImages?: File[];
  images?: string[];
  onRemoveImage: (index: number) => void;
}

export const PreviewImages: FC<PreviewImagesProps> = ({
  onRemoveImage,
  fileImages,
  images,
}) => {
  const imageResults = useMemo(() => {
    if (fileImages) {
      return fileImages.map((image) => URL.createObjectURL(image));
    }

    return images;
  }, [fileImages, images]);

  return (
    <Carousel className="w-full border border-input rounded-xl p-2 bg-slate-200">
      <CarouselContent>
        {imageResults && imageResults.length ? (
          imageResults.map((val, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6 relative">
                    <div className="absolute top-0 right-0 p-2">
                      <div
                        onClick={() => onRemoveImage(index)}
                        className="rounded-lg border border-input transition-all duration-300 group hover:bg-red-500 cursor-pointer w-8 h-8 flex justify-center items-center"
                      >
                        <Trash2
                          width={20}
                          className="text-red-500 group-hover:text-black transition-all duration-300"
                        />
                      </div>
                    </div>
                    <Image
                      src={val}
                      alt="image"
                      width={200}
                      height={200}
                      className="w-full h-full rounded-lg"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))
        ) : (
          <CarouselItem>
            <Card>
              <CardContent className="flex aspect-square items-center justify-center">
                <Label>No Images....Please upload your images</Label>
              </CardContent>
            </Card>
          </CarouselItem>
        )}
      </CarouselContent>
      <CarouselPrevious className="left-4 border-black" />
      <CarouselNext className="right-4 border-black" />
    </Carousel>
  );
};
