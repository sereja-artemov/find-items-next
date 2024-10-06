export default function Timer(props) {
  const {startTimer, pauseTimer, resumeTimer, pauseSound, restartTimer, isRunning, minutes, seconds} = props;
  
  return (
    <div className="absolute z-10 flex flex-col items-center gap-3 p-4 text-center -translate-x-1/2 max-sm:top-24 left-1/2 w-max ">
    <div className="min-w-[155px] inline-block p-[.15em] text-6xl border-2 rounded-2xl border-[#dfbbd4] text-gray-50 backdrop-blur-sm bg-black/50">
      <span>{minutes}</span>:
      <span>{seconds.toString().padStart(2, "0")}</span>
      <p className="text-sm bold">{isRunning ? "Запущен" : "Остановлен"}</p>
    </div>
    <div className="inline-flex flex-wrap justify-center w-auto max-w-[92vw] text-sm">
      <button className="text-gray-50 mb-[.2em] backdrop-blur-sm bg-black/50 rounded-full leading-none px-[.8em] py-[.4em]" onClick={startTimer}>Старт</button>
      <button className="text-gray-50 mb-[.2em] backdrop-blur-sm bg-black/50 rounded-full leading-none px-[.8em] py-[.4em]" onClick={pauseTimer}>Пауза</button>
      <button className="text-gray-50 mb-[.2em] backdrop-blur-sm bg-black/50 rounded-full leading-none px-[.8em] py-[.4em]" onClick={resumeTimer}>Продолжить</button>
      <button className="text-gray-50 mb-[.2em] backdrop-blur-sm bg-black/50 rounded-full leading-none px-[.8em] py-[.4em]" onClick={pauseSound}>Выключить музыку</button>
      <button className="text-gray-50 mb-[.2em] backdrop-blur-sm bg-black/50 rounded-full leading-none px-[.8em] py-[.4em]" onClick={restartTimer}>Рестарт</button>
    </div>
  </div>
  )
}
