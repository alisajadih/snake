import React from "react";

const Snake = (props) => {
  const { snake, width, height } = props;

  return (
    <>
      {snake.map((dot, idx) => (
        <div
          key={idx}
          className="snake"
          data-testid="snake"
          style={{
            left: `${(width / 20) * dot.x}px`,
            top: `${(height / 14) * dot.y}px`,
            width: `${width / 20}px`,
            height: `${height / 14}px`,
          }}
        ></div>
      ))}
    </>
  );
};

export default Snake;
