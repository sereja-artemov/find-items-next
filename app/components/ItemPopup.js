import React, {memo} from 'react'
import Image from "next/image";
import { motion } from 'framer-motion';
export default memo(function ItemPopup({foundedItem, isItemPopupShow, setIsItemPopupShow}) {

  const variants = {
    show: {opacity: 1, width: '100vw'},
    hidden: {opacity: 0, width: 0}
  }

  return (
    foundedItem && (
      <div
        onClick={() => setIsItemPopupShow(false)}
        className={`${isItemPopupShow ? "opacity-1 z-20" : "-z-10 opacity-0"} game-panel__founded-item absolute left-1/2 top-1/2 w-max max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl p-5 text-center transition-opacity duration-700`}
      >
        <Image
          sizes="100vw"
          className="mx-auto mb-[3vh] aspect-[1] h-auto w-[clamp(100px,20vh,37vh)] max-w-[320px] bg-contain bg-center bg-no-repeat object-contain"
          width={200}
          height={200}
          src={foundedItem.img.foundedLink}
          alt=""
        ></Image>
        <div className="relative w-max max-w-[92vw] overflow-hidden rounded-[24px] bg-black bg-opacity-80 p-[16px_34px] text-center">
          <p className="bg-gradient-to-r from-[#ff9afc] to-[#ee40a8] bg-clip-text text-center text-2xl font-black text-transparent">
            {foundedItem.title}
          </p>
          <p className="text-md">{foundedItem.text}</p>
          <div className="absolute top-0 left-0 z-0 w-full h-full"></div>
        </div>
        <motion.div
          key={isItemPopupShow}
          animate={isItemPopupShow ? "show" : "hidden"}
          variants={variants}
          transition={{ duration: 1 }}
          className="light"
        ></motion.div>
      </div>
    )
  );
})