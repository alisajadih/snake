import React from "react";
import Apple from "./apple";
import Snake from "./snake";

const Board = ({ snake, apple, haveScore, className, userId, ...rest }) => {
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
        <Apple apple={apple} height={rest.height} width={rest.width} />
      </div>
      {haveScore && (
        <div className="row">
          <div className="col-4">
            <p className="font-weight-bold text-primary">
              score:{snake.length}
            </p>
          </div>
          <div className="col-6">
            <p className="font-weight-bold text-info">
              user id:{userId === null && "No Player"}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Board;
// [{
//   snake : [{} , {} , {}]
//   apple : {}
// } , {} , {} , {}]
