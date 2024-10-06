export default function GameItem({item, clickItemHandler}) {
  return (
    <>
      <div
        style={{
          width: `${item.img.width}px`,
          height: `${item.img.height}px`,
          left: `${item.coords.left}px`,
          top: `${item.coords.top}px`,
        }}
        onClick={clickItemHandler}
        className={`absolute`}
      >
        {item.isFounded && <div className="w-full h-full" style={{background: `url(${item.img.link}) no-repeat center / contain`}}></div>}
      </div>

    </>
  );
}
