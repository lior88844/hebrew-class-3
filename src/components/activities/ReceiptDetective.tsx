import { useState } from "react";
import ActivityLayout from "../common/ActivityLayout";
import TeacherPrompt from "../common/TeacherPrompt";
import RevealAnswer from "../common/RevealAnswer";
import { toHebrewPrice, toHebrewChange } from "../../utils/hebrewNumbers";

const DETECTIVE_ITEMS = [
  { id: "rye_bread",       emoji: "🍞", nameHe: "לֶחֶם שִׁיפוֹן",          nameEn: "Rye Bread",       price: 18 },
  { id: "greek_yogurt",    emoji: "🥣", nameHe: "יוֹגוּרְט יְווָנִי",       nameEn: "Greek Yogurt",    price: 11 },
  { id: "eggs",            emoji: "🥚", nameHe: "בֵּיצִים",                 nameEn: "Eggs",            price: 18 },
  { id: "bulgarian_cheese",emoji: "🧀", nameHe: "גְּבִינָה בּוּלְגָרִית",   nameEn: "Bulgarian Cheese",price: 26 },
  { id: "tuna",            emoji: "🐟", nameHe: "טוּנָה",                  nameEn: "Tuna",            price: 19 },
  { id: "cherry_tomatoes", emoji: "🍅", nameHe: "עַגְבָנִיּוֹת שֶׁרִי",    nameEn: "Cherry Tomatoes", price: 14 },
  { id: "dark_choc",       emoji: "🍫", nameHe: "שׁוֹקוֹלָד מָר",           nameEn: "Dark Chocolate",  price: 12 },
  { id: "coffee",          emoji: "☕", nameHe: "קָפֶה",                   nameEn: "Coffee",          price: 29 },
  { id: "orange_juice",    emoji: "🧃", nameHe: "מִיץ תַּפּוּזִים",         nameEn: "Orange Juice",    price: 16 },
  { id: "butter",          emoji: "🧈", nameHe: "חֶמְאָה",                  nameEn: "Butter",          price: 22 },
];

const PAID = 200;
const total = DETECTIVE_ITEMS.reduce((s, p) => s + p.price, 0);
const change = PAID - total;

const coffeeItem = DETECTIVE_ITEMS.find((i) => i.id === "coffee")!;

const PROMPTS = [
  {
    en: "How many items are on the receipt?",
    he: "כַּמָּה פְּרִיטִים יֵשׁ בַּחֶשְׁבּוֹנִית?",
    answer: `${DETECTIVE_ITEMS.length} items`,
    answerHe: `${DETECTIVE_ITEMS.length} פְּרִיטִים`,
  },
  {
    en: "Which item costs ₪29?",
    he: "אֵיזֶה פְּרִיט עוֹלֶה עֶשְׂרִים וְתִשְׁעָה שְׁקָלִים?",
    answer: `${coffeeItem.nameEn} — ₪${coffeeItem.price}`,
    answerHe: `${coffeeItem.nameHe} — ${toHebrewPrice(coffeeItem.price)}`,
  },
  {
    en: "What is the total?",
    he: "כַּמָּה סַךְ הַכֹּל?",
    answer: `₪${total}`,
    answerHe: toHebrewPrice(total),
  },
  {
    en: `You paid ₪${PAID}. How much change?`,
    he: `שִׁלַּמְתָּ ${PAID} שְׁקָלִים. כַּמָּה עוֹדֵף?`,
    answer: `₪${change}`,
    answerHe: toHebrewChange(change),
  },
];

interface Props {
  onBack: () => void;
}

export default function ReceiptDetective({ onBack }: Props) {
  const [promptIndex, setPromptIndex] = useState(0);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  const current = PROMPTS[promptIndex];

  const handleNext = () => {
    setPromptIndex((i) => (i + 1) % PROMPTS.length);
    setHighlightedId(null);
  };

  const handleReset = () => {
    setPromptIndex(0);
    setHighlightedId(null);
  };

  return (
    <ActivityLayout
      title="Receipt Detective"
      titleHe="בַּלָּשׁ הַחֶשְׁבּוֹנִיּוֹת"
      emoji="🔍"
      onBack={onBack}
    >
      <div className="activity-grid">
        <div className="activity-left">
          <TeacherPrompt
            prompts={PROMPTS.map((p) => ({ en: p.en, he: p.he }))}
            currentIndex={promptIndex}
            onNext={handleNext}
            onReset={handleReset}
          />
          <RevealAnswer
            key={promptIndex}
            answer={current.answer}
            answerHe={current.answerHe}
          />
        </div>

        <div className="activity-right">
          <h2 className="section-label">חֶשְׁבּוֹנִית / Receipt — לְחַץ לְהַדְגָּשָׁה</h2>
          <div className="receipt">
            <div className="receipt-header">
              <p className="receipt-store" dir="rtl">🏪 סוּפֶּרְמַרְקֶט עִבְרִית | Hebrew Market</p>
              <div className="receipt-divider" />
            </div>
            <div className="receipt-items">
              {DETECTIVE_ITEMS.map((item) => (
                <button
                  key={item.id}
                  className={`receipt-row receipt-row--clickable ${highlightedId === item.id ? "receipt-row--highlight" : ""}`}
                  onClick={() => setHighlightedId(highlightedId === item.id ? null : item.id)}
                >
                  <span className="receipt-item-name">
                    {item.emoji} {item.nameHe} / {item.nameEn}
                  </span>
                  <span className="receipt-item-price">₪{item.price}</span>
                </button>
              ))}
            </div>
            <div className="receipt-divider" />
            <div className="receipt-total-row">
              <span className="receipt-total-label">סַךְ הַכֹּל / Total</span>
              <span className="receipt-total-price">₪{total}</span>
            </div>
            <div className="receipt-row">
              <span>שׁוּלַּם / Paid</span>
              <span>₪{PAID}</span>
            </div>
            <div className="receipt-row receipt-row--change">
              <span>עוֹדֵף / Change</span>
              <span>₪{change}</span>
            </div>
          </div>
        </div>
      </div>
    </ActivityLayout>
  );
}
