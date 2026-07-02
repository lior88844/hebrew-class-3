import { useState } from "react";
import ActivityLayout from "../common/ActivityLayout";
import { toHebrewWord } from "../../utils/hebrewNumbers";

// Each challenge: show a price, student assembles the Hebrew number word from scrambled tokens
interface Challenge {
  price: number;
  tokens: string[]; // correct order of tokens
}

// Split compound Hebrew numbers into meaningful tokens
function buildChallenges(): Challenge[] {
  return [
    { price: 9,   tokens: ["תִּשְׁעָה",     "שְׁקָלִים"] },
    { price: 12,  tokens: ["שְׁנֵים",       "עָשָׂר",         "שְׁקָלִים"] },
    { price: 18,  tokens: ["שְׁמוֹנָה",     "עָשָׂר",         "שְׁקָלִים"] },
    { price: 24,  tokens: ["עֶשְׂרִים",     "וְאַרְבָּעָה",   "שְׁקָלִים"] },
    { price: 35,  tokens: ["שְׁלוֹשִׁים",   "וְחָמִשָּׁה",    "שְׁקָלִים"] },
    { price: 42,  tokens: ["אַרְבָּעִים",   "וּשְׁתַּיִם",    "שְׁקָלִים"] },
    { price: 47,  tokens: ["אַרְבָּעִים",   "וְשִׁבְעָה",     "שְׁקָלִים"] },
    { price: 55,  tokens: ["חֲמִשִּׁים",    "וְחָמִשָּׁה",    "שְׁקָלִים"] },
    { price: 63,  tokens: ["שִׁשִּׁים",     "וּשְׁלוֹשָׁה",   "שְׁקָלִים"] },
    { price: 78,  tokens: ["שִׁבְעִים",     "וּשְׁמוֹנָה",    "שְׁקָלִים"] },
    { price: 90,  tokens: ["תִּשְׁעִים",    "שְׁקָלִים"] },
    { price: 100, tokens: ["מֵאָה",         "שְׁקָלִים"] },
    { price: 112, tokens: ["מֵאָה",         "וּשְׁנֵים",      "עָשָׂר",    "שְׁקָלִים"] },
  ];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  if (a.every((v, i) => v === arr[i]) && a.length > 1) [a[0], a[1]] = [a[1], a[0]];
  return a;
}

interface Props {
  onBack: () => void;
}

export default function SentenceBuilder({ onBack }: Props) {
  const CHALLENGES = buildChallenges();
  const [idx, setIdx] = useState(0);
  const [scrambled, setScrambled] = useState<string[]>(() => shuffle(CHALLENGES[0].tokens));
  const [built, setBuilt] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);

  const challenge = CHALLENGES[idx];
  const correct = challenge.tokens;
  const isComplete = built.length === correct.length;
  const isCorrect = isComplete && built.every((t, i) => t === correct[i]);

  const loadChallenge = (i: number) => {
    setIdx(i);
    setScrambled(shuffle(CHALLENGES[i].tokens));
    setBuilt([]);
    setRevealed(false);
  };

  const clickFromBank = (token: string, pos: number) => {
    if (revealed) return;
    setBuilt((b) => [...b, token]);
    setScrambled((s) => [...s.slice(0, pos), ...s.slice(pos + 1)]);
  };

  const clickFromBuilt = (pos: number) => {
    if (revealed) return;
    const token = built[pos];
    setBuilt((b) => [...b.slice(0, pos), ...b.slice(pos + 1)]);
    setScrambled((s) => [...s, token]);
  };

  const handleReveal = () => {
    setBuilt([...correct]);
    setScrambled([]);
    setRevealed(true);
  };

  return (
    <ActivityLayout
      title="Number Word Builder"
      titleHe="בּוֹנֵה מִסְפָּרִים"
      emoji="🧩"
      onBack={onBack}
    >
      {/* Challenge selector */}
      <div className="nr-tabs" style={{ marginBottom: "1.25rem" }}>
        {CHALLENGES.map((c, i) => (
          <button
            key={i}
            className={`nr-tab ${idx === i ? "nr-tab--active" : ""}`}
            onClick={() => loadChallenge(i)}
          >
            ₪{c.price}
          </button>
        ))}
      </div>

      <div className="sb-body">
        {/* Price display */}
        <div className="teacher-prompt">
          <div className="teacher-prompt-label">
            <span className="teacher-icon">🧩</span>
            <span>Assemble the Hebrew price</span>
            <span className="prompt-counter">{idx + 1} / {CHALLENGES.length}</span>
          </div>

          {/* Big price digit */}
          <div style={{ textAlign: "center", margin: "0.75rem 0" }}>
            <span style={{ fontSize: "4rem", fontWeight: 900, color: "var(--he-accent)", lineHeight: 1 }}>
              ₪{challenge.price}
            </span>
          </div>

          <p className="teacher-prompt-text" style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
            {toHebrewWord(challenge.price)} שְׁקָלִים — arrange the tokens in the correct order →
          </p>

          <div className="teacher-controls">
            <button className="ctrl-btn ctrl-btn--next" onClick={() => loadChallenge((idx + 1) % CHALLENGES.length)}>
              Next →
            </button>
            <button className="ctrl-btn ctrl-btn--reset" onClick={() => loadChallenge(idx)}>
              ↺ Reset
            </button>
            {!revealed && (
              <button className="reveal-btn" style={{ padding: "0.45rem 1rem", fontSize: "0.85rem" }} onClick={handleReveal}>
                👁 Reveal
              </button>
            )}
          </div>
        </div>

        {/* Build area */}
        <div className="sb-build-area">
          <p className="section-label">בְּנֵה כָּאן / Build here — click tokens in order (right to left)</p>
          <div className={`sb-sentence ${isComplete ? (isCorrect ? "sb-sentence--correct" : "sb-sentence--wrong") : ""} ${revealed ? "sb-sentence--revealed" : ""}`}>
            {built.length === 0 ? (
              <span className="sb-placeholder">לְחַץ עַל מִלִּים מִלְּמַטָּה / Click tokens below</span>
            ) : (
              built.map((token, i) => (
                <button
                  key={i}
                  className={`sb-token sb-token--placed ${revealed ? "sb-token--revealed" : ""}`}
                  onClick={() => clickFromBuilt(i)}
                  dir="rtl"
                >
                  {token}
                </button>
              ))
            )}
          </div>

          {isComplete && !revealed && (
            <div className={`sb-result ${isCorrect ? "success-banner" : "warning-banner"}`}>
              {isCorrect
                ? `🎉 נָכוֹן! ${toHebrewWord(challenge.price)} שְׁקָלִים`
                : "✗ לֹא נָכוֹן — נַסֶּה שׁוּב / Try again"}
            </div>
          )}
        </div>

        {/* Token bank */}
        <div className="sb-scrambled-area">
          <p className="section-label">טוֹקֶנִים / Tokens — לְחַץ לְהוֹסִיף</p>
          <div className="sb-scrambled">
            {scrambled.map((token, i) => (
              <button
                key={i}
                className="sb-token sb-token--available"
                onClick={() => clickFromBank(token, i)}
                dir="rtl"
              >
                {token}
              </button>
            ))}
            {scrambled.length === 0 && !revealed && (
              <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>All tokens placed</span>
            )}
          </div>
        </div>
      </div>
    </ActivityLayout>
  );
}
