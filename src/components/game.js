import React, { useEffect, useMemo, useState } from "react";

import Snake from "./snake";
import Apple from "./apple";
import useSnake from "../hooks/use-snake";
import { INIT_STATE, INIT_STATE_SECOND_BOARD } from "../initialState";
import Board from "./board";
import { useHistory, useParams } from "react-router-dom";
// http://194.5.207.97/

const createSocket = (roomName) =>
  new WebSocket("ws://" + "194.5.207.97" + `/ws/play/${roomName}`);

const mapArrowsToLetter = {
  ArrowUp: "u",
  ArrowDown: "d",
  ArrowLeft: "l",
  ArrowRight: "r",
};
const Game = () => {
  // const [mainState, setIsStart] = useSnake(INIT_STATE);
  // const [secondState] = useSnake(INIT_STATE_SECOND_BOARD);
  const [snake, setSnake] = useState([]);
  const [apple, setApple] = useState({});
  const router = useParams();
  const socket = useMemo(() => {
    return createSocket(router.id);
  }, [router.id]);
  useEffect(() => {
    socket.onopen = (e) => {};
    socket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      // if (data.room_name) {
      // } else {
      //   console.log(data);
      // }
      setSnake(data.snake);
      setApple(data.apple);
    };
    socket.onclose = function (e) {
      console.error("game socket closed");
    };
    const handleKeyDown = (e) => {
      console.log(e.key);
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
  // const handleSendSocket = () => {
  //   socket.send(
  //     JSON.stringify({
  //     })
  //   );
  // };

  return (
    <>
      <h1>Snake Game</h1>
      <div className="container mt-5">
        <div className="row">
          <div className="col-4 d-flex flex-column justify-content-between">
            {/* <Board state={secondState} />
            <Board state={secondState} />
            <Board state={secondState} /> */}
          </div>
          <div className="col-8">
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
