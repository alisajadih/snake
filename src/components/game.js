import React, { useEffect, useMemo, useState } from "react";
import Board from "./board";
import { useParams } from "react-router-dom";

const createSocket = (roomName) =>
  new WebSocket("ws://" + "194.5.207.97" + `/ws/play/${roomName}`);

const mapArrowsToLetter = {
  ArrowUp: "u",
  ArrowDown: "d",
  ArrowLeft: "l",
  ArrowRight: "r",
};
const Game = () => {
  const [snake, setSnake] = useState([]);
  const [apple, setApple] = useState({});

  const [snakeTwo, setSnakeTwo] = useState([]);
  const [appleTwo, setAppleTwo] = useState({});

  const [snakeThree, setSnakeThree] = useState([]);
  const [appleThree, setAppleThree] = useState({});

  const [snakeFour, setSnakeFour] = useState([]);
  const [appleFour, setAppleFour] = useState({});

  const router = useParams();
  const socket = useMemo(() => {
    return createSocket(router.id);
  }, [router.id]);
  useEffect(() => {
    socket.onopen = (e) => {};
    socket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      setSnake(data.snake);
      setApple(data.apple);
    };
    socket.onclose = function (e) {
      console.error("game socket closed");
    };
    const handleKeyDown = (e) => {
      const isArrows =
        e.key === "ArrowUp" ||
        e.key === "ArrowDown" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight";
      isArrows &&
        socket.send(
          JSON.stringify({
            message: mapArrowsToLetter[e.key],
            user_id: router.id,
          })
        );
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [router.id, socket]);
  return (
    <>
      <h1 className="mt-4">Snake Game</h1>
      <div className="container mt-5">
        <div className="row">
          <div className="col-4 d-flex flex-column justify-content-between">
            <Board
              className = 'mt-2'
              haveScore
              snake={snakeTwo}
              apple={appleTwo}
              width={210}
              height={150}
            />
            <Board
              className = 'mt-2'
              haveScore
              snake={snakeThree}
              apple={appleThree}
              width={210}
              height={150}
            />
            <Board
              className = 'mt-2'
              haveScore
              snake={snakeFour}
              apple={appleFour}
              width={210}
              height={150}
            />
          </div>
          <div className="col-8">
            <p className="text-info font-weight-bold">{`Score : ${snake.length}`}</p>
            <Board snake={snake} apple={apple} width={700} height={500} />
          </div>
          <div className="col-4 " style={{ marginTop: 50 }}>
            <div class="alert alert-success" role="alert">
              <span>{`http://localhost:3000/play/${router.id}`}</span>{" "}
            </div>
          </div>
          <div className="col-8 mt-5">
            {/* <button
              onClick={() => setIsStart(true)}
              className="btn btn-success mx-auto d-block"
            >
              Start Game!
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
