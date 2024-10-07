import React, { useEffect, useState } from "react";
// import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from "keen-slider/react";
import { motion } from "framer-motion";
import { headingFromLeft } from "../content/FramerMotionVariants";
import Button from "./Button";

export default function Rules({ isRules, setIsRules, setIsGameStarted, isGameStarted }) {
  const [buttonText, setButtonText] = useState("Старт");
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      slides: {
        perView: 3,
        spacing: 15,
      },
      breakpoints: {
        "(max-width: 1023.9px)": {
          slides: {
            perView: 1,
            spacing: 15,
          },
        },
      },
      slideChanged() {
        let { abs, maxIdx } = instanceRef.current.track.details;

        if (abs === maxIdx) {
          isGameStarted ? setButtonText("Понятно") : setButtonText("Старт");
        } else {
          setButtonText("Далее");
        }
      },
    },
    [
      // add plugins here
    ],
  );

  useEffect(() => {
    let progress = instanceRef.current.track.details.progress;

    isGameStarted && setButtonText("Понятно");
    if (progress >= 0 && progress < 1) {
      setButtonText("Далее");
    }
  }, []);

  function onClickHandler() {
    let { abs, maxIdx, progress } = instanceRef.current.track.details;

    progress === 1 && setButtonText("Старт");
    maxIdx > 0 && instanceRef.current.next();
    abs === maxIdx && startGame();
  }

  function startGame() {
    setIsRules(false);
    setIsGameStarted(true);
    setButtonText("Понятно");
  }

  return (
    <div className="overflow-auto">
      <section className="absolute z-20 flex flex-col w-full h-full p-10 overflow-x-hidden overflow-y-auto -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-black/40 backdrop-blur-md">
        <div className="m-auto flex w-full max-w-[936px] flex-col items-center">
          <motion.h1
            variants={headingFromLeft}
            animate={isRules ? "visible" : "hidden"}
            className="mb-8 bg-gradient-to-r from-[#ff9afc] to-[#ee40a8] bg-clip-text text-center text-4xl max-sm:text-3xl font-black text-transparent"
          >
            Как играть?
          </motion.h1>

          <div
            ref={sliderRef}
            className="keen-slider mb-6 !overflow-visible max-lg:max-w-[302px]"
          >
            <div className="keen-slider__slide rounded-2xl border-4 border-[#2b8c97] bg-black bg-opacity-90 p-1 shadow-[inset_0_0_0_2px_#dfbbd4]">
              <p className="relative rounded-[24px] bg-black bg-opacity-70 p-[32px_24px_40px_32px] text-center backdrop-blur-[4px]">
                Найдите в&nbsp;гримёрной 15&nbsp;предметов из&nbsp;списка внизу
                и&nbsp;нажмите на&nbsp;них. Чем больше вещей обнаружили&nbsp;—
                тем ближе ваша победа.
              </p>
            </div>

            <div className="keen-slider__slide rounded-2xl border-4 border-[#2b8c97] bg-black bg-opacity-90 p-1 shadow-[inset_0_0_0_2px_#dfbbd4]">
              <p className="relative rounded-[24px] bg-black bg-opacity-70 p-[32px_24px_40px_32px] text-center backdrop-blur-[4px]">
                Поторопитесь, у&nbsp;вас мало времени&nbsp;— всего
                2&nbsp;минуты: фанаты в&nbsp;зале уже заждались!
              </p>
            </div>

            <div className="keen-slider__slide rounded-2xl border-4 border-[#2b8c97] bg-black bg-opacity-90 p-1 shadow-[inset_0_0_0_2px_#dfbbd4]">
              <p className="relative rounded-[24px] bg-black bg-opacity-70 p-[32px_24px_40px_32px] text-center backdrop-blur-[4px]">
                Перемещайтесь по&nbsp;экрану, чтобы исследовать всё пространство
                и&nbsp;найти больше предметов.
              </p>
            </div>
          </div>
          <Button onClick={onClickHandler} text={buttonText} />
        </div>
      </section>
    </div>
  );
}
