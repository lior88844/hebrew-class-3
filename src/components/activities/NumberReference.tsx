import { useState } from "react";
import ActivityLayout from "../common/ActivityLayout";
import { toHebrewWord } from "../../utils/hebrewNumbers";

// ── Range definitions ──────────────────────────────────────────────────────
const RANGES = [
  { label: "0 – 10",   start: 0,   end: 10  },
  { label: "11 – 20",  start: 11,  end: 20  },
  { label: "21 – 30",  start: 21,  end: 30  },
  { label: "31 – 40",  start: 31,  end: 40  },
  { label: "41 – 50",  start: 41,  end: 50  },
  { label: "51 – 60",  start: 51,  end: 60  },
  { label: "61 – 70",  start: 61,  end: 70  },
  { label: "71 – 80",  start: 71,  end: 80  },
  { label: "81 – 90",  start: 81,  end: 90  },
  { label: "91 – 100", start: 91,  end: 100 },
  { label: "101 – 120",start: 101, end: 120 },
];

function rangeNumbers(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

interface Props {
  onBack: () => void;
}

export default function NumberReference({ onBack }: Props) {
  const [rangeIdx, setRangeIdx] = useState(0);
  const [spotlight, setSpotlight] = useState<number | null>(null);
  // step-through mode
  const [stepMode, setStepMode] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);

  const range = RANGES[rangeIdx];
  const numbers = rangeNumbers(range.start, range.end);

  const spotlitNum = stepMode ? numbers[stepIdx] : spotlight;

  const handleRangeChange = (idx: number) => {
    setRangeIdx(idx);
    setSpotlight(null);
    setStepIdx(0);
    setStepMode(false);
  };

  const handleCardClick = (n: number) => {
    if (stepMode) return;
    setSpotlight(spotlight === n ? null : n);
  };

  const handleStepToggle = () => {
    setStepMode((v) => !v);
    setStepIdx(0);
    setSpotlight(null);
  };

  const stepPrev = () => setStepIdx((i) => Math.max(0, i - 1));
  const stepNext = () => setStepIdx((i) => Math.min(numbers.length - 1, i + 1));

  return (
    <ActivityLayout
      title="Number Reference"
      titleHe="לוּחַ הַמִּסְפָּרִים"
      emoji="🔢"
      onBack={onBack}
    >
      {/* Range tabs */}
      <div className="nr-tabs">
        {RANGES.map((r, i) => (
          <button
            key={i}
            className={`nr-tab ${rangeIdx === i ? "nr-tab--active" : ""}`}
            onClick={() => handleRangeChange(i)}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="nr-body">
        {/* Left: spotlight panel */}
        <div className="nr-spotlight-panel">
          {spotlitNum !== null ? (
            <div className="nr-spotlight">
              <span className="nr-spotlight-digit">{spotlitNum}</span>
              <span className="nr-spotlight-word" dir="rtl">{toHebrewWord(spotlitNum)}</span>
              <span className="nr-spotlight-range">{range.label}</span>
            </div>
          ) : (
            <div className="nr-spotlight-empty">
              {stepMode
                ? "Use ← → to step through numbers"
                : "Click a number card to spotlight it"}
            </div>
          )}

          {/* Step-through controls */}
          <div className="nr-step-controls">
            <button
              className={`ctrl-btn ${stepMode ? "ctrl-btn--next" : "ctrl-btn--reset"}`}
              onClick={handleStepToggle}
            >
              {stepMode ? "✓ Count Together Mode" : "▶ Count Together Mode"}
            </button>

            {stepMode && (
              <div className="nr-step-nav">
                <button
                  className="nr-arrow-btn"
                  onClick={stepPrev}
                  disabled={stepIdx === 0}
                >
                  ←
                </button>
                <span className="nr-step-label">
                  {numbers[stepIdx]} / {numbers[numbers.length - 1]}
                </span>
                <button
                  className="nr-arrow-btn"
                  onClick={stepNext}
                  disabled={stepIdx === numbers.length - 1}
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: number grid */}
        <div className="nr-grid-area">
          <p className="section-label">
            {stepMode ? "סְפִירָה יַחַד / Count Together" : "לְחַץ עַל מִסְפָּר / Click a number"}
          </p>
          <div className="nr-grid">
            {numbers.map((n) => {
              const isSpotlit = spotlitNum === n;
              const isStep = stepMode && numbers[stepIdx] === n;
              return (
                <button
                  key={n}
                  className={`nr-card ${isSpotlit ? "nr-card--active" : ""} ${isStep ? "nr-card--step" : ""}`}
                  onClick={() => handleCardClick(n)}
                  disabled={stepMode}
                >
                  <span className="nr-card-digit">{n}</span>
                  <span className="nr-card-word" dir="rtl">{toHebrewWord(n)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </ActivityLayout>
  );
}
