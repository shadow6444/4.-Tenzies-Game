import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import "./App.css";
import Die from "./components/Die/Die";

function App() {
  /**
   * Challenge: Check the dice array for these winning conditions:
   * 1. All dice are held, and
   * 2. all dice have the same value
   *
   * If both conditions are true, set `tenzies` to true and log
   * "You won!" to the console
   */

  const [tenzies, setTenzies] = useState(false);
  const [dice, setDice] = useState(allNewDice());

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

  function newGame() {
    setTenzies(false);
    setDice(allNewDice());
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
    } else {
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
  const { width, height } = useWindowSize();
  return (
    <main>
      {tenzies && <Confetti height={height} width={width} />}
      <h1 className="title">Tenzies</h1>
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
