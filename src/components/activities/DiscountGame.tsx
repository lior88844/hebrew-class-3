import { useState } from "react";
import ActivityLayout from "../common/ActivityLayout";
import TeacherPrompt from "../common/TeacherPrompt";
import RevealAnswer from "../common/RevealAnswer";
import { toHebrewPrice } from "../../utils/hebrewNumbers";

const SALE_CARDS = [
  { id: "a", emoji: "👗", nameHe: "שִׂמְלָה",        nameEn: "Dress",     original: 80,  sale: 56 },
  { id: "b", emoji: "👟", nameHe: "נַעֲלֵי אִימּוּן", nameEn: "Training Shoes", original: 120, sale: 90 },
  { id: "c", emoji: "💄", nameHe: "שְׂפָתוֹן",       nameEn: "Lipstick",  original: 45,  sale: 30 },
];

const buildPrompts = () => [
  {
    en: "Which price is lower — ₪80 or ₪56?",
    he: "אֵיזֶה מְחִיר יוֹתֵר נָמוּךְ — שְׁמוֹנִים אוֹ חֲמִשִּׁים וְשִׁשָּׁה?",
    answer: "₪56 is lower",
    answerHe: "חֲמִשִּׁים וְשִׁשָּׁה שְׁקָלִים יוֹתֵר נָמוּךְ",
  },
  {
    en: "Read the original price of the sneakers.",
    he: "קְרָא אֶת הַמְּחִיר הַמְּקוֹרִי שֶׁל נַעֲלֵי הַסְּפּוֹרְט.",
    answer: "₪120 — one hundred and twenty shekels",
    answerHe: toHebrewPrice(120),
  },
  {
    en: "Read the sale price of the lipstick.",
    he: "קְרָא אֶת מְחִיר הַמִּבְצָע שֶׁל הַשְּׂפָתוֹן.",
    answer: "₪30 — thirty shekels",
    answerHe: toHebrewPrice(30),
  },
  {
    en: "How much do you save on the dress? (₪80 → ₪56)",
    he: "כַּמָּה חוֹסְכִים עַל הַשִּׂמְלָה?",
    answer: "₪24 — twenty-four shekels",
    answerHe: toHebrewPrice(24),
  },
  {
    en: "Which item has the biggest discount?",
    he: "אֵיזֶה פְּרִיט הֲכִי מוּזָל?",
    answer: "Training Shoes — ₪30 off",
    answerHe: "נַעֲלֵי אִימּוּן — הֲנָחָה שֶׁל שְׁלוֹשִׁים שְׁקָלִים",
  },
];

interface Props {
  onBack: () => void;
}

export default function DiscountGame({ onBack }: Props) {
  const [promptIndex, setPromptIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const PROMPTS = buildPrompts();
  const current = PROMPTS[promptIndex];
  const selected = SALE_CARDS.find((c) => c.id === selectedId);

  const handleNext = () => {
    setPromptIndex((i) => (i + 1) % PROMPTS.length);
    setSelectedId(null);
  };

  const handleReset = () => {
    setPromptIndex(0);
    setSelectedId(null);
  };

  return (
    <ActivityLayout
      title="Discount Game"
      titleHe="מִשְׂחַק הַהֲנָחוֹת"
      emoji="🏷"
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

          {selected && (
            <div className="selection-info card">
              <p className="selection-label">Student selected:</p>
              <p className="selection-product">{selected.emoji} {selected.nameHe} / {selected.nameEn}</p>
              <p className="selection-price" style={{ textDecoration: "line-through", color: "var(--muted)" }}>
                Was: ₪{selected.original}
              </p>
              <p className="selection-price" style={{ color: "var(--success)" }}>
                Now: ₪{selected.sale}
              </p>
            </div>
          )}

          <RevealAnswer
            key={promptIndex}
            answer={current.answer}
            answerHe={current.answerHe}
          />
        </div>

        <div className="activity-right">
          <h2 className="section-label">פְּרִיטֵי מִבְצָע / Sale items</h2>
          <div className="sale-grid">
            {SALE_CARDS.map((item) => (
              <button
                key={item.id}
                className={`sale-card ${selectedId === item.id ? "sale-card--selected" : ""}`}
                onClick={() => setSelectedId(item.id)}
              >
                <span className="sale-emoji">{item.emoji}</span>
                <p className="sale-name-he" dir="rtl">{item.nameHe}</p>
                <p className="sale-name-en">{item.nameEn}</p>
                <div className="sale-prices">
                  <span className="sale-original">₪{item.original}</span>
                  <span className="sale-arrow">→</span>
                  <span className="sale-now">₪{item.sale}</span>
                </div>
                <div className="sale-badge">
                  חֶסְכּוֹן ₪{item.original - item.sale}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </ActivityLayout>
  );
}
