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

  // const [snake, setSnake] = useState([]);
  // const [apple, setApple] = useState({});
  // const [id, setId] = useState(null);

  // const [snakeTwo, setSnakeTwo] = useState([]);
  // const [appleTwo, setAppleTwo] = useState({});
  // const [idTwo, setIdTwo] = useState(null);

  // const [snakeThree, setSnakeThree] = useState([]);
  // const [appleThree, setAppleThree] = useState({});
  // const [idThree, setIdThree] = useState(null);

  // const [snakeFour, setSnakeFour] = useState([]);
  // const [appleFour, setAppleFour] = useState({});
  // const [idFour, setIdFour] = useState(null);

  const [currentId, setCurrentId] = useState(1);
  const [socketData, setSocketData] = useState({
    1: {
      snake: [],
      apple: {},
    },
    2: {
      snake: [],
      apple: {},
    },
    3: {
      snake: [],
      apple: {},
    },
    4: {
      snake: [],
      apple: {},
    },
  });

  // console.log(socketData)
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
      } else if ("auth" in data) {
        setCurrentId(data.auth);
      } else {
        // console.log(data)
        setSocketData((prev) => ({
          ...prev,
          [data.user_id]: { snake: data.snake, apple: data.apple },
        }));
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
            user_id: currentId,
          })
        );
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [socket, currentId]);
  // console.log(socketData)
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
            {/* {Object.entries(socketData)
              .filter(([key, value]) => {
                //[key , {data}]
                return parseInt(key) !== currentId;
              })
              .map(([key, data], index) => (
                <Board
                  key={index}
                  className="mt-2"
                  haveScore
                  snake={data.snake}
                  apple={data.apple}
                  width={210}
                  height={150}
                  userId={key}
                />
              ))} */}
          </div>
          <div className="col-8">
            <div className="row">
              <div className="col-6">
                <p className="text-info font-weight-bold">{`Score : ${socketData[currentId].snake.length}`}</p>
              </div>
              <div className="col-6">
                <p className="text-primary font-weight-bold text-right mr-5">{`user id: ${currentId}`}</p>
              </div>
            </div>
            {/* <Board snake={socketData[currentId].snake} apple={socketData[currentId].apple} width={700} height={500} /> */}
          </div>
          <div className="col-4" style={{ marginTop: 50 }}>
            <div className="alert alert-success" role="alert">
              <span>{window.location.href}</span>
            </div>
          </div>
          <div className="col-4 mt-5 ml-auto">
            <div className="alert alert-info" role="alert">
              <span>Welcome Player {} join!</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
