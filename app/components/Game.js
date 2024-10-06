"use client";

import React, { useEffect, useRef, useState } from "react";
import GameItem from "./GameItem";
import ItemPopup from "./ItemPopup";
import { useTimer } from "react-timer-hook";
import useSound from "use-sound";
import Rules from "./Rules";
import compareArrays from "../lib/compareArrays";
import PopupWrapper from "./popups/PopupWrapper";
import ContactForm from "./popups/FormPopup";
import GamePanel from "./GamePanel";
import GamePanelPopup from "./popups/GamePanelPopup";
import Header from "./Header";
import Image from "next/image";
import { popUpFromBottom } from "../content/FramerMotionVariants";
import Button from "./Button";
import Timer from "./Timer";

const gameplaySoundUrl = "/sound/gameplay.mp3";
const rightSoundUrl = "/sound/right.mp3";

const timerDurationSeconds = 60;
const time = new Date();
const expiryTimestamp = time.setSeconds(
  time.getSeconds() + timerDurationSeconds,
); // timer
export default function Game({ isStartScreen }) {
  let gameItemsData = [
    {
      title: "Зеркало",
      text: "Посмотреться перед выходом на сцену",
      img: {
        link: "img/game/mirror.svg",
        foundedLink: "img/game/finded/mirror.png",
        width: "90",
        height: "142",
      },
      coords: {
        top: "711",
        left: "1048",
      },
    },
    {
      title: "Барабанные палочки",
      text: "Побарабанить",
      img: {
        link: "img/game/drumsticks.svg",
        foundedLink: "img/game/finded/drumsticks.png",
        width: "175",
        height: "110",
      },
      coords: {
        top: "1114",
        left: "330",
      },
    },
    {
      title: "Куртка-бомбер",
      text: "По последней моде!",
      img: {
        link: "img/game/bomber.svg",
        foundedLink: "img/game/finded/bomber.png",
        width: "142",
        height: "380",
      },
      coords: {
        top: "449",
        left: "392",
      },
    },
    {
      title: "Синтезатор",
      text: "Клавиши есть в каждой песне «Комбинации»",
      img: {
        link: "img/game/synthesizer.svg",
        foundedLink: "img/game/finded/synthesizer.png",
        width: "260",
        height: "142",
      },
      coords: {
        top: "904",
        left: "103",
      },
    },
    {
      title: "Два «кусочека» колбаски",
      text: "Перекусить и вспомнить ту самую песню",
      img: {
        link: "img/game/music-stand.svg",
        foundedLink: "img/game/finded/music-stand.png",
        width: "108",
        height: "50",
      },
      coords: {
        top: "972",
        left: "885",
      },
    },
  ];
  
  let gameContainer = useRef();
  let gameArea = useRef();
  let game = useRef();

  const [isDown, setIsDown] = useState(false);
  const [startCoords, setStartCoords] = useState({ x: 0, y: 0 });
  const [containerScrollPos, setContainerScrollPos] = useState({
    left: 0,
    top: 0,
  });

  const [isAllItemsPopup, setIsAllItemsPopup] = useState(false);
  const [isHalfItemsPopup, setIsHalfItemsPopup] = useState(false);
  const [isZeroItemsPopup, setIsZeroItemsPopup] = useState(false);
  const [isSendGiftPopup, setIsSendGiftPopup] = useState(false);
  const [isItemPopupShow, setIsItemPopupShow] = useState(false);
  const [isPanelPopup, setIsPanelPopup] = useState(false);
  const [isErrorPopup, setIsErrorPopup] = useState(false);
  const [isRules, setIsRules] = useState(true);

  const [gameItems, setGameItems] = useState(gameItemsData);
  const [panelItems, setPanelItems] = useState(gameItems);
  const [foundedItem, setFoundedItem] = useState(null);
  const [foundedItems, setFoundedItems] = useState([]);

  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isTimerEnd, setIsTimerEnd] = useState(false);
  const [isSoundPlay, setIsSoundPlay] = useState(false);

  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start: startTimer,
    pause: pauseTimer,
    resume: resumeTimer,
    restart: restartTimer,
  } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: () => onTimerEnd(),
  });

  const [play, { stop, pause }] = useSound(gameplaySoundUrl, {
    volume: 0.5,
    loop: true,
  });
  const [playRight, { stop: stopRight, pause: pauseRight }] = useSound(
    rightSoundUrl,
    {
      volume: 2,
      interrupt: true,
    },
  );

  useEffect(() => {
    initGameContainerStartPosition();
  }, []);

  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.code === "Escape") {
        setIsPanelPopup(false);
      }
    }

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, []);

  // useEffect(() => {
  //   const cacheImages = async (srcArray) => {
  //     const promises = srcArray.map((item) => {
  //       return new Promise((resolve, reject) => {
  //         const img = new Image();
  //         img.src = item.img.foundedLink;
  //         img.onload = resolve;
  //         img.onerror = reject;
  //       });
  //     });

  //     await Promise.all(promises);
  //     setIsImagePreloading(false);
  //   };

  //   cacheImages(gameItemsData);
  // }, []);

  useEffect(() => {
    checkFoundedItems();
  }, [foundedItems, isItemPopupShow, isTimerEnd]);

  useEffect(() => {
    let timer;

    if (isItemPopupShow) {
      timer = setTimeout(() => {
        setIsItemPopupShow(false);
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [isItemPopupShow, foundedItem]);

  useEffect(() => {
    isGameStarted ? startTimer() : pauseTimer();

    if (isGameStarted && !isSoundPlay) {
      playSound();
    }
  }, [isGameStarted]);

  useEffect(() => {
    if (isGameStarted) {
      isPanelPopup ? pauseTimer() : resumeTimer();
    }
  }, [isPanelPopup]);

  // Для рестарта таймера нужна новая метка времени, отличная от начальной
  function restartTimerWithNewExpiryTimestamp() {
    const time = new Date();
    const expiryTimestamp = time.setSeconds(
      time.getSeconds() + timerDurationSeconds,
    );
    restartTimer(expiryTimestamp);
  }

  function mouseDownHandler(e) {
    let startX = e.pageX - gameContainer.current.offsetLeft;
    let startY = e.pageY - gameContainer.current.offsetTop;
    let scrollLeft = gameContainer.current.scrollLeft;
    let scrollTop = gameContainer.current.scrollTop;

    setIsDown(true);
    setStartCoords({ x: startX, y: startY });
    setContainerScrollPos({ left: scrollLeft, top: scrollTop });
  }

  function mouseMoveHandler(e) {
    if (!isDown) return;
    e.preventDefault();

    const x = e.pageX - gameContainer.current.offsetLeft,
      y = e.pageY - gameContainer.current.offsetTop;
    const walkX = (x - startCoords.x) * 1,
      walkY = (y - startCoords.y) * 1;
    gameContainer.current.scrollLeft = containerScrollPos.left - walkX;
    gameContainer.current.scrollTop = containerScrollPos.top - walkY;
  }

  function pauseSound() {
    pause();
    setIsSoundPlay(false);
  }

  function playSound() {
    play();
    setIsSoundPlay(true);
  }

  function stopSound() {
    stop();
    setIsSoundPlay(false);
  }

  function onTimerEnd() {
    setIsGameStarted(false);
    setIsTimerEnd(true);
  }

  function restartGame() {
    onClosePopups();
    restartTimerWithNewExpiryTimestamp();
    setIsGameStarted(true);
    setIsTimerEnd(false);
    setIsSendGiftPopup(false);

    setFoundedItems([]);
    setFoundedItem(null);
    setGameItems(gameItemsData);
    setPanelItems(gameItemsData);
  }

  function checkFoundedItems() {
    let isAllItemsFound = compareArrays(gameItems, foundedItems);

    if (isAllItemsFound) {
      setIsGameStarted(false);
      !isItemPopupShow && setIsAllItemsPopup(true);
    }

    if (isTimerEnd) {
      if (foundedItems.length >= gameItems.length / 2) {
        !isItemPopupShow && setIsHalfItemsPopup(true);
      }

      if (foundedItems.length < gameItems.length / 2) {
        !isItemPopupShow && setIsZeroItemsPopup(true);
      }
    }
  }

  function clickItemHandler(item) {
    if (item.isFounded || isTimerEnd) {
      return;
    }
    item.isFounded = true;

    setFoundedItem(item);
    showItemPopup();
    playRight();
    pushFoundedItemToArray(item);
  }

  function pushFoundedItemToArray(item) {
    if (foundedItems.indexOf(item) === -1) {
      setFoundedItems([item, ...foundedItems]);
    }
  }

  function showItemPopup() {
    !isItemPopupShow && setIsItemPopupShow(true);
  }

  function onClosePopups() {
    setIsAllItemsPopup(false);
    setIsHalfItemsPopup(false);
    setIsZeroItemsPopup(false);
    setIsPanelPopup(false);
    setIsRules(false);
  }

  function initGameContainerStartPosition() {
    let gameLeft = parseInt(
      gameArea.current.offsetWidth / 2 - gameContainer.current.offsetWidth / 2,
    );
    let gameTop =
      gameArea.current.offsetHeight / 2 -
      gameContainer.current.offsetHeight / 2;

    gameContainer.current.scrollLeft = gameLeft;
    gameContainer.current.scrollTop = gameTop;
  }

  return (
    <div
      className={`${!isStartScreen ? "opacity-100" : "opacity-0"} m-auto select-none`}
    >
      {isRules && (
        <Rules
          isRules={isRules}
          setIsRules={setIsRules}
          setIsGameStarted={setIsGameStarted}
          isGameStarted={isGameStarted}
        />
      )}

      <ItemPopup
        foundedItem={foundedItem}
        isItemPopupShow={isItemPopupShow}
        setIsItemPopupShow={setIsItemPopupShow}
      />
      <Header
        pauseSound={pauseSound}
        playSound={playSound}
        isSoundPlay={isSoundPlay}
        setIsRules={setIsRules}
      />

      <Timer
        startTimer={startTimer}
        pauseTimer={pauseTimer}
        resumeTimer={resumeTimer}
        pauseSound={pauseSound}
        restartTimer={() => restartTimerWithNewExpiryTimestamp()}
        isRunning={isRunning}
        minutes={minutes}
        seconds={seconds}
      />

      <section
        ref={game}
        className="absolute top-0 left-0 w-full h-full overflow-hidden game"
      >
        {panelItems.length >= 0 && (
          <GamePanel
            foundedItems={foundedItems}
            panelItems={panelItems}
            foundedItem={foundedItem}
            setIsPanelPopup={setIsPanelPopup}
          />
        )}
        {/* <h2 className="visually-hidden">Игра</h2> */}
        <div
          ref={gameContainer}
          onMouseDown={mouseDownHandler}
          onMouseLeave={() => setIsDown(false)}
          onMouseUp={() => setIsDown(false)}
          onMouseMove={mouseMoveHandler}
          className="relative h-full overflow-auto game-container no-scrollbar"
          tabIndex="0"
        >
          <div
            ref={gameArea}
            className="game-area relative mx-auto h-[1632px] w-[2912px] cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 h-full w-full bg-[url('/img/game/bg.jpg')]"></div>
            {gameItems &&
              gameItems.map((item, index) => {
                return (
                  <GameItem
                    key={index}
                    item={item}
                    clickItemHandler={() => clickItemHandler(item)}
                  />
                );
              })}
          </div>
        </div>

        <PopupWrapper
          id="panel-items-popup"
          isOpen={isPanelPopup}
          setIsOpen={setIsPanelPopup}
          closed
          variants={popUpFromBottom}
        >
          <GamePanelPopup
            setIsOpen={setIsPanelPopup}
            isOpen={isPanelPopup}
            items={gameItems}
          />
        </PopupWrapper>

        <PopupWrapper id="send-gift-popup" isOpen={isSendGiftPopup}>
          <div className="z-1010 mx-auto flex max-w-[456px] flex-col items-center rounded-[24px]">
            <p className="mb-6 bg-gradient-to-r from-[#ff9afc] to-[#ee40a8] bg-clip-text text-center text-4xl font-black text-transparent">
              Отправили подарок на&nbsp;почту!
            </p>
            <p className="mb-6 text-center">
              Может, сыграем ещё или расскажем о&nbsp;вашем успехе?
            </p>
            <Button onClick={restartGame} text="Играть заново" />
          </div>
        </PopupWrapper>

        <PopupWrapper id="error-popup" isOpen={isErrorPopup}>
          <div className="z-1010 mx-auto flex max-w-[456px] flex-col items-center rounded-[24px]">
            <Image
              src="/img/error-icon.svg"
              alt=""
              width="64"
              height="64"
            ></Image>
            <p>Упс... Что-то пошло не так...</p>
            <p>Попробуйте еще раз.</p>
          </div>
        </PopupWrapper>

        <PopupWrapper id="all-items" isOpen={isAllItemsPopup}>
          <p className="mb-6 bg-gradient-to-r from-[#ff9afc] to-[#ee40a8] bg-clip-text text-center text-4xl font-black text-transparent">
            Поздравляю! <br /> Вы нашли все предметы!
          </p>
          {/* <Image src="" alt="" /> */}
          <ContactForm
            setIsSendGiftPopup={setIsSendGiftPopup}
            onClosePopups={onClosePopups}
          />
        </PopupWrapper>

        <PopupWrapper id="half-items" isOpen={isHalfItemsPopup}>
          <p className="mb-6 bg-gradient-to-r from-[#ff9afc] to-[#ee40a8] bg-clip-text text-center text-4xl font-black text-transparent">
            Вы нашли {foundedItems.length} из {gameItems.length} предметов!
          </p>
          {/* <Image src="" alt="" /> */}
          <ContactForm
            setIsSendGiftPopup={setIsSendGiftPopup}
            onClosePopups={onClosePopups}
          />
        </PopupWrapper>

        <PopupWrapper id="zero-items" isOpen={isZeroItemsPopup}>
          {/* <Image src="" alt="" /> */}
          <p className="mb-4 bg-gradient-to-r from-[#ff9afc] to-[#ee40a8] bg-clip-text text-center text-4xl font-black text-transparent">
            Отошли попеть с&nbsp;фанатами Russian Girls?
          </p>
          <p className="mx-auto mb-6 text-center">
            Ничего страшного, попробуйте снова!
          </p>
          <Button onClick={restartGame} text="Попробовать снова" />
        </PopupWrapper>
      </section>
    </div>
  );
}
