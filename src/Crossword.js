import React, { useState, useEffect, useRef } from "react";
import "./App.css";

// Abbie's Daily Crossword data (5×5 word square) — all entries valid
const crosswordData = {
  size: 5,
  grid: [
    ["G", "R", "A", "D", "E"],
    ["L", "O", "V", "E", "D"],
    ["A", "M", "O", "N", "G"],
    ["R", "A", "I", "S", "E"],
    ["E", "N", "D", "E", "D"],
  ],
  clues: {
    across: {
      1: "A mark or level",
      2: "Past tense of love",
      3: "In the middle of",
      4: "To compensate with pay",
      5: "Finished or completed",
    },
    down: {
      1: "An intense stare",
      2: "Auntie Debbie's oldest son",
      3: "To keep away from",
      4: "Closely packed",
      5: "Having a border or edge",
    },
  },
  positions: {
    across: {
      1: { row: 0, col: 0, answer: "GRADE" },
      2: { row: 1, col: 0, answer: "LOVED" },
      3: { row: 2, col: 0, answer: "AMONG" },
      4: { row: 3, col: 0, answer: "RAISE" },
      5: { row: 4, col: 0, answer: "ENDED" },
    },
    down: {
      1: { row: 0, col: 0, answer: "GLARE" },
      2: { row: 0, col: 1, answer: "ROMAN" },
      3: { row: 0, col: 2, answer: "AVOID" },
      4: { row: 0, col: 3, answer: "DENSE" },
      5: { row: 0, col: 4, answer: "EDGED" },
    },
  },
};

export default function Crossword() {
  const [gridInput, setGridInput] = useState(
    crosswordData.grid.map((row) => row.map(() => ""))
  );
  const inputRefs = useRef({});
  const [timeLeft, setTimeLeft] = useState(300);
  const [win, setWin] = useState(false);
  const todaySeed = new Date().toISOString().split("T")[0];
  const [bestTime, setBestTime] = useState(() => {
    const stored = localStorage.getItem(`bestTime-${todaySeed}`);
    return stored ? parseInt(stored, 10) : null;
  });
  const [selectedClue, setSelectedClue] = useState({ num: null, dir: null });

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => (t > 0 && !win ? t - 1 : t));
    }, 1000);
    return () => clearInterval(timer);
  }, [win]);

  // Input handlers
  const handleKeyDown = (e, r, c) => {
    if (e.key === "Backspace") {
      const copy = gridInput.map((row) => [...row]);
      copy[r][c] = "";
      setGridInput(copy);
      const prev = inputRefs.current[`${r}-${c - 1}`];
      if (prev) prev.focus();
    }
  };
  const handleChange = (r, c, val) => {
    if (!/^[A-Za-z]?$/.test(val)) return;
    const copy = gridInput.map((row) => [...row]);
    copy[r][c] = val.toUpperCase();
    setGridInput(copy);
    const next = inputRefs.current[`${r}-${c + 1}`];
    if (next && val) next.focus();
    checkComplete(copy);
  };
  const checkComplete = (grid) => {
    const positions = { ...crosswordData.positions.across, ...crosswordData.positions.down };
    const done = Object.values(positions).every(({ row, col, answer }) =>
      answer.split("").every((ch, i) => {
        const dir = crosswordData.positions.across[row]?.answer === answer ? "across" : "down";
        const rr = dir === "across" ? row : row + i;
        const cc = dir === "across" ? col + i : col;
        return grid[rr][cc] === ch;
      })
    );
    if (done) {
      setWin(true);
      const elapsed = 300 - timeLeft;
      if (!bestTime || elapsed < bestTime) {
        setBestTime(elapsed);
        localStorage.setItem(`bestTime-${todaySeed}`, elapsed);
      }
    }
  };

  // Highlight logic via clue list only
  const handleClueClick = (num, dir) => {
    setSelectedClue((sel) =>
      sel.num === num && sel.dir === dir ? { num: null, dir: null } : { num, dir }
    );
  };
  const isHighlighted = (r, c) => {
    const { num, dir } = selectedClue;
    if (!num) return false;
    const pos = crosswordData.positions[dir][num];
    return dir === "across"
      ? r === pos.row && c >= pos.col && c < pos.col + pos.answer.length
      : c === pos.col && r >= pos.row && r < pos.row + pos.answer.length;
  };

  const getClueNumber = (r, c) => {
    for (const [n, pos] of Object.entries(crosswordData.positions.across))
      if (pos.row === r && pos.col === c) return n;
    for (const [n, pos] of Object.entries(crosswordData.positions.down))
      if (pos.row === r && pos.col === c) return n;
    return null;
  };

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:
${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="crossword-container">
      <div className="top-bar">
        <div>🕒 {formatTime(timeLeft)}</div>
        {win && <div className="win-banner">🎉 You Win! 🎉</div>}
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${crosswordData.size}, 40px)`,
          gridTemplateRows: `repeat(${crosswordData.size}, 40px)`,
        }}
      >
        {gridInput.map((row, r) =>
          row.map((_, c) => {
            const sol = crosswordData.grid[r][c];
            const active = sol !== "";
            const num = getClueNumber(r, c);
            return (
              <div
                key={`${r}-${c}`}
                className={`cell-wrapper ${isHighlighted(r, c) ? "highlight" : ""}`}>
                {num && <div className="clue-number">{num}</div>}
                <input
                  ref={(el) => (inputRefs.current[`${r}-${c}`] = el)}
                  className={`cell ${!active ? "empty-cell" : ""}`} 
                  type="text" 
                  maxLength={1} 
                  value={gridInput[r][c]} 
                  onKeyDown={(e) => handleKeyDown(e, r, c)}
                  onChange={(e) => handleChange(r, c, e.target.value)}
                  disabled={!active}
                />
              </div>
            );
          })
        )}
      </div>

      <div className="clue-list">
        <div>
          <h3>Across</h3>
          {Object.entries(crosswordData.clues.across).map(([n, clue]) => (
            <div
              key={n}
              className={
                selectedClue.num === n && selectedClue.dir === "across"
                  ? "selected-clue"
                  : ""
              }
              onClick={() => handleClueClick(n, "across")}
            >
              <strong>{n}.</strong> {clue}
            </div>
          ))}
        </div>
        <div>
          <h3>Down</h3>
          {Object.entries(crosswordData.clues.down).map(([n, clue]) => (
            <div
              key={n}
              className={
                selectedClue.num === n && selectedClue.dir === "down"
                  ? "selected-clue"
                  : ""
              }
              onClick={() => handleClueClick(n, "down")}
            >
              <strong>{n}.</strong> {clue}
            </div>
          ))}
        </div>
      </div>

      {bestTime !== null && (
        <div className="leaderboard">
          🏆 Best time today: {formatTime(bestTime)}
        </div>
      )}
    </div>
  );
}
