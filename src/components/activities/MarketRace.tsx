import { useState, useCallback } from "react";
import ActivityLayout from "../common/ActivityLayout";
import type { Product } from "../../types";

// Prices chosen to satisfy all challenge answers below
const MARKET_PRODUCTS: Product[] = [
  { id: "p1",  nameHe: "תּוּת שָׂדֶה",          nameEn: "Strawberries",    price: 9,  emoji: "🍓" },
  { id: "p2",  nameHe: "אֲבוֹקָדוֹ",            nameEn: "Avocado",         price: 7,  emoji: "🥑" },
  { id: "p3",  nameHe: "לֶחֶם שִׁיפוֹן",         nameEn: "Rye Bread",       price: 18, emoji: "🍞" },
  { id: "p4",  nameHe: "יוֹגוּרְט יְווָנִי",     nameEn: "Greek Yogurt",    price: 11, emoji: "🥣" },
  { id: "p5",  nameHe: "גְּבִינָה בּוּלְגָרִית",  nameEn: "Bulgarian Cheese",price: 26, emoji: "🧀" },
  { id: "p6",  nameHe: "מַאֲפִין שׁוֹקוֹלָד",    nameEn: "Choc Muffin",     price: 12, emoji: "🧁" },
  { id: "p7",  nameHe: "עוּגַת גְּבִינָה",        nameEn: "Cheesecake",      price: 35, emoji: "🍰" },
  { id: "p8",  nameHe: "שׁוֹקוֹלָד מָר",          nameEn: "Dark Chocolate",  price: 14, emoji: "🍫" },
  { id: "p9",  nameHe: "חֲזֵה עוֹף",              nameEn: "Chicken Breast",  price: 47, emoji: "🍗" },
  { id: "p10", nameHe: "קִינוֹאָה",               nameEn: "Quinoa",          price: 28, emoji: "🌾" },
  { id: "p11", nameHe: "מִיץ תַּפּוּזִים",         nameEn: "Orange Juice",    price: 16, emoji: "🧃" },
  { id: "p12", nameHe: "קָפֶה",                  nameEn: "Coffee",          price: 37, emoji: "☕" },
];

type ChallengeType = "exact" | "cheaper" | "expensive";

interface Challenge {
  type: ChallengeType;
  value?: number;
  label: string;
  labelHe: string;
}

function buildChallenges(): Challenge[] {
  return [
    { type: "exact",     value: 37, label: "Find something that costs ₪37",        labelHe: "מְצָא מַשֶּׁהוּ שֶׁעוֹלֶה שְׁלוֹשִׁים וְשִׁבְעָה שְׁקָלִים" },
    { type: "cheaper",   value: 20, label: "Find something cheaper than ₪20",       labelHe: "מְצָא מַשֶּׁהוּ שֶׁעוֹלֶה פָּחוֹת מֵעֶשְׂרִים שְׁקָלִים" },
    { type: "expensive",            label: "Find the most expensive item",           labelHe: "מְצָא אֶת הַפְּרִיט הֲכִי יָקָר" },
    { type: "exact",     value: 12, label: "Find something that costs ₪12",         labelHe: "מְצָא מַשֶּׁהוּ שֶׁעוֹלֶה שְׁנֵים עָשָׂר שְׁקָלִים" },
    { type: "cheaper",   value: 10, label: "Find something cheaper than ₪10",       labelHe: "מְצָא מַשֶּׁהוּ שֶׁעוֹלֶה פָּחוֹת מֵעֲשָׂרָה שְׁקָלִים" },
    { type: "exact",     value: 18, label: "Find something that costs ₪18",         labelHe: "מְצָא מַשֶּׁהוּ שֶׁעוֹלֶה שְׁמוֹנָה עָשָׂר שְׁקָלִים" },
  ];
}

function isCorrect(product: Product, challenge: Challenge): boolean {
  if (challenge.type === "exact") return product.price === challenge.value;
  if (challenge.type === "cheaper") return product.price < (challenge.value ?? 0);
  if (challenge.type === "expensive") {
    const max = Math.max(...MARKET_PRODUCTS.map((p) => p.price));
    return product.price === max;
  }
  return false;
}

interface Props {
  onBack: () => void;
}

export default function MarketRace({ onBack }: Props) {
  const CHALLENGES = buildChallenges();
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [feedback, setFeedback] = useState<{ id: string; correct: boolean } | null>(null);

  const current = CHALLENGES[challengeIndex];

  const handleClick = useCallback((product: Product) => {
    const correct = isCorrect(product, current);
    setFeedback({ id: product.id, correct });
    setTimeout(() => setFeedback(null), 1800);
  }, [current]);

  const handleNext = () => {
    setChallengeIndex((i) => (i + 1) % CHALLENGES.length);
    setFeedback(null);
  };

  const handleReset = () => {
    setChallengeIndex(0);
    setFeedback(null);
  };

  return (
    <ActivityLayout
      title="Market Race"
      titleHe="מֵרוֹץ הַשּׁוּק"
      emoji="🏁"
      onBack={onBack}
    >
      <div className="market-race-layout">
        <div className="market-challenge-bar">
          <div className="market-challenge-content">
            <span className="teacher-icon">🏁</span>
            <div>
              <p className="market-challenge-text">{current.label}</p>
              <p className="market-challenge-he" dir="rtl">{current.labelHe}</p>
            </div>
            <span className="prompt-counter">{challengeIndex + 1} / {CHALLENGES.length}</span>
          </div>
          <div className="teacher-controls">
            <button className="ctrl-btn ctrl-btn--next" onClick={handleNext}>
              Next Challenge →
            </button>
            <button className="ctrl-btn ctrl-btn--reset" onClick={handleReset}>
              ↺ אַתְחֵל
            </button>
          </div>
        </div>

        <div className="market-grid">
          {MARKET_PRODUCTS.map((product) => {
            const fb = feedback?.id === product.id ? feedback : null;
            return (
              <button
                key={product.id}
                className={`market-card ${fb ? (fb.correct ? "market-card--correct" : "market-card--wrong") : ""}`}
                onClick={() => handleClick(product)}
              >
                <span className="market-emoji">{product.emoji}</span>
                <span className="market-name-he" dir="rtl">{product.nameHe}</span>
                <span className="market-name-en">{product.nameEn}</span>
                <span className="market-price">₪{product.price}</span>
                {fb && (
                  <span className="market-feedback">{fb.correct ? "✓ נָכוֹן!" : "✗ לֹא נָכוֹן"}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </ActivityLayout>
  );
}
