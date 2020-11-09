import { useState, useEffect, useReducer, useRef } from "react";
import { INIT_STATE } from "../initialState";
import { snakeReducer } from "../logic";

export default function useSnake() {
  const [snakeState, dispatch] = useReducer(snakeReducer, INIT_STATE);
 

  const interval = useRef(null);
  useEffect(() => {
    const handleKeyPress = (e) => {
      dispatch({ type: e.key });
    };
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []);
  useEffect(() => {
    interval.current = setInterval(() => {
      dispatch({ type: "MOVE" });
    }, 100);
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  return snakeState;
}

// if (e.key === "w" || e.key === "s" || e.key === "d" || e.key === "a")
//   clearInterval(snakeInterval);
