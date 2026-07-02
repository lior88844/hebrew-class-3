import { useState } from "react";
import ActivityLayout from "../common/ActivityLayout";

interface Sentence {
  en: string;
  tokens: string[]; // correct order
  hint?: string;
}

// Each sentence: "The [product] costs [price] shekels"
// Tokens are split at word boundaries so student assembles the sentence word by word
const SENTENCES: Sentence[] = [
  {
    en: "The espresso costs fourteen shekels.",
    tokens: ["הָאֶסְפְּרֶסּוֹ", "עוֹלֶה", "אַרְבָּעָה", "עָשָׂר", "שְׁקָלִים"],
    hint: "Espresso ₪14",
  },
  {
    en: "The latte costs twenty-two shekels.",
    tokens: ["הַלַּטֶּה", "עוֹלֶה", "עֶשְׂרִים", "וּשְׁתַּיִם", "שְׁקָלִים"],
    hint: "Latte ₪22",
  },
  {
    en: "The avocado toast costs fifty-two shekels.",
    tokens: ["הָאֲבוֹקָדוֹ", "טוֹסְט", "עוֹלֶה", "חֲמִשִּׁים", "וּשְׁתַּיִם", "שְׁקָלִים"],
    hint: "Avocado Toast ₪52",
  },
  {
    en: "The croissant costs eighteen shekels.",
    tokens: ["הַקְּרוּאָסוֹן", "עוֹלֶה", "שְׁמוֹנָה", "עָשָׂר", "שְׁקָלִים"],
    hint: "Croissant ₪18",
  },
  {
    en: "The chocolate muffin costs twenty-four shekels.",
    tokens: ["הַמַּאֲפִין", "עוֹלֶה", "עֶשְׂרִים", "וְאַרְבָּעָה", "שְׁקָלִים"],
    hint: "Muffin ₪24",
  },
  {
    en: "The cheesecake costs thirty-eight shekels.",
    tokens: ["עוּגַת", "הַגְּבִינָה", "עוֹלָה", "שְׁלוֹשִׁים", "וּשְׁמוֹנָה", "שְׁקָלִים"],
    hint: "Cheesecake ₪38",
  },
  {
    en: "The matcha latte costs twenty-eight shekels.",
    tokens: ["מַתְּחָה", "לַטֶּה", "עוֹלָה", "עֶשְׂרִים", "וּשְׁמוֹנָה", "שְׁקָלִים"],
    hint: "Matcha Latte ₪28",
  },
  {
    en: "The granola bowl costs forty-two shekels.",
    tokens: ["הַגְּרָנוֹלָה", "עוֹלָה", "אַרְבָּעִים", "וּשְׁתַּיִם", "שְׁקָלִים"],
    hint: "Granola Bowl ₪42",
  },
];

function shuffleTokens(tokens: string[]): string[] {
  const arr = [...tokens];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  // Ensure it's actually shuffled (not same as correct)
  if (arr.every((t, i) => t === tokens[i]) && arr.length > 1) {
    [arr[0], arr[1]] = [arr[1], arr[0]];
  }
  return arr;
}

interface Props {
  onBack: () => void;
}

