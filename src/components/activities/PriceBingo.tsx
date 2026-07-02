import { useState, useCallback } from "react";
import ActivityLayout from "../common/ActivityLayout";
import { toHebrewWord } from "../../utils/hebrewNumbers";

// Curated pool of lesson-relevant prices
const PRICE_POOL = [
  3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  19, 20, 22, 24, 25, 26, 28, 30, 35, 38, 40, 42, 45, 47, 50, 55,
];

const GRID_SIZE = 16;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateGrid(): number[] {
  return shuffle(PRICE_POOL).slice(0, GRID_SIZE);
}

type CellState = "idle" | "correct" | "wrong";

interface Props {
  onBack: () => void;
}

export default function PriceBingo({ onBack }: Props) {
  const [grid, setGrid] = useState<number[]>(generateGrid);
  const [calledPrice, setCalledPrice] = useState<number | null>(null);
  const [calledHistory, setCalledHistory] = useState<Set<number>>(new Set());
  const [cellStates, setCellStates] = useState<Record<number, CellState>>({});
  const [score, setScore] = useState({ correct: 0, wrong: 0 });

  const uncalled = grid.filter((p) => !calledHistory.has(p));

  const callNext = useCallback(() => {
    if (uncalled.length === 0) return;
    const next = uncalled[Math.floor(Math.random() * uncalled.length)];
    setCalledPrice(next);
    setCalledHistory((prev) => new Set([...prev, next]));
    // clear any previous wrong flash
    setCellStates((prev) => {
      const cleaned: Record<number, CellState> = {};
      Object.entries(prev).forEach(([k, v]) => {
        if (v === "correct") cleaned[Number(k)] = "correct";
      });
      return cleaned;
    });
  }, [uncalled]);

  const handleCellClick = useCallback((price: number) => {
    if (calledPrice === null) return;
    if (cellStates[price] === "correct") return; // already marked

    if (price === calledPrice) {
      setCellStates((prev) => ({ ...prev, [price]: "correct" }));
      setScore((s) => ({ ...s, correct: s.correct + 1 }));
      setCalledPrice(null);
    } else {
      setCellStates((prev) => ({ ...prev, [price]: "wrong" }));
      setScore((s) => ({ ...s, wrong: s.wrong + 1 }));
      setTimeout(() => {
        setCellStates((prev) => {
          const next = { ...prev };
          if (next[price] === "wrong") delete next[price];
          return next;
        });
      }, 900);
    }
  }, [calledPrice, cellStates]);

  const newCard = () => {
    setGrid(generateGrid());
    setCalledPrice(null);
    setCalledHistory(new Set());
    setCellStates({});
    setScore({ correct: 0, wrong: 0 });
  };

  const correctCount = Object.values(cellStates).filter((s) => s === "correct").length;
  const allDone = correctCount === GRID_SIZE;

  return (
    <ActivityLayout
      title="Price Bingo"
      titleHe="בִּינְגּוֹ מְחִירִים"
      emoji="🎱"
      onBack={onBack}
    >
      <div className="bingo-layout">
        {/* Left: called number panel */}
        <div className="bingo-side">
          <div className="bingo-call-panel">
            {calledPrice !== null ? (
              <>
                <p className="bingo-call-label">מְחִיר נִקְרָא / Called price</p>
                <p className="bingo-call-word" dir="rtl">{toHebrewWord(calledPrice)}</p>
                <p className="bingo-call-hint">Find this on your card →</p>
              </>
            ) : (
              <p className="bingo-call-empty">
                {allDone ? "🎉 כַּרְטִיס מָלֵא! Card complete!" : 'Press "Call Number" to begin'}
              </p>
            )}
          </div>

          <div className="bingo-controls">
            <button
              className="ctrl-btn ctrl-btn--next"
              onClick={callNext}
              disabled={calledPrice !== null || uncalled.length === 0}
            >
              📣 Call Number
            </button>
            <button className="ctrl-btn ctrl-btn--reset" onClick={newCard}>
              ↺ New Card
            </button>
          </div>

          <div className="bingo-score">
            <div className="bingo-score-item bingo-score--correct">
              <span>✓</span><span>{score.correct} correct</span>
            </div>
            <div className="bingo-score-item bingo-score--wrong">
              <span>✗</span><span>{score.wrong} wrong</span>
            </div>
            <div className="bingo-score-item">
              <span>🔢</span>
              <span>{uncalled.length} left to call</span>
            </div>
          </div>
        </div>

        {/* Right: bingo card grid */}
        <div className="bingo-card-area">
          <div className="bingo-card-header">
            <span className="bingo-letter">ב</span>
            <span className="bingo-letter">י</span>
            <span className="bingo-letter">נ</span>
            <span className="bingo-letter">ג</span>
            <span className="bingo-letter">ו</span>
            <span className="bingo-letter" style={{ visibility: "hidden" }}>X</span>
            <span className="bingo-letter">B</span>
            <span className="bingo-letter">I</span>
            <span className="bingo-letter">N</span>
            <span className="bingo-letter">G</span>
            <span className="bingo-letter">O</span>
          </div>
          <div className="bingo-grid">
            {grid.map((price, idx) => {
              const state = cellStates[price] ?? "idle";
              return (
                <button
                  key={idx}
                  className={`bingo-cell bingo-cell--${state} ${calledPrice === price ? "bingo-cell--lit" : ""}`}
                  onClick={() => handleCellClick(price)}
                  disabled={state === "correct" || calledPrice === null}
                >
                  <span className="bingo-cell-price">₪{price}</span>
                  {state === "correct" && <span className="bingo-cell-mark">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </ActivityLayout>
  );
}
