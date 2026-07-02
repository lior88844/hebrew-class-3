import { useState, useCallback } from "react";
import ActivityLayout from "../common/ActivityLayout";
import { toHebrewWord } from "../../utils/hebrewNumbers";

// Two modes:
//   "word-to-digit"  — show Hebrew word, student picks the correct numeral
//   "digit-to-word"  — show a numeral, student picks the correct Hebrew word

type Mode = "word-to-digit" | "digit-to-word";

// Pool of prices used in the lesson
const PRICE_POOL = [
  3, 5, 7, 8, 9, 11, 12, 14, 16, 18, 22, 24, 26, 28, 35, 38, 42, 47, 52, 55,
];

function pickRandom<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

function buildOptions(correct: number, pool: number[]): number[] {
  const others = pickRandom(pool.filter((p) => p !== correct), 3);
  return [correct, ...others].sort(() => Math.random() - 0.5);
}

interface Round {
  price: number;
  options: number[];
}

function generateRounds(count: number): Round[] {
  const prices = pickRandom(PRICE_POOL, count);
  return prices.map((price) => ({
    price,
    options: buildOptions(price, PRICE_POOL),
  }));
}

type FeedbackState = "idle" | "correct" | "wrong";

interface Props {
  onBack: () => void;
}

export default function ShoppingDictation({ onBack }: Props) {
  const [mode, setMode] = useState<Mode>("word-to-digit");
  const [rounds, setRounds] = useState<Round[]>(() => generateRounds(8));
  const [roundIdx, setRoundIdx] = useState(0);
  const [feedback, setFeedback] = useState<Record<number, FeedbackState>>({});
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [answered, setAnswered] = useState(false);

  const round = rounds[roundIdx];
  const total = rounds.length;
  const done = roundIdx >= total;

  const handleAnswer = useCallback((chosen: number) => {
    if (answered) return;
    const isCorrect = chosen === round.price;
    setFeedback({ [chosen]: isCorrect ? "correct" : "wrong" });
    setScore((s) => ({
      correct: s.correct + (isCorrect ? 1 : 0),
      wrong:   s.wrong   + (isCorrect ? 0 : 1),
    }));
    setAnswered(true);
  }, [answered, round]);

  const next = () => {
    setRoundIdx((i) => i + 1);
    setFeedback({});
    setAnswered(false);
  };

  const restart = () => {
    setRounds(generateRounds(8));
    setRoundIdx(0);
    setFeedback({});
    setAnswered(false);
    setScore({ correct: 0, wrong: 0 });
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    restart();
  };

  return (
    <ActivityLayout
      title="Price Dictation"
      titleHe="הַכָּתָבַת מְחִירִים"
      emoji="🎯"
      onBack={onBack}
    >
      <div className="pd-layout">
        {/* Mode toggle */}
        <div className="pd-mode-row">
          <button
            className={`nr-tab ${mode === "word-to-digit" ? "nr-tab--active" : ""}`}
            onClick={() => switchMode("word-to-digit")}
          >
            Hebrew word → numeral
          </button>
          <button
            className={`nr-tab ${mode === "digit-to-word" ? "nr-tab--active" : ""}`}
            onClick={() => switchMode("digit-to-word")}
          >
            Numeral → Hebrew word
          </button>
        </div>

        {done ? (
          <div className="pd-done-screen">
            <p className="pd-done-emoji">🏆</p>
            <p className="pd-done-title">סִיַּמְתָּ! / Finished!</p>
            <p className="pd-done-score">
              {score.correct} / {total} correct
            </p>
            <button className="ctrl-btn ctrl-btn--next" style={{ marginTop: "1rem" }} onClick={restart}>
              ↺ Play Again
            </button>
          </div>
        ) : (
          <div className="pd-game">
            {/* Progress */}
            <div className="pd-progress-bar">
              <div
                className="pd-progress-fill"
                style={{ width: `${(roundIdx / total) * 100}%` }}
              />
            </div>
            <p className="pd-progress-label">{roundIdx + 1} / {total}</p>

            {/* Prompt */}
            <div className="pd-prompt">
              {mode === "word-to-digit" ? (
                <>
                  <p className="pd-prompt-label">מָה הַמִּסְפָּר? / What is the number?</p>
                  <p className="pd-prompt-word" dir="rtl">
                    {toHebrewWord(round.price)} שְׁקָלִים
                  </p>
                </>
              ) : (
                <>
                  <p className="pd-prompt-label">מָה הַמִּלָּה בְּעִבְרִית? / What is the Hebrew word?</p>
                  <p className="pd-prompt-digit">₪{round.price}</p>
                </>
              )}
            </div>

            {/* Answer options */}
            <div className="pd-options">
              {round.options.map((opt) => {
                const fb = feedback[opt] ?? "idle";
                return (
                  <button
                    key={opt}
                    className={`pd-option pd-option--${fb}`}
                    onClick={() => handleAnswer(opt)}
                    disabled={answered}
                  >
                    {mode === "word-to-digit" ? (
                      <span className="pd-option-digit">₪{opt}</span>
                    ) : (
                      <span className="pd-option-word" dir="rtl">
                        {toHebrewWord(opt)} שְׁקָלִים
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {answered && (
              <div className="pd-next-row">
                <div className={feedback[round.price] === "correct"
                  ? "success-banner"
                  : "warning-banner"}
                  style={{ flex: 1 }}
                >
                  {feedback[round.price] === "correct"
                    ? `✓ נָכוֹן! — ₪${round.price} = ${toHebrewWord(round.price)} שְׁקָלִים`
                    : `✗ הַתְּשׁוּבָה הַנְּכוֹנָה: ₪${round.price} = ${toHebrewWord(round.price)} שְׁקָלִים`}
                </div>
                <button className="ctrl-btn ctrl-btn--next" onClick={next}>
                  {roundIdx + 1 < total ? "Next →" : "Finish →"}
                </button>
              </div>
            )}

            {/* Score */}
            <div className="bingo-score" style={{ marginTop: "1rem" }}>
              <div className="bingo-score-item bingo-score--correct">✓ {score.correct} correct</div>
              <div className="bingo-score-item bingo-score--wrong">✗ {score.wrong} wrong</div>
            </div>
          </div>
        )}
      </div>
    </ActivityLayout>
  );
}
