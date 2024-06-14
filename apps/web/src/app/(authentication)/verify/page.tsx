const verify = () => {
  return (
    <>
      <div className="flex flex-col h-screen w-screen justify-center items-center">
        <div className="w-1/4 flex flex-col gap-y-8">
          <div className="text-3xl text-center text-semibold">
            Verivy your email
          </div>
          <input className="w-full h-12 px-4 py-2.5 rounded-lg border border-neutral-800"></input>
          <button className="p-4 w-full bg-black text-white rounded-lg">
            verify
          </button>
        </div>
      </div>
    </>
  );
};
export default verify;
