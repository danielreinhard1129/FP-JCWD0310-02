export default function CategoryPage() {
  return (
    <div className="flex gap-8">
      <div
        className={`bg-[url('/landing_page/pic1.png')]  w-[361px] h-[460px] rounded-xl flex flex-col justify-end font-poppins  `}
      >
        <button
          className={
            'tracking-wide text-lg bg-[#3252DF] mx-20 p-3 rounded-lg  mb-10 text-center text-white font-semibold'
          }
        >
          Ladies
        </button>
      </div>
      <div
        className={`bg-[url('/landing_page/pic1.png')]  w-[361px] h-[460px] rounded-xl flex flex-col justify-end `}
      >
        <button
          className={
            ' tracking-wide text-lg bg-[#3252DF] mx-20 p-3 rounded-lg  mb-10 text-center text-white font-semibold'
          }
        >
          Man
        </button>
      </div>
      <div
        className={`bg-[url('/landing_page/pic1.png')]  w-[361px] h-[460px] rounded-xl flex flex-col justify-end `}
      >
        <button
          className={
            'tracking-wide text-lg bg-[#3252DF] mx-20 p-3 rounded-lg  mb-10 text-center text-white font-semibold'
          }
        >
          Kids
        </button>
      </div>
    </div>
  );
}
