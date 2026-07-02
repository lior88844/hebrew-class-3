import { useState } from "react";
import ActivityLayout from "../common/ActivityLayout";

interface DictationItem {
  productId: string;
  nameHe: string;
  nameEn: string;
  emoji: string;
  price: number;
  promptHe: string;   // what teacher "reads"
  promptEn: string;
}

// Each round has 5 items the student must identify from the grid
const DICTATION_SETS: DictationItem[][] = [
  [
    { productId: "oj",      nameHe: "מִיץ תַּפּוּזִים",       nameEn: "Orange Juice",    emoji: "🧃", price: 16, promptHe: "מִיץ תַּפּוּזִים",       promptEn: "orange juice" },
    { productId: "granola", nameHe: "גְּרָנוֹלָה",            nameEn: "Granola",         emoji: "🥣", price: 22, promptHe: "גְּרָנוֹלָה",            promptEn: "granola" },
    { productId: "bread",   nameHe: "לֶחֶם שִׁיפוֹן",         nameEn: "Rye Bread",       emoji: "🍞", price: 18, promptHe: "לֶחֶם שִׁיפוֹן",         promptEn: "rye bread" },
    { productId: "choc",    nameHe: "שׁוֹקוֹלָד מָר",         nameEn: "Dark Chocolate",  emoji: "🍫", price: 12, promptHe: "שׁוֹקוֹלָד מָר",         promptEn: "dark chocolate" },
    { productId: "yogurt",  nameHe: "יוֹגוּרְט יְווָנִי",     nameEn: "Greek Yogurt",    emoji: "🥣", price: 11, promptHe: "יוֹגוּרְט יְווָנִי",     promptEn: "Greek yogurt" },
  ],
  [
    { productId: "coffee",  nameHe: "קָפֶה",                  nameEn: "Coffee",          emoji: "☕", price: 35, promptHe: "קָפֶה",                  promptEn: "coffee" },
    { productId: "tomatoes",nameHe: "עַגְבָנִיּוֹת שֶׁרִי",  nameEn: "Cherry Tomatoes", emoji: "🍅", price: 14, promptHe: "עַגְבָנִיּוֹת שֶׁרִי",  promptEn: "cherry tomatoes" },
    { productId: "tahini",  nameHe: "טְחִינָה",               nameEn: "Tahini",          emoji: "🫙", price: 26, promptHe: "טְחִינָה",               promptEn: "tahini" },
    { productId: "avocado", nameHe: "אֲבוֹקָדוֹ",            nameEn: "Avocado",         emoji: "🥑", price: 14, promptHe: "אֲבוֹקָדוֹ",            promptEn: "avocado" },
    { productId: "butter",  nameHe: "חֶמְאָה",                nameEn: "Butter",          emoji: "🧈", price: 22, promptHe: "חֶמְאָה",                promptEn: "butter" },
  ],
  [
    { productId: "matcha",  nameHe: "מַתְּחָה",               nameEn: "Matcha",          emoji: "🍵", price: 42, promptHe: "מַתְּחָה",               promptEn: "matcha" },
    { productId: "eggs",    nameHe: "בֵּיצִים",               nameEn: "Eggs",            emoji: "🥚", price: 18, promptHe: "בֵּיצִים",               promptEn: "eggs" },
    { productId: "quinoa",  nameHe: "קִינוֹאָה",              nameEn: "Quinoa",          emoji: "🌾", price: 28, promptHe: "קִינוֹאָה",              promptEn: "quinoa" },
    { productId: "labneh",  nameHe: "לַבָּנֶה",               nameEn: "Labneh",          emoji: "🫙", price: 14, promptHe: "לַבָּנֶה",               promptEn: "labneh" },
    { productId: "chicken", nameHe: "חֲזֵה עוֹף",             nameEn: "Chicken Breast",  emoji: "🍗", price: 47, promptHe: "חֲזֵה עוֹף",             promptEn: "chicken breast" },
  ],
];

// Full pool of products shown in the grid (all sets combined, deduplicated)
const ALL_GRID_PRODUCTS = Array.from(
  new Map(
    DICTATION_SETS.flat().map((p) => [p.productId, p])
  ).values()
);

interface Props {
  onBack: () => void;
}

