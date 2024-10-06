import React from "react";
import { motion } from "framer-motion";
import { popUp } from "@/app/content/FramerMotionVariants";

export default function PopupWrapper({
  id,
  isOpen,
  setIsOpen,
  closed,
  children,
  variants = popUp,
}) {
  function onClickHandler(e) {
    (e.target.id.includes("popup") || e.target.classList.contains("popup")) &&
      closed &&
      setIsOpen(false);
  }

  return (
    <div
      onClick={onClickHandler}
      id={`popup-${id}`}
      className={`popup fixed left-1/2 top-1/2 z-50 h-full w-full -translate-x-1/2 -translate-y-1/2 overflow-auto bg-black/50 backdrop-blur-md ${isOpen ? "flex" : "hidden"}`}
    >
      <motion.div
        variants={variants}
        animate={isOpen ? "visible" : "hidden"}
        className="relative z-50 m-auto flex w-screen max-w-[616px] flex-col items-center rounded-2xl border-4 border-[#2b8c97] bg-black bg-opacity-90 p-10 shadow-[inset_0_0_0_2px_#dfbbd4]"
      >
        {children}
        {closed && (
          <motion.button
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.8 }}
            onClick={() => setIsOpen(false)}
            type="button"
            className="absolute right-5 top-5 h-12 w-12 border-none bg-[url('/img/game/cross.png')] bg-contain bg-center bg-no-repeat p-0"
            aria-label="Закрыть"
          ></motion.button>
        )}
      </motion.div>
      {/* <div onClick={() => closed && setIsOpen(false)} className="absolute top-0 z-40 w-full h-full bg-black/50 backdrop-blur-md"></div> */}
    </div>
  );
}
