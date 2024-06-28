export default function Categories() {
  return (
    <>
      <div className="relative bg-black w-full my-4 flex flex-col text-white items-center h-[824px] ">
        <div className="flex justify-between items-end w-[1320px] mt-10">
          <div className="uppercase flex flex-col">
            <div className="text-[74px] font-bold">Categories</div>
          </div>
          <div className="h-12 px-8 py-2 rounded-lg justify-center items-center inline-flex gap-7">
            <div className="flex-col justify-start items-start gap-2.5 inline-flex">
              <div className="h-10 px-3 py-2 bg-stone-200 rounded-lg justify-center items-center gap-1 inline-flex">
                <div className="w-4 h-4 relative"></div>
              </div>
            </div>
            <div className="flex-col justify-start items-start gap-2.5 inline-flex">
              <div className="h-10 px-3 py-2 bg-stone-200 rounded-lg justify-center items-center gap-1 inline-flex">
                <div className="w-4 h-4 relative"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute right-0 w-[1380px] h-[600px] bottom-0 rounded-tl-[48px] bg-gray-100">
          <div className="absolute flex p-5 h-full w-full gap-5">
            {' '}
            <div
              className={`  bg-[url('/landing_page/foot.png')] w-full h-full  rounded-3xl text-white bg-cover bg-repeat bg-center border-2 `}
            ></div>
            <div
              className={` bg-[url('/landing_page/foot.png')] w-full h-full   rounded-3xl text-white bg-cover bg-repeat bg-center border-2 `}
            ></div>
          </div>
        </div>
      </div>
    </>
    // <>
    //   { <div className="w-[1440px] h-[824px] relative">
    //     <div className="w-[1440px] h-[824px] left-[1440px] top-0 absolute origin-top-left rotate-180 bg-neutral-800"></div>
    //     <div className="w-[1320px] left-[60px] top-[90px] absolute justify-between items-end inline-flex">
    //       <div className="text-white text-[74px] font-semibold font-['Rubik'] uppercase leading-[70.30px]">
    //         Categories
    //       </div>
    //       <div className="justify-start items-center gap-4 flex">
    //         <div className="origin-top-left rotate-180 opacity-50 flex-col justify-start items-start gap-2.5 inline-flex">
    //           <div className="h-10 px-3 py-2 bg-stone-200 rounded-lg justify-center items-center gap-1 inline-flex">
    //             <div className="w-4 h-4 relative"></div>
    //           </div>
    //         </div>
    //         <div className="flex-col justify-start items-start gap-2.5 inline-flex">
    //           <div className="h-10 px-3 py-2 bg-stone-200 rounded-lg justify-center items-center gap-1 inline-flex">
    //             <div className="w-4 h-4 relative"></div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="w-[1380px] h-[600px] left-[60px] top-[224px] absolute rounded-tl-[48px] justify-start items-start inline-flex">
    //       <div className="grow shrink basis-0 self-stretch px-16 bg-gray-100 rounded-tl-[64px] justify-center items-center gap-2.5 flex">
    //         <div className="text-neutral-800 text-4xl font-semibold font-['Rubik'] uppercase">
    //           Lifestyle
    //           <br />
    //           Shoes
    //         </div>
    //         <div className="flex-col justify-start items-start gap-2.5 inline-flex">
    //           <div className="p-2 bg-neutral-800 rounded-lg justify-center items-center gap-1 inline-flex">
    //             <div className="w-8 h-8 relative"></div>
    //           </div>
    //         </div>
    //         <img
    //           className="w-[480px] h-[600px] origin-top-left rotate-180"
    //           src="https://via.placeholder.com/480x600"
    //         />
    //       </div>
    //       <div className="grow shrink basis-0 self-stretch px-16 bg-neutral-100 justify-center items-center gap-2.5 flex">
    //         <div className="text-neutral-800 text-4xl font-semibold font-['Rubik'] uppercase">
    //           Basketball
    //           <br />
    //           Shoes
    //         </div>
    //         <img
    //           className="w-[480px] h-[600px]"
    //           src="https://via.placeholder.com/480x600"
    //         />
    //         <div className="flex-col justify-start items-start gap-2.5 inline-flex">
    //           <div className="p-2 bg-neutral-800 rounded-lg justify-center items-center gap-1 inline-flex">
    //             <div className="w-8 h-8 relative"></div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
}
