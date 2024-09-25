import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import "./App.css";
import Die from "./components/Die/Die";

function App() {
  const [tenzies, setTenzies] = useState(false);
  const [dice, setDice] = useState(allNewDice());
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(0);
  const [score, setScore] = useState({
    bestTime: JSON.parse(localStorage.getItem("bestTime")) || null,
    bestCount: JSON.parse(localStorage.getItem("bestCount")) || null,
  });

  useEffect(() => {
    setTenzies(dice.every((die) => die.isHeld && die.value === dice[0].value));
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  useEffect(() => {
    if (!tenzies) {
      const time = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      return () => clearInterval(time);
    }
  }, [tenzies]);

  function newGame() {
    setTenzies(false);
    setDice(allNewDice());
    setCount(0);
    setTime(0);
  }

  function allNewDice() {
    const newArray = [];

    for (let i = 0; i < 10; i++) {
      newArray.push(generateNewDie());
    }
    return newArray;
  }

  function holdDice(id) {
    setDice((olDices) =>
      olDices.map((oldDice) => {
        return oldDice.id === id
          ? { ...oldDice, isHeld: !oldDice.isHeld }
          : oldDice;
      })
    );
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDices) =>
        oldDices.map((oldDice) => {
          return oldDice.isHeld ? oldDice : generateNewDie();
        })
      );
      setCount((prevState) => prevState + 1);
    } else {
      if (!score.bestCount || score.bestCount > count) {
        localStorage.setItem("bestCount", count);
        setScore(prevState=>({
          ...prevState,
          bestCount:count
        }))
      }
      if (!score.bestTime || score.bestTime > time) {
        localStorage.setItem("bestTime", time);
        setScore(prevState=>({
          ...prevState,
          bestTime:time
        }))
      }
      newGame();
    }
  }

  const dices = dice.map((diceNumber) => (
    <Die
      key={diceNumber.id}
      id={diceNumber.id}
      value={diceNumber.value}
      isHeld={diceNumber.isHeld}
      holdDice={holdDice}
    />
  ));
  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <div className="score-container">
        <h3>Timer: {`${time}s`}</h3>
        <h3>Count: {count}</h3>
        <h3>Best Time: {score.bestTime ? `${score.bestTime}s` : "N/A"}</h3>
        <h3>Best Count: {score.bestCount ? score.bestCount : "N/A"}</h3>
      </div>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="die-buttons">{dices}</div>
      <button className="dice-roll" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
