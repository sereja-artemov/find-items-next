'use client'
import dynamic from 'next/dynamic'
 
// const Game = dynamic(
//   () => import('./components/Game')
// )
import Game from "./components/Game";
import FirstScreen from "./components/FirstScreen";
import { useState } from "react";

export default function Home() {
  const [isStartScreen, setIsStartScreen] = useState(true);

  return (
    <main>
      {/* {isStartScreen ? <FirstScreen setIsStartScreen={setIsStartScreen} /> : <Game /> } */}
      {isStartScreen && <FirstScreen setIsStartScreen={setIsStartScreen} />}
      <Game isStartScreen={isStartScreen} />
    </main>
  );
}
