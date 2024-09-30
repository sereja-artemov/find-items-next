import React from "react";

export default function GamePanelPopup({ items, setIsOpen }) {
  return (
    <div className="max-w-[776px] w-full flex flex-col items-center">
      <p className="mb-8 text-4xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-[#ff9afc] to-[#ee40a8]">
        Что мы&nbsp;ищем?
      </p>
      <div className="w-full max-w-[580px] grid gap-6 mx-auto mb-8 grid-cols-[repeat(auto-fit,minmax(96px,1fr))]">
        {items.map((item, index) => {
          return (
            <div key={index}>
              <div
                className={`duration-250 relative mx-auto mb-2 h-16 w-16 overflow-hidden ${!item.isFounded && `brightness-60 contrast-0 filter`}`}
                style={{
                  background: `url(${item.img.foundedLink}) no-repeat center / contain`,
                }}
              />
              <p className="text-sm font-medium leading-5 text-center">{item.title}</p>
            </div>
          );
        })}
      </div>
      <div className="border-4 border-[#2b8c97] shadow-[inset_0_0_0_2px_#dfbbd4] inline-flex w-full max-w-[456px] p-1 rounded-full text-white transition-colors duration-150 ease-in-out">
        <button onClick={() => setIsOpen(false)} type="button" className="inline-flex w-full flex-row items-center justify-center align-top text-20 text-none py-2.5 px-6 leading-7.5 h-15 text-center border-0 m-0 font-montserrat font-bold rounded-full max-w-[440px] whitespace-nowrap overflow-hidden text-shadow-lg  bg-no-repeat bg-center bg-cover bg-[url('/img/game/btn-bg.png')] bg-gradient-to-r from-[#ff9afc] to-[#ee40a8] text-white transition-colors duration-150 ease-in-out">Продолжить</button>
      </div>
    </div>
  );
}
