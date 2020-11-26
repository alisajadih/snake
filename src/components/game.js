import React, { useEffect, useMemo, useState } from "react";
import Board from "./board";
import { useParams, Link, useLocation, useHistory } from "react-router-dom";

const createSocket = (roomName) =>
  new WebSocket("ws://" + "194.5.207.97" + `/ws/play/${roomName}`);

const mapArrowsToLetter = {
  ArrowUp: "u",
  ArrowDown: "d",
  ArrowLeft: "l",
  ArrowRight: "r",
};
const Game = () => {
  const [joinPlayer, setJoinPlayer] = useState(false);

  const [snake, setSnake] = useState([]);
  const [apple, setApple] = useState({});
  const [id, setId] = useState(null);

  const [snakeTwo, setSnakeTwo] = useState([]);
  const [appleTwo, setAppleTwo] = useState({});
  const [idTwo, setIdTwo] = useState(null);

  const [snakeThree, setSnakeThree] = useState([]);
  const [appleThree, setAppleThree] = useState({});
  const [idThree, setIdThree] = useState(null);

  const [snakeFour, setSnakeFour] = useState([]);
  const [appleFour, setAppleFour] = useState({});
  const [idFour, setIdFour] = useState(null);

  const [error, setError] = useState("");
  const params = useParams();
  const socket = useMemo(() => {
    return createSocket(params.id);
  }, [params.id]);

  useEffect(() => {
    socket.onopen = (e) => {};
    socket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      if (data.status === -1) {
        setError(data.message);
      } else {
        const activeUserId = data.user_id;
        const activeBoard = data.games.filter(
          (game) => game.user_id === activeUserId
        );
        setSnake(activeBoard[0].snake);
        setApple(activeBoard[0].apple);
        setId(activeUserId)

        const restBoardsArray = data.games.filter(
          (game) => game.user_id !== activeUserId
        );
        setSnakeTwo(restBoardsArray[0].snake)
        setAppleTwo(restBoardsArray[0].apple)
        setIdTwo(restBoardsArray[0].user_id)

        setSnakeThree(restBoardsArray[1].snake)
        setAppleThree(restBoardsArray[1].apple)
        setIdThree(restBoardsArray[1].user_id)

        setSnakeFour(restBoardsArray[2].snake)
        setAppleFour(restBoardsArray[2].apple)
        setIdFour(restBoardsArray[2].user_id)
      }
    };
    socket.onclose = function (e) {
      console.error("game socket closed", e);
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
            user_id: id,
          })
        );
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [socket, id]);
  return (
    <>
      <h1 className="mt-4">Snake Game</h1>
      <div className="container mt-5">
        {error && (
          <div className="row">
            <div className="col-12">
              <div class="alert alert-danger" role="alert">
                <span>
                  {`${error}.`}
                  <Link className="text-danger" to="/login">
                    Create New Room !
                  </Link>{" "}
                </span>
              </div>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-4 d-flex flex-column justify-content-between">
            <Board
              className="mt-2"
              haveScore
              snake={snakeTwo}
              apple={appleTwo}
              width={210}
              height={150}
              userId={idTwo}
            />
            <Board
              className="mt-2"
              haveScore
              snake={snakeThree}
              apple={appleThree}
              width={210}
              height={150}
              userId={idThree}
            />
            <Board
              className="mt-2"
              haveScore
              snake={snakeFour}
              apple={appleFour}
              width={210}
              height={150}
              userId={idFour}
            />
          </div>
          <div className="col-8">
            <div className="row">
              <div className="col-6">
                <p className="text-info font-weight-bold">{`Score : ${snake.length}`}</p>
              </div>
              <div className="col-6">
                <p className="text-primary font-weight-bold text-right mr-5">{`user id: ${id}`}</p>
              </div>
            </div>
            <Board snake={snake} apple={apple} width={700} height={500} />
          </div>
          <div className="col-4" style={{ marginTop: 50 }}>
            <div class="alert alert-success" role="alert">
              <span>{window.location.href}</span>
            </div>
          </div>
          <div className="col-4 mt-5 ml-auto">
            <div class="alert alert-info" role="alert">
              <span>Welcome Player {} join!</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
