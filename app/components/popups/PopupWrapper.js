import React from "react";

export default function PopupWrapper({ id, isOpen, setIsOpen, closed, children }) {

  function onClickHandler(e) {
    (e.target.id.includes('popup') || e.target.classList.contains('popup')) && closed && setIsOpen(false)
  }

  return (
    <div onClick={onClickHandler} id={`popup-${id}`} className={`popup z-50 overflow-auto fixed w-full h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-md ${isOpen ? "flex" : "hidden"}`}>
      <div className="relative p-10 max-w-[616px] w-screen flex flex-col items-center z-50 m-auto border-4 border-[#2b8c97] shadow-[inset_0_0_0_2px_#dfbbd4] rounded-2xl bg-black bg-opacity-90">
        {children}
        {closed && <button
          onClick={() => setIsOpen(false)}
          type="button"
          className="absolute right-5 top-5 w-12 h-12 p-0 border-none bg-[url('/img/game/cross.png')] bg-no-repeat bg-center bg-contain"
          aria-label="Закрыть"
        ></button>}
      </div>
      {/* <div onClick={() => closed && setIsOpen(false)} className="absolute top-0 z-40 w-full h-full bg-black/50 backdrop-blur-md"></div> */}
    </div>
  );
}
