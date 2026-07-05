import { useState } from "react";
import ActivityLayout from "../common/ActivityLayout";
import { toHebrewWord } from "../../utils/hebrewNumbers";

// ── Types ─────────────────────────────────────────────────────────────────────

type Player = "teacher" | "student";
type NumState = "available" | "danger" | "lethal" | "used" | "over";

interface Move {
  id: number;
  player: Player;
  amount: number;
  running: number;
}

interface GameState {
  total: number;
  usedNumbers: number[];
  moves: Move[];
  currentTurn: Player;
  gameOver: boolean;
  loser: Player | null;
}

// ── Pure helpers ──────────────────────────────────────────────────────────────

function buildGame(): GameState {
  return {
    total: 0,
    usedNumbers: [],
    moves: [],
    currentTurn: "teacher",
    gameOver: false,
    loser: null,
  };
}

function playerLabel(p: Player): string {
  return p === "teacher" ? "👩‍🏫 Teacher" : "🎓 Student";
}

function hebrewShekel(n: number): string {
  return `${toHebrewWord(n)} שְׁקָלִים`;
}

function getNumState(n: number, used: number[], total: number): NumState {
  if (used.includes(n)) return "used";
  const next = total + n;
  if (next > 100) return "over";
  if (next === 100) return "lethal";
  if (next >= 90) return "danger";
  return "available";
}

function numBtnClass(state: NumState): string {
  return `dh-num-btn dh-num-btn--${state}`;
}

// ── Sub-components ────────────────────────────────────────────────────────────

interface MoveHistoryProps {
  readonly moves: Move[];
}

function MoveHistory({ moves }: MoveHistoryProps) {
  if (moves.length === 0) {
    return <p className="game-history-empty">No moves yet — start playing!</p>;
  }
  return (
    <div className="game-history-list">
      {moves.map((m) => (
        <div key={m.id} className={`game-history-row game-history-row--${m.player}`}>
          <span className="game-history-icon">
            {m.player === "teacher" ? "👩‍🏫" : "🎓"}
          </span>
          <span className="game-history-add">+₪{m.amount}</span>
          <span className="game-history-arrow">→</span>
          <span className="game-history-running">₪{m.running}</span>
          <span className="game-history-he" dir="rtl">
            {toHebrewWord(m.running)}
          </span>
          {m.running === 100 && <span className="game-history-boom">💥</span>}
        </div>
      ))}
    </div>
  );
}

interface NumberGridProps {
  readonly usedNumbers: number[];
  readonly total: number;
  readonly onPick: (n: number) => void;
}

function NumberGrid({ usedNumbers, total, onPick }: NumberGridProps) {
  const numbers = Array.from({ length: 20 }, (_, i) => i + 1);
  return (
    <div className="dh-number-grid">
      {numbers.map((n) => {
        const state = getNumState(n, usedNumbers, total);
        const isDisabled = state === "used" || state === "over";
        return (
          <button
            key={n}
            className={numBtnClass(state)}
            onClick={() => onPick(n)}
            disabled={isDisabled}
          >
            <span className="dh-num-shekel">₪{n}</span>
            <span className="dh-num-he" dir="rtl">
              {toHebrewWord(n)}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface Props {
  readonly onBack: () => void;
}

export default function DontHit100({ onBack }: Props) {
  const [game, setGame] = useState<GameState>(buildGame);

  const handlePick = (n: number) => {
    setGame((g) => {
      const state = getNumState(n, g.usedNumbers, g.total);
      if (state === "used" || state === "over") return g;
      const newTotal = g.total + n;
      const boom = newTotal === 100;
      const move: Move = { id: g.moves.length, player: g.currentTurn, amount: n, running: newTotal };
      return {
        ...g,
        total: newTotal,
        usedNumbers: [...g.usedNumbers, n],
        moves: [...g.moves, move],
        currentTurn: g.currentTurn === "teacher" ? "student" : "teacher",
        gameOver: boom,
        loser: boom ? g.currentTurn : null,
      };
    });
  };

  const handleReset = () => setGame(buildGame());

  return (
    <ActivityLayout
      title="Don't Hit 100"
      titleHe="אַל תִּגַּע בְּמֵאָה"
      emoji="🧨"
      onBack={onBack}
    >
      <div className="activity-grid">
        <div className="activity-left">
          {/* Running total */}
          <div className="game-total-card">
            <span className="game-total-label">Running Total</span>
            <span className="game-total-amount">₪{game.total}</span>
            <span className="game-total-he" dir="rtl">
              {game.total === 0 ? "אֶפֶס שְׁקָלִים" : hebrewShekel(game.total)}
            </span>
          </div>

          {/* Game over or turn indicator */}
          {game.gameOver ? (
            <div className="game-over-card card">
              <span className="game-over-icon">🧨</span>
              <p className="game-over-msg">
                {playerLabel(game.loser ?? "teacher")} hit ₪100!
              </p>
              <p className="game-over-reveal" dir="rtl">
                מֵאָה שְׁקָלִים — הַפְּסֵד!
              </p>
              <button className="ctrl-btn ctrl-btn--next" onClick={handleReset}>
                ↺ New Game
              </button>
            </div>
          ) : (
            <div className={`game-turn-badge game-turn-badge--${game.currentTurn}`}>
              <span className="game-turn-label">
                {playerLabel(game.currentTurn)}'s turn
              </span>
              <span className="game-turn-sub">
                Say your number in Hebrew, then click!
              </span>
            </div>
          )}

          {/* Number legend + grid */}
          {!game.gameOver && (
            <>
              <div className="dh-legend">
                <span className="dh-legend-dot dh-legend-dot--available" />
                <span className="dh-legend-text">available</span>
                <span className="dh-legend-dot dh-legend-dot--danger" />
                <span className="dh-legend-text">risky (≥₪90)</span>
                <span className="dh-legend-dot dh-legend-dot--lethal" />
                <span className="dh-legend-text">💀 = ₪100</span>
                <span className="dh-legend-dot dh-legend-dot--used" />
                <span className="dh-legend-text">used</span>
              </div>
              <NumberGrid
                usedNumbers={game.usedNumbers}
                total={game.total}
                onPick={handlePick}
              />
            </>
          )}
        </div>

        <div className="activity-right">
          <h3 className="section-label">📋 Move History</h3>
          <MoveHistory moves={game.moves} />
        </div>
      </div>
    </ActivityLayout>
  );
}
