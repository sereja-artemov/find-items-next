import React, { useEffect } from "react";
import { useAnimate, stagger, motion } from "framer-motion";
import Button from "../Button";

export default function GamePanelPopup({ items, setIsOpen, isOpen }) {
  const [scope, animate] = useAnimate();
  const staggerList = stagger(0.1, { startDelay: 0.1 });

  useEffect(() => {
    animate(
      ".itemanim",
      isOpen
        ? { opacity: 1, scale: 1, x: 0 }
        : { opacity: 0, scale: 0.3, x: -50 },
      {
        duration: 0.2,
        delay: isOpen ? staggerList : 0,
      },
    );
  }, [isOpen]);

  return (
    <div
      ref={scope}
      className="flex w-full max-w-[776px] flex-col items-center"
    >
      <p className="mb-8 bg-gradient-to-r from-[#ff9afc] to-[#ee40a8] bg-clip-text text-center text-4xl font-black text-transparent">
        Что мы&nbsp;ищем?
      </p>
      <div className="wrap-anim mx-auto mb-8 grid w-full max-w-[580px] grid-cols-[repeat(auto-fit,minmax(96px,1fr))] gap-6">
        {items.map((item, index) => {
          return (
            <motion.div className="itemanim" key={index}>
              <div
                className={`duration-250 relative mx-auto mb-2 h-16 w-16 overflow-hidden ${!item.isFounded && `brightness-60 contrast-0 filter`}`}
                style={{
                  background: `url(${item.img.foundedLink}) no-repeat center / contain`,
                }}
              />
              <p className="text-sm font-medium leading-5 text-center">
                {item.title}
              </p>
            </motion.div>
          );
        })}
      </div>
      <Button onClick={() => setIsOpen(false)} text="Продолжить" />
    </div>
  );
}
