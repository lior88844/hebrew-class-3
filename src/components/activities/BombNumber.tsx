import { useState } from "react";
import ActivityLayout from "../common/ActivityLayout";
import { toHebrewWord } from "../../utils/hebrewNumbers";

// ── Types ─────────────────────────────────────────────────────────────────────

type Player = "teacher" | "student";

interface Move {
  id: number;
  player: Player;
  amount: number;
  running: number;
}

interface GameState {
  bombNumber: number;
  total: number;
  moves: Move[];
  currentTurn: Player;
  currentOptions: number[];
  gameOver: boolean;
  loser: Player | null;
}

// ── Pure helpers ──────────────────────────────────────────────────────────────

function generateOptions(): number[] {
  const nums: number[] = [];
  while (nums.length < 4) {
    const n = Math.floor(Math.random() * 20) + 1;
    if (!nums.includes(n)) nums.push(n);
  }
  return nums.sort((a, b) => a - b);
}

function buildGame(bomb: number): GameState {
  return {
    bombNumber: bomb,
    total: 0,
    moves: [],
    currentTurn: "teacher",
    currentOptions: generateOptions(),
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

// ── Sub-components ────────────────────────────────────────────────────────────

interface MoveHistoryProps {
  readonly moves: Move[];
  readonly bombNumber: number;
}

function MoveHistory({ moves, bombNumber }: MoveHistoryProps) {
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
          {m.running === bombNumber && (
            <span className="game-history-boom">💥</span>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface Props {
  readonly onBack: () => void;
}

export default function BombNumber({ onBack }: Props) {
  const [bombInput, setBombInput] = useState(70);
  const [game, setGame] = useState<GameState | null>(null);

  const handleStart = () => setGame(buildGame(bombInput));
  const handleReset = () => setGame(null);

  const handleRandomBomb = () => {
    setBombInput(Math.floor(Math.random() * 71) + 40);
  };

  const handleBombChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBombInput(Math.max(30, Math.min(120, Number(e.target.value))));
  };

  const handlePick = (amount: number) => {
    setGame((g) => {
      if (!g || g.gameOver) return g;
      const newTotal = g.total + amount;
      const boom = newTotal === g.bombNumber;
      const move: Move = { id: g.moves.length, player: g.currentTurn, amount, running: newTotal };
      return {
        ...g,
        total: newTotal,
        moves: [...g.moves, move],
        currentTurn: g.currentTurn === "teacher" ? "student" : "teacher",
        currentOptions: boom ? g.currentOptions : generateOptions(),
        gameOver: boom,
        loser: boom ? g.currentTurn : null,
      };
    });
  };

  // ── Setup screen ─────────────────────────────────────────────────────────

  if (!game) {
    return (
      <ActivityLayout
        title="Bomb Number"
        titleHe="מִסְפַּר הַפְּצָצָה"
        emoji="💣"
        onBack={onBack}
      >
        <div className="bomb-setup">
          <div className="bomb-setup-card card">
            <span className="bomb-setup-icon">💣</span>
            <h2 className="bomb-setup-title">Set the Secret Bomb</h2>
            <p className="bomb-setup-desc">
              Choose a hidden ₪ target. Players take turns adding amounts in
              Hebrew — whoever lands exactly on the bomb loses!
            </p>

            <div className="bomb-input-row">
              <label className="bomb-input-label" htmlFor="bomb-val">
                Bomb: ₪
              </label>
              <input
                id="bomb-val"
                type="number"
                className="bomb-input"
                value={bombInput}
                min={30}
                max={120}
                onChange={handleBombChange}
              />
              <button
                className="ctrl-btn ctrl-btn--reset"
                onClick={handleRandomBomb}
              >
                🎲 Random
              </button>
            </div>

            <p className="bomb-setup-preview" dir="rtl">
              {hebrewShekel(bombInput)}
            </p>

            <button className="ctrl-btn ctrl-btn--next" onClick={handleStart}>
              Hide Bomb &amp; Start →
            </button>
          </div>
        </div>
      </ActivityLayout>
    );
  }

  // ── Active game ───────────────────────────────────────────────────────────

  return (
    <ActivityLayout
      title="Bomb Number"
      titleHe="מִסְפַּר הַפְּצָצָה"
      emoji="💣"
      onBack={onBack}
    >
      <div className="activity-grid">
        <div className="activity-left">
          {/* Running total */}
          <div className="game-total-card">
            <span className="game-total-label">Running Total</span>
            <span className="game-total-amount">₪{game.total}</span>
            <span className="game-total-he" dir="rtl">
              {hebrewShekel(game.total)}
            </span>
          </div>

          {/* Game over or turn indicator */}
          {game.gameOver ? (
            <div className="game-over-card card">
              <span className="game-over-icon">💥</span>
              <p className="game-over-msg">
                {playerLabel(game.loser ?? "teacher")} hit the bomb!
              </p>
              <p className="game-over-reveal" dir="rtl">
                הַפְּצָצָה הָיְתָה: {hebrewShekel(game.bombNumber)} (₪
                {game.bombNumber})
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
                Say your pick in Hebrew, then click!
              </span>
            </div>
          )}

          {/* Pick options */}
          {!game.gameOver && (
            <div className="bomb-options">
              <p className="bomb-options-heading">Add to total:</p>
              <div className="bomb-option-grid">
                {game.currentOptions.map((n) => (
                  <button
                    key={n}
                    className="bomb-option-btn"
                    onClick={() => handlePick(n)}
                  >
                    <span className="bomb-option-plus">+</span>
                    <span className="bomb-option-shekel">₪{n}</span>
                    <span className="bomb-option-he" dir="rtl">
                      {toHebrewWord(n)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="activity-right">
          <h3 className="section-label">📋 Move History</h3>
          <MoveHistory moves={game.moves} bombNumber={game.bombNumber} />
        </div>
      </div>
    </ActivityLayout>
  );
}
