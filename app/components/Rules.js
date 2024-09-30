import React from 'react'

export default function Rules({setIsRules, setIsGameStarted}) {
  function onClick() {
    setIsRules(false);
    setIsGameStarted(true);
  }

  return (
    <section className='absolute z-20 flex flex-col items-center justify-center w-full h-full -translate-x-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-md left-1/2 top-1/2'>
      <h1 className='mb-5 text-2xl font-bold uppercase'>Как играть</h1>
      <p className='max-w-2xl mb-8 text-center'>Найдите в гримёрной 15 предметов из списка внизу и нажмите
      на них. Чем больше вещей обнаружили — тем ближе ваша победа.</p>

      <div className="border-4 border-[#2b8c97] shadow-[inset_0_0_0_2px_#dfbbd4] inline-flex w-full max-w-[456px] p-1 rounded-full text-white transition-colors duration-150 ease-in-out">
        <button onClick={onClick} type="button" className="inline-flex w-full flex-row items-center justify-center align-top text-20 text-none py-2.5 px-6 leading-7.5 h-15 text-center border-0 m-0 font-montserrat font-bold rounded-full max-w-[440px] whitespace-nowrap overflow-hidden text-shadow-lg  bg-no-repeat bg-center bg-cover bg-[url('/img/game/btn-bg.png')] bg-gradient-to-r from-[#ff9afc] to-[#ee40a8] text-white transition-colors duration-150 ease-in-out">Играть</button>
      </div>
    </section>
  )
}
