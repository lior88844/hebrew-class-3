import { useState, useEffect } from "react";
import ActivityLayout from "../common/ActivityLayout";
import { toHebrewWord } from "../../utils/hebrewNumbers";

type Mode = "guided" | "blind";

interface Props {
  readonly onBack: () => void;
}

export default function CountTo100({ onBack }: Props) {
  const [mode, setMode] = useState<Mode>("guided");
  const [current, setCurrent] = useState(1);
  const [hintShown, setHintShown] = useState(false);

  // Arrow-key navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        setCurrent((c) => Math.min(c + 1, 100));
        setHintShown(false);
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        setCurrent((c) => Math.max(c - 1, 1));
        setHintShown(false);
      }
    };
    globalThis.addEventListener("keydown", handleKey);
    return () => { globalThis.removeEventListener("keydown", handleKey); };
  }, []);

  const goNext = () => {
    setCurrent((c) => Math.min(c + 1, 100));
    setHintShown(false);
  };

  const goPrev = () => {
    setCurrent((c) => Math.max(c - 1, 1));
    setHintShown(false);
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    setHintShown(false);
  };

  const reset = () => {
    setCurrent(1);
    setHintShown(false);
  };

  const isGuided = mode === "guided";
  const isBlind = !isGuided;
  const showHebrew = isGuided || hintShown;
  const hebrewClass = isGuided ? "c100-hebrew" : "c100-hebrew c100-hebrew--hint";

  return (
    <ActivityLayout
      title="Count to 100"
      titleHe="לִסְפּוֹר עַד מֵאָה"
      emoji="💯"
      onBack={onBack}
    >
      <div className="c100-layout">

        {/* Round toggle */}
        <div className="c100-mode-toggle">
          <button
            className={`c100-mode-btn ${isGuided ? "c100-mode-btn--active" : ""}`}
            onClick={() => switchMode("guided")}
          >
            Round 1 · Guided
          </button>
          <button
            className={`c100-mode-btn ${isBlind ? "c100-mode-btn--active" : ""}`}
            onClick={() => switchMode("blind")}
          >
            Round 2 · Blind 🙈
          </button>
        </div>

        {/* Progress */}
        <div className="c100-progress">
          <span className="c100-progress-label">{current} / 100</span>
          <div className="c100-progress-track">
            <div
              className="c100-progress-fill"
              style={{ width: `${current}%` }}
            />
          </div>
        </div>

        {/* Main number card */}
        <div className={`c100-card card ${isBlind ? "c100-card--blind" : ""}`}>
          <span className="c100-digit">{current}</span>

          {showHebrew ? (
            <span className={hebrewClass} dir="rtl">
              {toHebrewWord(current)}
            </span>
          ) : (
            <button className="c100-hint-btn" onClick={() => setHintShown(true)}>
              👁 Show Hebrew
            </button>
          )}
        </div>

        {/* Navigation */}
        <div className="c100-nav">
          <button
            className="c100-nav-btn"
            onClick={goPrev}
            disabled={current === 1}
          >
            ← Prev
          </button>
          <button className="ctrl-btn ctrl-btn--reset" onClick={reset}>
            ↺ Reset
          </button>
          <button
            className="c100-nav-btn c100-nav-btn--primary"
            onClick={goNext}
            disabled={current === 100}
          >
            Next →
          </button>
        </div>

        <p className="c100-keyboard-hint">
          ← → arrow keys also work
        </p>
      </div>
    </ActivityLayout>
  );
}
