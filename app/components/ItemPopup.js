import React, {memo} from 'react'
import Image from "next/image";

export default memo(function ItemPopup({foundedItem, isItemPopupShow, setIsItemPopupShow}) {
  
// console.log(foundedItem);

  return (
    foundedItem && <div onClick={() => setIsItemPopupShow(false)} className={`${isItemPopupShow? 'opacity-1 z-20' : 'opacity-0 -z-10'} transition-opacity duration-700 absolute max-w-lg p-5 text-center -translate-x-1/2 -translate-y-1/2 w-max rounded-xl left-1/2 top-1/2 game-panel__founded-item`}>
      <Image sizes="100vw"  className='mx-auto h-auto object-contain mb-[3vh] w-[clamp(100px,20vh,37vh)] max-w-[320px] aspect-[1] bg-no-repeat bg-contain bg-center' width={200} height={200} src={foundedItem.img.foundedLink} alt=""></Image>
      <div className='relative z-0 overflow-hidden text-center max-w-[92vw] w-max rounded-[24px] bg-black bg-opacity-60 p-[16px_34px]'>
        <p className="text-2xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-[#ff9afc] to-[#ee40a8]">{foundedItem.title}</p>
        <p className="text-md">{foundedItem.text}</p>
      </div>
    </div>
  )
})

