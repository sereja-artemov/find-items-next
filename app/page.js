'use client'
import dynamic from 'next/dynamic'
 
// const Game = dynamic(
//   () => import('./components/Game')
// )
import Game from "./components/Game";
import FirstScreen from "./components/FirstScreen";
import { useEffect, useState } from "react";
import Loading from './loading';

export default function Home() {
  const [isStartScreen, setIsStartScreen] = useState(true);
  const [isImagePreloading, setIsImagePreloading] = useState(true);
  const [mainImageLoading, setMainImageLoading] = useState(true);

  let preloadImagesData = [
    // 'img/game/main-img-x2.png',
    // 'img/game/start-bg.jpg',
    // '/img/game/lights.png'
  ]

  useEffect(() => {
    const cacheImages = async (srcArray) => {
      const promises = srcArray.map((item) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = item;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      await Promise.all(promises);
      setIsImagePreloading(false);
    };

    cacheImages(preloadImagesData);
  }, []);
  

  return (
    <main className='flex w-screen h-screen'>
    <div className='max-w-[1920px] max-h-[1080px] m-auto h-screen h-[100svh] w-full flex-1 relative overflow-hidden'>
      <div className='relative h-full'>
        {(isImagePreloading || mainImageLoading) && <Loading />}
        {/* {isStartScreen ? <FirstScreen setIsStartScreen={setIsStartScreen} /> : <Game /> } */}
        {isStartScreen && <FirstScreen setIsStartScreen={setIsStartScreen} setMainImageLoading={setMainImageLoading} />}
        <Game isStartScreen={isStartScreen} />
        </div>
    </div>
    </main>
  );
}
