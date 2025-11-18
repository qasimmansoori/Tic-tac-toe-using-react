import { useState, useEffect } from "react";

function Tic() {
  const winCheck = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [moves, setMoves] = useState(0);

  // CHECK WIN
  function checkWinner(b) {
    for (let [a, b1, c] of winCheck) {
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
        return b[a]; 
      }
    }
    return null;
  }

  // PLAYER MOVE
  function handleClick(index) {
    if (board[index] || winner) return; 

    const copy = [...board];
    copy[index] = "X"; 
    setBoard(copy);
    setMoves(m => m + 1);

    const w = checkWinner(copy);
    if (w) {
      setWinner(w);
      return;
    }

    
    setTimeout(() => computerMove(copy), 300);
  }

  
  function computerMove(b) {
    if (winner) return;

    const empty = b
      .map((v, i) => (v === null ? i : null))
      .filter(v => v !== null);

    if (empty.length === 0) return;

    const randomIndex = empty[Math.floor(Math.random() * empty.length)];

    const copy = [...b];
    copy[randomIndex] = "O";

    setBoard(copy);
    setMoves(m => m + 1);

    const w = checkWinner(copy);
    if (w) {
      setWinner(w);
    }
  }

 
  function restart() {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setMoves(0);
  }

  return (
    <div className="page">
      <div className="left">
        <h1 className="main-name">Tic Tac Toe</h1>

        <div className="grid">
          {board.map((val, i) => (
            <button key={i} onClick={() => handleClick(i)}>
              {val}
            </button>
          ))}
        </div>
      </div>

      <div className="right">
        <h2 className="game-info">Game Info</h2>
        <p classNmae="winner">Winner: {winner ?? "None"}</p>
        <p className="moves-played">Moves Played: {moves}</p>
        <button className="restart" onClick={restart}>Restart</button>
      </div>
    </div>
  );
}

export default Tic;
