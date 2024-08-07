import { BsFacebook, BsInstagram, BsTiktok, BsTwitter } from 'react-icons/bs';
import { Label } from './ui/label';
import logoWhite from '../../public/logo-white.png';
import Image from 'next/image';

export const Footer = () => {
  return (
    <footer className="w-full mt-20 flex flex-col items-center relative ">
      <div className="w-full rounded-[20px] px-4 md:px-10 bg-primary relative overflow-hidden">
        <div className="w-full py-10 flex flex-col md:flex-row justify-between gap-4">
          <div className="text-primary-foreground md:text-base text-sm tracking-tight">
            <Label className="md:text-2xl text-xl font-rubik font-bold text-[#FFA52F]">
              About Us
            </Label>
            <div className="font-rubik">
              <p>We are the biggest hyperstore in the universe.</p>
              <p>We got you all cover with our exclusive</p>
              <p>collections and latest drops.</p>
            </div>
          </div>
          <div className="text-primary-foreground md:text-base text-sm tracking-tight">
            <Label className="md:text-2xl text-xl text-[#FFA52F] font-rubik font-bold">
              Categories
            </Label>
            <div className="font-rubik">
              <p>Runners</p>
              <p>Sneakers</p>
              <p>Basketball</p>
              <p>Outdoor</p>
              <p>Golf</p>
              <p>Hiking</p>
            </div>
          </div>
          <div className="text-primary-foreground md:text-base text-sm tracking-tight">
            <Label className="md:text-2xl text-xl text-[#FFA52F] font-rubik font-bold">
              Company
            </Label>
            <div className="font-rubik">
              <p>About</p>
              <p>Contact</p>
              <p>Blogs</p>
            </div>
          </div>
          <div className="text-primary-foreground md:text-base text-sm tracking-tight">
            <Label className="md:text-2xl text-xl text-[#FFA52F] font-rubik font-bold">
              Follow Us
            </Label>
            <div className="flex md:justify-between gap-4 md:gap-0 mt-2">
              <BsFacebook />
              <BsInstagram />
              <BsTwitter />
              <BsTiktok />
            </div>
          </div>
        </div>
        <Image alt="logo" src={logoWhite} className="w-full h-auto" />
      </div>
      {/* <Label className="my-2">@Copyright KicksIn</Label> */}
    </footer>
  );
};
