import { NORTH, EAST, SOUTH, WEST, INIT_STATE } from "./initialState";

export const snakeReducer = (state, action) => {
  switch (action.type) {
    case "w":
      return {
        ...state,
        moves:
          state.moves.slice(-1)[0] !== SOUTH
            ? [...state.moves.slice(1), NORTH]
            : [...state.moves],
      };
    case "s":
      return {
        ...state,
        moves:
          state.moves.slice(-1)[0] !== NORTH
            ? [...state.moves.slice(1), SOUTH]
            : [...state.moves],
      };
    case "d":
      return {
        ...state,
        moves:
          state.moves.slice(-1)[0] !== WEST
            ? [...state.moves.slice(1), EAST]
            : [...state.moves],
      };
    case "a":
      return {
        ...state,
        moves:
          state.moves.slice(-1)[0] !== EAST
            ? [...state.moves.slice(1), WEST]
            : [...state.moves],
      };
    case "MOVE":
      const lastMove = state.moves.slice(-1)[0];
      const newSnake = [
        {
          x: (state.snake[0].x + lastMove.x + state.cols) % state.cols,
          y: (state.snake[0].y + lastMove.y + state.rows) % state.rows,
        },
        ...state.snake,
      ];
      if (newSnake[0].x === state.apple.x && newSnake[0].y === state.apple.y) {
        return {
          ...state,
          snake: newSnake,
          apple: {
            x: Math.floor(Math.random() * state.cols),
            y: Math.floor(Math.random() * state.rows),
          },
        };
      } else {
        const actualSnake = newSnake.slice(0, -1);
        const headSnake = actualSnake[0];
        const restSnake = actualSnake.slice(1);
        const dead = restSnake.some((snake) => checkEq(snake, headSnake));
        return dead ? INIT_STATE : { ...state, snake: actualSnake };
      }

    default:
      return state;
  }
};

function checkEq(ob1, ob2) {
  if (ob1.x === ob2.x && ob1.y === ob2.y) {
    return true;
  }
  return false;
}
