import React from "react";
import Apple from "./apple";
import Snake from "./snake";


const Board = ({snake , apple ,...rest}) => {
  return (
    <div
      className="game-board"
      style={{
        width: `${rest.width}px`,
        height: `${rest.height}px`,
      }}
    >
      <Snake snake={snake} height={rest.height} width={rest.width} />
      <Apple apple={apple} height={rest.height} width={rest.width}/>
    </div>
  );
};

export default Board;
// [{
//   snake : [{} , {} , {}]
//   apple : {}
// } , {} , {} , {}]