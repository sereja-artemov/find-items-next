import React from "react";
import Image from "next/image";

export default function FirstScreen({ setIsStartScreen, setMainImageLoading }) {
  function onClick() {
    setIsStartScreen(false);
  }

  return (
    <section className="absolute z-30 flex flex-col items-center justify-start w-full h-full m-auto overflow-hidden -translate-x-1/2 -translate-y-1/2 scrollbar-hidden left-1/2 top-1/2 bg-black/40 backdrop-blur-md">
      <div className="scrollbar-hide relative h-full overflow-y-auto bg-[#191226]">
        <div className='relative items-start z-10 flex min-h-full w-screen max-w-[1920px] justify-start bg-[url("/img/game/start-bg.jpg")] bg-cover bg-center bg-no-repeat'>
          <div className="w-screen p-4 text-center">
            <Image
              width="68"
              height="64"
              src="/img/logo.png"
              alt="логотип"
              className="mx-auto my-10 logo"
            />
            <div className="relative flex items-center justify-center">
              <Image
                width={817}
                height={584}
                onLoad={() => setMainImageLoading(false)}
                src="img/game/main-img-x2.png"
                priority
                alt=""
              />
              <div className="-rotate-5 skew-[-10deg] absolute left-1/2 top-[84%] z-50 inline-flex w-[70%] max-w-[304px] -translate-x-1/2 rotate-[-5deg] skew-x-[-10deg] transform animate-[b_1.5s_ease-in-out_infinite] rounded-full border-4 border-[#2b8c97] p-1 shadow-[inset_0_0_0_2px_#dfbbd4]">
                <button
                  onClick={onClick}
                  className="text-20 h-15 relative m-0 w-full max-w-xs overflow-hidden whitespace-nowrap rounded-full border-0 bg-[url(/img/game/btn-bg.png)] bg-gradient-to-r from-[#ff9afc] to-[#ee40a8] bg-cover bg-center bg-no-repeat p-2.5 px-6 text-center text-xl font-bold leading-7 text-white no-underline shadow-md transition-colors duration-150 ease-in-out"
                >
                  Начать игру
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
