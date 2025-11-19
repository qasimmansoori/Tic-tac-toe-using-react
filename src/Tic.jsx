import { useState } from "react";

function Tic() {
  const winCheck = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [moves, setMoves] = useState(0);

  function checkWinner(b) {
    for (let [a, b1, c] of winCheck) {
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
        return b[a]; 
      }
    }
    return null;
  }

  // THE MINIMAX ALGORITHM (The "Brain") 
 
  function minimax(b, depth, isMaximizing, alpha, beta) {
    const result = checkWinner(b);
    
    if (result === "O") return 10 - depth;
    
    if (result === "X") return depth - 10;
    
    if (!b.includes(null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (b[i] === null) {
          b[i] = "O";
          let score = minimax(b, depth + 1, false, alpha, beta);
          b[i] = null;
          bestScore = Math.max(score, bestScore);
          alpha = Math.max(alpha, bestScore);
          if (beta <= alpha) break;
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (b[i] === null) {
          b[i] = "X";
          let score = minimax(b, depth + 1, true, alpha, beta);
          b[i] = null;
          bestScore = Math.min(score, bestScore);
          beta = Math.min(beta, bestScore);
          if (beta <= alpha) break;
        }
      }
      return bestScore;
    }
  }

  // PLAYER MOVE
  function handleClick(index) {
    if (board[index] || winner) return;

    const copy = [...board];
    copy[index] = "X";
    setBoard(copy);
    setMoves((m) => m + 1);

    const w = checkWinner(copy);
    if (w) {
      setWinner(w);
      return;
    }

    // Check for tie 
    if (!copy.includes(null)) {
       return; 
    }

    // Trigger AI move
    setTimeout(() => computerMove(copy), 300);
  }

  // COMPUTER MOVE
  function computerMove(b) {
    if (winner) return;

    let bestScore = -Infinity;
    let bestMove = -1;

 
    for (let i = 0; i < 9; i++) {
      if (b[i] === null) {
        b[i] = "O"; 
        let score = minimax(b, 0, false, -Infinity, Infinity);
        b[i] = null; 

        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    if (bestMove !== -1) {
      const copy = [...b];
      copy[bestMove] = "O";
      setBoard(copy);
      setMoves((m) => m + 1);

      const w = checkWinner(copy);
      if (w) {
        setWinner(w);
      }
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
        <p className="winner">Winner: {winner ?? "None"}</p>
        <p className="moves-played">Moves Played: {moves}</p>
        
        <button className="restart" onClick={restart}>
          Restart
        </button>
        <p className="minimax-info">This is an unbeatable Tic-Tac-Toe game using Minimax algorithm.</p>

      </div>
    </div>
  );
}

export default Tic;