export default function HeroPage() {
  return (
    <div
      className={`bg-[url('/landing_page/hero1.png')] h-[512px]  bg-cover bg-no-repeat text-white font-poppins  font-medium text-2xl flex flex-col justify-end`}
    >
      <div className=" text-center mb-16 ">
        <div>T-SHIRT</div>
        <div>KOLEKSI T-SHIRT LADIES</div>
        <button className={'text-lg bg-[#3252DF] p-3 rounded-lg mt-8'}>
          Show Products
        </button>
      </div>
    </div>
  );
}
