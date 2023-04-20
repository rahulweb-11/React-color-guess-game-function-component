import React, { useEffect, useState } from "react";

const genRanHex = (size) =>
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");

export const Game = () => {
  const [score, setScore] = useState(0);
  const [color, setColor] = useState("#" + genRanHex(6));
  const [array, setArray] = useState(
    shuffle(["#" + genRanHex(6), "#" + genRanHex(6), color])
  );
  const [next, setNext] = useState(false);
  const [message, setMessage] = useState("");

  const checkAnswer = (e) => {
    if (e === color) {
      setScore(score + 1);
      setMessage("Correct");
    } else {
      setMessage("Wrong");
    }

    setNext(true);
  };

  const shuffleArray = () => {
    let newColor = "#" + genRanHex(6);
    setColor(newColor);
    setArray(shuffle(["#" + genRanHex(6), "#" + genRanHex(6), newColor]));
  };

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  return (
    <>
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1em",
        }}
      >
        {/* <div>Score: {score}</div> */}
        <div
          style={{
            width: "250px",
            height: "250px",
            backgroundColor: color,
            marginTop: "50px",
            borderRadius: "10px",
          }}
        ></div>
        <div style={{ display: "flex", gap: "2em" }}>
          {array.map((item, i) => (
            <button
              className="btn btn-light"
              onClick={() => checkAnswer(item)}
              key={i}
              style={next ? { background: item } : { background: "white" }}
            >
              <p>{item}</p>
            </button>
          ))}
        </div>

        {next && (
          <button
            className="btn btn-secondary"
            onClick={() => {
              shuffleArray();
              setMessage("");
              setNext(false);
            }}
          >
            Next
          </button>
        )}
        <div>{message}</div>
      </div>
    </>
  );
};
