import React from 'react'
import Image from "next/image";

export default function FirstScreen({setIsStartScreen}) {
  function onClick() {
    setIsStartScreen(false);
  }

  return (
    <section className="absolute bg-[url(/img/game/start-bg.jpg)] scrollbar-hidden z-20 flex overflow-auto justify-start flex-col items-center w-full h-full -translate-x-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-md left-1/2 top-1/2">
      <Image
        width="68"
        height="64"
        src="/img/logo.png"
        alt="логотип"
        className="my-10 logo"
      />
      <div className='relative'>
        <Image width={817} height={584} src="img/game/main-img-x2.png" priority alt="" />
        <div className='absolute top-[84%] left-1/2 w-[70%] max-w-[304px] z-50 animate-[b_1.5s_ease-in-out_infinite] transform -translate-x-1/2 -rotate-5 skew-x-[-10deg] inline-flex p-1 rounded-full border-4 border-[#2b8c97] shadow-[inset_0_0_0_2px_#dfbbd4] transform -translate-x-1/2 rotate-[-5deg] skew-[-10deg]'>
          <button onClick={onClick} className='text-20 no-underline p-2.5 leading-7 h-15 text-center border-0 m-0 font-bold px-6 text-xl rounded-full max-w-xs whitespace-nowrap overflow-hidden shadow-md relative bg-[url(/img/game/btn-bg.png)] bg-no-repeat bg-center bg-cover bg-gradient-to-r from-[#ff9afc] to-[#ee40a8] text-white w-full transition-colors duration-150 ease-in-out'>Начать игру</button>
        </div>
      </div>
    </section>
  )
}
