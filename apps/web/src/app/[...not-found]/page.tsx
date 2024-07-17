import { Label } from '@/components/ui/label';
import React from 'react';
import logo from '../../../public/logo-dark.png';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();
  return (
    <div className="bg-[#E7E7E3] p-[10vw] h-screen w-screen overflow-hidden flex flex-col gap-12 justify-center items-center font-rubik">
      <div className="flex md:flex-row flex-col gap-2 justify-center items-center">
        <Label className="font-bold text-[70px] font-rubik">404</Label>
        <Label className="font-bold text-4xl font-rubik">Not Found</Label>
      </div>
      <Label className="font-bold text-3xl text-center">
        SORRY THIS PAGE CURRENTLY IS NOT AVAILABLE
      </Label>
      <div className="flex flex-col gap-4 justify-center items-center">
        <Label className="font-bold text-xl text-center">
          But don&apos;t worry we can assist you to the right way
        </Label>
        <Button onClick={() => router.push('/')} className="w-fit">
          Here&apos;s the way my lord
        </Button>
      </div>
    </div>
  );
};

export default page;
