import { useState } from "react";

interface Props {
  answer: string;
  answerHe: string;
  onReveal?: () => void;
}

export default function RevealAnswer({ answer, answerHe, onReveal }: Props) {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    setRevealed(true);
    onReveal?.();
  };

  return (
    <div className={`reveal-answer ${revealed ? "reveal-answer--shown" : ""}`}>
      {!revealed ? (
        <button className="reveal-btn" onClick={handleReveal}>
          👁 Reveal Answer
        </button>
      ) : (
        <div className="reveal-content">
          <span className="reveal-label">✓ Answer</span>
          <p className="reveal-text-en">{answer}</p>
          <p className="reveal-text-he" dir="rtl">{answerHe}</p>
          <button
            className="ctrl-btn ctrl-btn--reset"
            style={{ marginTop: "0.5rem" }}
            onClick={() => setRevealed(false)}
          >
            Hide
          </button>
        </div>
      )}
    </div>
  );
}