export default function SentenceBuilder({ onBack }: Props) {
  const [sentenceIdx, setSentenceIdx] = useState(0);
  const [scrambled, setScrambled] = useState<string[]>(() => shuffleTokens(SENTENCES[0].tokens));
  const [built, setBuilt] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);

  const sentence = SENTENCES[sentenceIdx];
  const correct = sentence.tokens;

  const isComplete = built.length === correct.length;
  const isCorrect = isComplete && built.every((t, i) => t === correct[i]);

  const clickToken = (token: string, fromScrambled: boolean) => {
    if (revealed) return;
    if (fromScrambled) {
      setBuilt((b) => [...b, token]);
      setScrambled((s) => {
        const idx = s.indexOf(token);
        return [...s.slice(0, idx), ...s.slice(idx + 1)];
      });
    } else {
      // return token to scrambled
      const idx = built.indexOf(token);
      const returnToken = built[idx];
      setBuilt((b) => [...b.slice(0, idx), ...b.slice(idx + 1)]);
      setScrambled((s) => [...s, returnToken]);
    }
  };

  const loadSentence = (idx: number) => {
    setSentenceIdx(idx);
    setScrambled(shuffleTokens(SENTENCES[idx].tokens));
    setBuilt([]);
    setRevealed(false);
  };

  const handleNext = () => loadSentence((sentenceIdx + 1) % SENTENCES.length);
  const handleReset = () => loadSentence(sentenceIdx);
  const handleReveal = () => {
    setBuilt([...correct]);
    setScrambled([]);
    setRevealed(true);
  };

  return (
    <ActivityLayout
      title="Sentence Builder"
      titleHe="בּוֹנֵה מִשְׁפָּטִים"
      emoji="🧩"
      onBack={onBack}
    >
      <div className="sb-layout">
        {/* Sentence selector */}
        <div className="sb-selector">
          {SENTENCES.map((s, i) => (
            <button
              key={i}
              className={`nr-tab ${sentenceIdx === i ? "nr-tab--active" : ""}`}
              onClick={() => loadSentence(i)}
            >
              #{i + 1} {s.hint}
            </button>
          ))}
        </div>

        <div className="sb-body">
          {/* Prompt */}
          <div className="teacher-prompt">
            <div className="teacher-prompt-label">
              <span className="teacher-icon">🧩</span>
              <span>Build the sentence</span>
              <span className="prompt-counter">{sentenceIdx + 1} / {SENTENCES.length}</span>
            </div>
            <p className="teacher-prompt-text">{sentence.en}</p>
            <div className="teacher-controls">
              <button className="ctrl-btn ctrl-btn--next" onClick={handleNext}>Next →</button>
              <button className="ctrl-btn ctrl-btn--reset" onClick={handleReset}>↺ Reset</button>
              {!revealed && (
                <button className="reveal-btn" style={{ padding: "0.45rem 1rem", fontSize: "0.85rem" }} onClick={handleReveal}>
                  👁 Reveal
                </button>
              )}
            </div>
          </div>

          {/* Build area */}
          <div className="sb-build-area">
            <p className="section-label">בְּנֵה כָּאן / Build here — click tokens in order</p>
            <div className={`sb-sentence ${isComplete ? (isCorrect ? "sb-sentence--correct" : "sb-sentence--wrong") : ""} ${revealed ? "sb-sentence--revealed" : ""}`}>
              {built.length === 0 ? (
                <span className="sb-placeholder">לְחַץ עַל מִלִּים מִלְּמַטָּה / Click words below</span>
              ) : (
                built.map((token, i) => (
                  <button
                    key={i}
                    className={`sb-token sb-token--placed ${revealed ? "sb-token--revealed" : ""}`}
                    onClick={() => !revealed && clickToken(token, false)}
                    dir="rtl"
                  >
                    {token}
                  </button>
                ))
              )}
            </div>

            {isComplete && !revealed && (
              <div className={`sb-result ${isCorrect ? "success-banner" : "warning-banner"}`}>
                {isCorrect ? "🎉 נָכוֹן! Correct!" : "✗ לֹא נָכוֹן — נַסֶּה שׁוּב / Try again"}
              </div>
            )}
          </div>

          {/* Scrambled tokens */}
          <div className="sb-scrambled-area">
            <p className="section-label">מִלִּים / Word bank — לְחַץ לְהוֹסִיף</p>
            <div className="sb-scrambled">
              {scrambled.map((token, i) => (
                <button
                  key={i}
                  className="sb-token sb-token--available"
                  onClick={() => clickToken(token, true)}
                  dir="rtl"
                >
                  {token}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ActivityLayout>
  );
}
