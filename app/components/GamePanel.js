'use client'

import React, {useEffect} from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";

export default function GamePanel({ panelItems, foundedItem, setIsPanelPopup }) {
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
        <button onClick={() => setIsPanelPopup(true)} className="absolute top-1/2 right-6 transform -translate-y-1/2 w-10 h-10 bg-[url('/img/game/panel/panel-items-btn.png')] bg-no-repeat bg-contain border-none"></button>
        <div className="py-3.25 relative overflow-hidden w-full">
          <div ref={sliderRef} className="keen-slider">
            {panelItems.map((item, index) => {
              if (!item.isFounded) {
                return (
                  <div key={index} className="relative !w-auto shrink-0 keen-slider__slide">
                    <div
                      className="w-16 h-16 filter contrast-0 brightness-60"
                      style={{
                        background: `url(${item.img.foundedLink}) no-repeat center / contain`,
                      }}
                    />
                    {/* <div className="absolute top-0 left-0 w-full h-full bg-slate-400 mix-blend-lighten"></div> */}
                  </div>
                );
              }
              
            })}
            {/* <div className="keen-slider__slide">1</div>
            <div className="keen-slider__slide">2</div>
            <div className="keen-slider__slide">3</div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
