import React, { useEffect, useState } from 'react'
// import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
export default function Rules({setIsRules, setIsGameStarted}) {
  const [buttonText, setButtonText] = useState('Старт');
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      slideChanged() {
        console.log('slide changed')
      },
      slides: {
        perView: 3,
        spacing: 15,
      },
    },
    [
      // add plugins here
    ]
  )

  function onClick() {
    setIsRules(false);
    setIsGameStarted(true);
    setButtonText('Понятно');
  }

  return (
    <div className='overflow-auto'>
      <section className='absolute z-20 flex flex-col w-full h-full p-10 overflow-y-auto -translate-x-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-md left-1/2 top-1/2'>
        <div className='m-auto w-full max-w-[936px] flex flex-col items-center'>
        <h1 className='mb-8 text-4xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-[#ff9afc] to-[#ee40a8]'>Как играть?</h1>


        <div ref={sliderRef} className="keen-slider max-w-[936px] !overflow-visible mb-6">
          <div className='keen-slider__slide border-4 p-1 border-[#2b8c97] shadow-[inset_0_0_0_2px_#dfbbd4] rounded-2xl bg-black bg-opacity-90'>
            <p className="rounded-[24px] bg-black bg-opacity-70 p-[32px_24px_40px_32px] text-center relative backdrop-blur-[4px]">Найдите в&nbsp;гримёрной 15&nbsp;предметов из&nbsp;списка внизу и&nbsp;нажмите
            на&nbsp;них. Чем больше вещей обнаружили&nbsp;— тем ближе ваша победа.</p>
          </div>

          <div className='keen-slider__slide border-4 p-1 border-[#2b8c97] shadow-[inset_0_0_0_2px_#dfbbd4] rounded-2xl bg-black bg-opacity-90'>
            <p className="rounded-[24px] bg-black bg-opacity-70 p-[32px_24px_40px_32px] text-center relative backdrop-blur-[4px]">Поторопитесь, у&nbsp;вас мало времени&nbsp;— всего 2&nbsp;минуты:
            фанаты в&nbsp;зале уже заждались!</p>
          </div>

          <div className='keen-slider__slide border-4 p-1 border-[#2b8c97] shadow-[inset_0_0_0_2px_#dfbbd4] rounded-2xl bg-black bg-opacity-90'>
            <p className="rounded-[24px] bg-black bg-opacity-70 p-[32px_24px_40px_32px] text-center relative backdrop-blur-[4px]">Перемещайтесь по&nbsp;экрану, чтобы исследовать всё пространство
            и&nbsp;найти больше предметов.</p>
          </div>
        </div>
        
        <div className="border-4 border-[#2b8c97] shadow-[inset_0_0_0_2px_#dfbbd4] inline-flex w-full max-w-[456px] p-1 rounded-full text-white transition-colors duration-150 ease-in-out">
          <button onClick={onClick} type="button" className="inline-flex w-full flex-row items-center justify-center align-top text-20 text-none py-2.5 px-6 leading-7.5 h-15 text-center border-0 m-0 font-montserrat font-bold rounded-full max-w-[440px] whitespace-nowrap overflow-hidden text-shadow-lg  bg-no-repeat bg-center bg-cover bg-[url('/img/game/btn-bg.png')] bg-gradient-to-r from-[#ff9afc] to-[#ee40a8] text-white transition-colors duration-150 ease-in-out">{buttonText}</button>
        </div>
        
        </div>
      </section>
    </div>
  )
}
