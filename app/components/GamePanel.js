'use client'

import React, {useEffect} from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { motion } from "framer-motion";
export default function GamePanel({ panelItems, foundedItems, foundedItem, setIsPanelPopup }) {
  const sliderOptions = {
    loop: false,
    mode: "free-snap",
    slides: {
      perView: 'auto',
      spacing: 15,
    },
  }

  useEffect(() => {
    instanceRef?.current?.update(sliderOptions);
    scrollToFoundedItem();
  }, [panelItems, foundedItem]);

  function scrollToFoundedItem() {
    let currentIndex = panelItems.findIndex((item) => JSON.stringify(item) === JSON.stringify(foundedItem)); 
    if (currentIndex >= 0) {
      instanceRef?.current?.moveToIdx(currentIndex);
    }
  }

  const [sliderRef, instanceRef] = useKeenSlider(
    sliderOptions,
    {
      slideChanged() {
        console.log("slide changed");
      },
    },
    [
      // add plugins here
    ],
  );
  // style={{width: ((64+30)*panelItems.length)-30}}
  return (
    <div  className="linear absolute bottom-6 left-1/2 z-10 min-h-[98px] max-w-[950px] max-xl:max-w-[92%] -translate-x-1/2 transform transition-opacity duration-100">
      <div className="absolute inset-0 z-negative backdrop-blur-sm"></div>
      <div className="relative flex items-center min-h-[98px] rounded-[24px] border-4 border-[#2b8c97] bg-[rgba(0,0,0,0.7)] px-[90px] pl-[20px] shadow-[inset_0_0_0_2px_#dfbbd4]">
        <motion.button whileHover={{scale: 1.1}} whileTap={{scale: .9}} onClick={() => setIsPanelPopup(true)} className="absolute right-6 w-10 h-10 bg-[url('/img/game/panel/panel-items-btn.png')] bg-no-repeat bg-contain border-none"></motion.button>
        <div className="py-3.25 relative overflow-hidden w-full">
          <div ref={sliderRef} className="keen-slider">
            {panelItems.map((item, index) => {
              if (!item.isFounded) {
                return (
                  <div key={index} className="relative !w-auto shrink-0 keen-slider__slide filter contrast-0 brightness-50">
                    <div
                      className="w-16 h-16 "
                      style={{
                        background: `url(${item.img.foundedLink}) no-repeat center / contain`,
                      }}
                    />
                    {/* <div className="absolute top-0 left-0 w-full h-full bg-slate-400 mix-blend-lighten"></div> */}
                  </div>
                );
              }
              
            })}
          </div>
        </div>
        <div className="absolute top-[-48px] left-1/2 backdrop-blur-sm -translate-x-1/2 py-1 px-4 rounded-[16px] w-max min-h-[48px] text-[20px] font-extrabold text-inherit right-auto flex gap-[24px] items-center bg-[rgba(0,0,0,0.7)] border-4 border-[#2b8c97] shadow-[inset_0_0_0_2px_#dfbbd4]">
          <p className="text-xl font-black leading-normal text-center text-transparent font-montserrat bg-clip-text bg-gradient-to-r from-pink-300 to-pink-600">Что ищем </p>
          <div><span>{foundedItems.length}</span><span className="text-[#4c4c4c]">/</span><span className="text-[#4c4c4c]">{panelItems.length}</span></div>
        </div>
      </div>
    </div>
  );
}
