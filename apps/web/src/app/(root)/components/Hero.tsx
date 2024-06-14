export default function HeroPage() {
  return (
    // <div
    //   className={` relative bg-[url('/landing_page/image15.png')] w-full max-md:h-[382px]  h-[750px] rounded-[65px] text-white bg-cover   bg-center bg-no-repeat`}
    // >
    //   <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50  rounded-[65px] font-sans"></div>

    //   <div className="absolute max-md:bottom-4 max-md:left-4 md:bottom-12 md:left-12 flex-col justify-start items-start inline-flex font-sans max-md:text-sm">
    //     <div className="md:text-[74px] font-semibold max-md:text-2xl">
    //       NIKE AIR MAX
    //     </div>
    //     <div className="w-[490px] text-stone-200 md:text-2xl font-semibold ">
    //       Nike introducing the new air max for everyone's comfort
    //     </div>
    //     <button className="p-4 rounded-xl bg-[#3252DF] text-white mt-7 font-semibold ">
    //       View All Products
    //     </button>
    //   </div>

    //   <div className="absolute bottom-12 right-12 space-y-6">
    //     <div
    //       className={` relative bg-[url('/landing_page/image15.png')] w-40 h-40  rounded-3xl text-white bg-cover bg-repeat bg-center border-2 border-white`}
    //     ></div>
    //     <div
    //       className={` relative bg-[url('/landing_page/image15.png')] w-40 h-40  rounded-3xl text-white bg-cover bg-repeat bg-center border-2 border-white`}
    //     ></div>
    //   </div>
    // </div>
    <div
      className={`relative bg-[url('/landing_page/image15.png')] w-full max-md:h-[382px] h-[750px] rounded-[65px] text-white bg-cover bg-center bg-no-repeat`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 rounded-[65px] font-sans"></div>

      <div className="absolute max-md:bottom-4 max-md:left-4 md:bottom-12 md:left-12 flex-col justify-start items-start inline-flex font-sans max-md:text-sm">
        <div className="md:text-[74px] font-semibold max-md:text-2xl">
          NIKE AIR MAX
        </div>
        <div className="w-[490px] text-stone-200 md:text-2xl font-semibold">
          Nike introducing the new air max for everyone's comfort
        </div>
        <button className="p-4 rounded-xl bg-[#3252DF] text-white mt-7 font-semibold">
          View All Products
        </button>
      </div>

      <div className="absolute bottom-12 right-12 space-y-6">
        <div
          className={`relative bg-[url('/landing_page/image15.png')] w-40 h-40 rounded-3xl text-white bg-cover bg-repeat bg-center border-2 border-white hidden md:block`}
        ></div>
        <div
          className={`relative bg-[url('/landing_page/image15.png')] w-40 h-40 rounded-3xl text-white bg-cover bg-repeat bg-center border-2 border-white hidden md:block`}
        ></div>
      </div>
    </div>
  );
}