export default function ShoppingDictation({ onBack }: Props) {
  const [setIdx, setSetIdx] = useState(0);
  const [promptIdx, setPromptIdx] = useState(0);
  const [correct, setCorrect] = useState<Set<string>>(new Set());
  const [wrongId, setWrongId] = useState<string | null>(null);

  const currentSet = DICTATION_SETS[setIdx];
  const currentPrompt = currentSet[promptIdx];
  const allDone = correct.size === currentSet.length;

  const loadSet = (i: number) => {
    setSetIdx(i);
    setPromptIdx(0);
    setCorrect(new Set());
    setWrongId(null);
  };

  const handleClick = (productId: string) => {
    if (correct.has(productId)) return;
    if (productId === currentPrompt.productId) {
      const next = new Set([...correct, productId]);
      setCorrect(next);
      // advance to next un-answered prompt
      if (next.size < currentSet.length) {
        const nextIdx = currentSet.findIndex((_, i) => i > promptIdx && !next.has(currentSet[i].productId));
        setPromptIdx(nextIdx >= 0 ? nextIdx : promptIdx);
      }
    } else {
      setWrongId(productId);
      setTimeout(() => setWrongId(null), 900);
    }
  };

  const reset = () => loadSet(setIdx);

  return (
    <ActivityLayout
      title="Shopping Dictation"
      titleHe="כְּתִיבָה לְפִי הַכְתָּבָה"
      emoji="🎧"
      onBack={onBack}
    >
      {/* Set tabs */}
      <div className="nr-tabs" style={{ marginBottom: "1rem" }}>
        {DICTATION_SETS.map((_, i) => (
          <button
            key={i}
            className={`nr-tab ${setIdx === i ? "nr-tab--active" : ""}`}
            onClick={() => loadSet(i)}
          >
            Round {i + 1}
          </button>
        ))}
      </div>

      <div className="activity-grid">
        <div className="activity-left">
          {/* Current prompt */}
          <div className="teacher-prompt">
            <div className="teacher-prompt-label">
              <span className="teacher-icon">🎧</span>
              <span>Read aloud</span>
              <span className="prompt-counter">{correct.size} / {currentSet.length}</span>
            </div>
            {!allDone ? (
              <>
                <p className="teacher-prompt-text" dir="rtl" style={{ fontSize: "1.6rem", fontFamily: "var(--font-he)", color: "var(--he-accent)" }}>
                  {currentPrompt.promptHe}
                </p>
                <p className="teacher-prompt-text" style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
                  "{currentPrompt.promptEn}"
                </p>
              </>
            ) : (
              <p className="teacher-prompt-text" style={{ color: "var(--success)" }}>
                🎉 כָּל הַפְּרִיטִים! All done!
              </p>
            )}
            <div className="teacher-controls">
              <button className="ctrl-btn ctrl-btn--reset" onClick={reset}>↺ אַתְחֵל</button>
            </div>
          </div>

          {/* Shopping list progress */}
          <div className="card">
            <h2 className="card-title">📋 רְשִׁימַת קְנִיּוֹת / Shopping List</h2>
            <ul className="shopping-list">
              {currentSet.map((item) => {
                const done = correct.has(item.productId);
                const isCurrent = !allDone && item.productId === currentPrompt.productId;
                return (
                  <li
                    key={item.productId}
                    className={`shopping-list-item ${done ? "shopping-list-item--done" : ""} ${isCurrent ? "shopping-list-item--current" : ""}`}
                  >
                    <span>{item.emoji} {item.nameHe} / {item.nameEn}</span>
                    {done && <span className="check-badge">✓</span>}
                  </li>
                );
              })}
            </ul>
          </div>

          {allDone && (
            <div className="success-banner">🎉 יָפֶה מְאוֹד! Well done!</div>
          )}
        </div>

        <div className="activity-right">
          <h2 className="section-label">לְחַץ עַל הַמּוּצָר / Click the product you hear</h2>
          <div className="product-grid">
            {ALL_GRID_PRODUCTS.map((item) => {
              const isDone = correct.has(item.productId);
              const isWrong = wrongId === item.productId;
              return (
                <button
                  key={item.productId}
                  className={`product-card ${isDone ? "product-card--selected" : ""} ${isWrong ? "product-card--wrong-flash" : ""}`}
                  onClick={() => handleClick(item.productId)}
                  disabled={isDone || allDone}
                >
                  <span className="product-emoji">{item.emoji}</span>
                  <span className="product-name-he" dir="rtl">{item.nameHe}</span>
                  <span className="product-name-en">{item.nameEn}</span>
                  <span className="product-price">₪{item.price}</span>
                  {isDone && <span className="product-done-mark">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </ActivityLayout>
  );
}
