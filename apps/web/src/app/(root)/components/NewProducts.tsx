import Image from 'next/image';

export default function NewProducts() {
  return (
    <>
      <div className="flex flex-wrap justify-center lg:justify-between gap-6">
        <div className="flex flex-col gap-y-6  sm:w-6 lg:w-72">
          <div className="relative bg-white w-full h-80 p-3 rounded-3xl">
            <Image
              width={400}
              height={400}
              src="/landing_page/foot.png"
              alt=""
              className="w-full h-full object-cover object-center rounded-3xl"
            />
            <div className="absolute p-2 px-8 top-3 left-3 text-lg text-white font-semibold bg-indigo-500 rounded-tl-xl rounded-br-xl">
              New
            </div>
          </div>
          <div className="text-2xl font-semibold">
            ADIDAS 4DFWD X PARLEY RUNNING SHOES
          </div>
          <button className="p-4 rounded-xl bg-neutral-800 text-white font-semibold">
            View Products
          </button>
        </div>

        <div className="flex flex-col gap-y-6  sm:w-6  lg:w-72">
          <div className="relative bg-white w-full h-80 p-3 rounded-3xl">
            <Image
              width={400}
              height={400}
              src="/landing_page/foot.png"
              alt=""
              className="w-full h-full object-cover object-center rounded-3xl"
            />
            <div className="absolute p-2 px-8 top-3 left-3 text-lg text-white font-semibold bg-indigo-500 rounded-tl-xl rounded-br-xl">
              New
            </div>
          </div>
          <div className="text-2xl font-semibold">
            ADIDAS 4DFWD X PARLEY RUNNING SHOES
          </div>
          <button className="p-4 rounded-xl bg-neutral-800 text-white font-semibold">
            View Products
          </button>
        </div>
        <div className="flex flex-col gap-y-6  sm:w-6 lg:w-72">
          <div className="relative bg-white w-full h-80 p-3 rounded-3xl">
            <Image
              width={400}
              height={400}
              src="/landing_page/foot.png"
              alt=""
              className="w-full h-full object-cover object-center rounded-3xl"
            />
            <div className="absolute p-2 px-8 top-3 left-3 text-lg text-white font-semibold bg-indigo-500 rounded-tl-xl rounded-br-xl">
              New
            </div>
          </div>
          <div className="text-2xl font-semibold">
            ADIDAS 4DFWD X PARLEY RUNNING SHOES
          </div>
          <button className="p-4 rounded-xl bg-neutral-800 text-white font-semibold">
            View Products
          </button>
        </div>
        <div className="flex flex-col gap-y-6  sm:w-6  lg:w-72">
          <div className="relative bg-white w-full h-80 p-3 rounded-3xl">
            <Image
              width={400}
              height={400}
              src="/landing_page/foot.png"
              alt=""
              className="w-full h-full object-cover object-center rounded-3xl"
            />
            <div className="absolute p-2 px-8 top-3 left-3 text-lg text-white font-semibold bg-indigo-500 rounded-tl-xl rounded-br-xl">
              New
            </div>
          </div>
          <div className="text-2xl font-semibold">
            ADIDAS 4DFWD X PARLEY RUNNING SHOES
          </div>
          <button className="p-4 rounded-xl bg-neutral-800 text-white font-semibold">
            View Products
          </button>
        </div>
      </div>
    </>
  );
}
