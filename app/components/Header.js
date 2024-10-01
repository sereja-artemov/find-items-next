import React from "react";
import Image from "next/image";
import logo from "/public/img/logo.png";

export default function Header({playSound, pauseSound, isSoundPlay}) {

  function soundClickHandler() {
    isSoundPlay ? pauseSound() : playSound();
  }

  return (
    <header className="container relative z-10 flex justify-between px-6 py-6 mx-auto">
      <Image
        width="68"
        height="64"
        src={logo}
        alt="логотип"
        className="logo"
      ></Image>
      <div className="relative z-50 flex flex-row gap-4 ml-auto">
        <button onClick={soundClickHandler} type="button" className="rounded-full border-4 border-[#2b8c97] p-1 shadow-[inset_0_0_0_2px_#dfbbd4]">
          <div className={`sound ${!isSoundPlay && 'off'} relative h-14 w-14 bg-[url('/img/sound.png')] bg-contain bg-center bg-no-repeat`}>
            <span className="visually-hidden">Включить/выключить звук</span>
          </div>
        </button>
        <button type="button" className="rounded-full border-4 border-[#2b8c97] p-1 shadow-[inset_0_0_0_2px_#dfbbd4]">
          <div className="header__rules relative h-14 w-14 bg-[url('/img/sound.png')] bg-contain bg-center bg-no-repeat"></div>
        </button>
      </div>
    </header>
  );
}