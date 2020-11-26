import React from "react";

const Apple = (props) => {
  const { width, height, apple } = props;
  return (
    <div
      className="apple"
      data-testid="apple"
      style={{
        left: `${apple.x * (width / 20)}px`,

        top: `${apple.y * (height / 14)}px`,

        width: `${width / 20}px`,
        height: `${height / 14}px`,
      }}
    ></div>
  );
};

export default Apple;
