import { useState, useEffect, useReducer, useRef } from "react";
import { INIT_STATE } from "../initialState";
import { snakeReducer } from "../logic";

export default function useSnake(init_state) {
  const [snakeState, dispatch] = useReducer(snakeReducer, init_state);
  const [isStart, setIsStart] = useState(false);


  const interval = useRef(null);
  useEffect(() => {
    const handleKeyPress = (e) => {
      dispatch({ type: e.key });
    };

    isStart && document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [isStart]);
  useEffect(() => {
    interval.current =
      isStart &&
      setInterval(() => {
        dispatch({ type: "MOVE" });
      }, 100);
    return () => {
      clearInterval(interval.current);
    };
  }, [isStart]);

  return [snakeState ,setIsStart];
}

// if (e.key === "w" || e.key === "s" || e.key === "d" || e.key === "a")
//   clearInterval(snakeInterval);
