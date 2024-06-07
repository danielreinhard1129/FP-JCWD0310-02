export default function MostPopuler() {
  return (
    <>
      <div
        className={` w-[1141px] h-[512px]  bg-cover bg-no-repeat  font-poppins  font-medium  `}
      >
        <div className="text-2xl font-bold text-[#152C5B] mb-10 ">
          Most Populer
        </div>
        <div className=" flex b-16 mt-4 gap-8">
          <div
            className={`bg-[url('/landing_page/pic1.png')]  w-[361px] h-[460px] rounded-xl `}
          ></div>
          <div className="flex gap-8">
            <div className="flex flex-col gap-y-8">
              <div
                className={`bg-[url('/landing_page/pic1.png')]  w-[361px] h-[210px] rounded-xl `}
              >
                apa
              </div>
              <div
                className={`bg-[url('/landing_page/pic1.png')]  w-[361px] h-[210px] rounded-xl `}
              >
                apa
              </div>
            </div>
            <div className="flex flex-col gap-y-8">
              {' '}
              <div
                className={`bg-[url('/landing_page/pic1.png')]  w-[361px] h-[210px] rounded-xl `}
              >
                yakin
              </div>
              <div
                className={`bg-[url('/landing_page/pic1.png')]  w-[361px] h-[210px] rounded-xl `}
              >
                yakin
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
