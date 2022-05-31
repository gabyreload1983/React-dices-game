import "./App.css";
import Die from "./components/Die";
import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const won =
      dice.every((die) => die.isHeld) &&
      dice.every((die) => dice[0].value === die.value);
    if (won) setTenzies(true);
  }, [dice]);

  function newDie() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(newDie());
    }
    return newDice;
  }

  function rollDice() {
    if (tenzies) {
      setCount(0);
      setTenzies(false);
      setDice(allNewDice());
    } else {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : newDie();
        })
      );
      setCount((prevCount) => prevCount + 1);
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDice={() => holdDice(die.id)}
      />
    );
  });

  return (
    <div className="App">
      <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="container-dice">{diceElements}</div>
        <button className="btn btn-primary mt-3" onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
        <div className="align-self-start">
          <h4>COUNT: {count}</h4>
        </div>
      </main>
    </div>
  );
}

export default App;
