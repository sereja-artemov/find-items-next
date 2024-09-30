import Image from "next/image";
import React, { useState } from "react";

export default function GameItem({item, clickItemHandler}) {

  return (
    // <div
    //   className={`relative left-[1051px] top-[708px] h-[142px] w-[90px]`}
    //   data-type="mirror"
    //   data-text="Посмотреться перед выходом на сцену"
    //   data-bg="url(img/game/finded/mirror.png)"
    //   data-title="Зеркало"
    // >
    //   {isFounded && <div className={`absolute block h-full w-full bg-transparent bg-no-repeat`} style={{backgroundImage: `url(${img})`}}></div>}
    // </div>
    <>
      <div
        style={{
          width: `${item.img.width}px`,
          height: `${item.img.height}px`,
          left: `${item.coords.left}px`,
          top: `${item.coords.top}px`,
          // background: `url(${item.img.link}) no-repeat center / contain`,
        }}
        onClick={clickItemHandler}
        className={`absolute`}
        // data-title={item.title}
        // data-text={item.text}
        // data-img={item.img.link}
        // data-founded-image={item.img.foundedLink}
      >
        {item.isFounded && <div className="w-full h-full" style={{background: `url(${item.img.link}) no-repeat center / contain`}}></div>}
      </div>

    </>
  );
}
