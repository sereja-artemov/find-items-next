export default function Button({onClick, text}) {
  return (
    <div className="inline-flex w-full max-w-[456px] rounded-full border-4 border-[#2b8c97] p-1 text-white shadow-[inset_0_0_0_2px_#dfbbd4] transition-colors duration-150 ease-in-out">
      <div className="w-full max-w-none overflow-hidden rounded-full bg-gradient-to-br from-[#ff9afc] to-[#ee40a8] bg-cover bg-center bg-no-repeat p-1.5">
        <button
          onClick={onClick}
          type="button"
          className="text-20 text-none leading-7.5 h-15 font-montserrat text-shadow-lg m-0 inline-flex w-full max-w-[440px] flex-row items-center justify-center overflow-hidden whitespace-nowrap rounded-full border-0 !bg-[url('/img/game/btn-bg.png')] bg-gradient-to-r from-[#ff9afc] to-[#ee40a8] bg-cover bg-center bg-no-repeat px-6 py-2.5 text-center align-top font-bold text-white transition-colors duration-150 ease-in-out"
        >
          {text}
        </button>
      </div>
    </div>
  );
}
