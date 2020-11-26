import React from "react";
import Apple from "./apple";
import Snake from "./snake";


const Board = ({snake , apple , haveScore ,className , ...rest}) => {
  return (
    <>
    <div
      className={`game-board ${className}`}
      style={{
        width: `${rest.width}px`,
        height: `${rest.height}px`,
      }}
    >
      <Snake snake={snake} height={rest.height} width={rest.width} />
      <Apple apple={apple} height={rest.height} width={rest.width}/>
    </div>
    {haveScore && <p className='font-weight-bold text-primary'>score: {snake.length}</p>}
    </>
  );
};

export default Board;
// [{
//   snake : [{} , {} , {}]
//   apple : {}
// } , {} , {} , {}]