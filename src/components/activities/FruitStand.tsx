import { useState } from "react";
import ActivityLayout from "../common/ActivityLayout";
import ProductCard from "../common/ProductCard";
import TeacherPrompt from "../common/TeacherPrompt";
import RevealAnswer from "../common/RevealAnswer";
import { FRUIT_STAND_PRODUCTS } from "../../utils/products";
import { toHebrewPrice } from "../../utils/hebrewNumbers";

const PROMPTS = [
  {
    en: "How much is the mango? (מַנְגּוֹ)",
    he: "כַּמָּה עוֹלֶה הַמַּנְגּוֹ?",
    answerId: "mango",
  },
  {
    en: "Which item costs five shekels? (חֲמִשָּׁה שְׁקָלִים)",
    he: "אֵיזֶה מוּצָר עוֹלֶה חֲמִשָּׁה שְׁקָלִים?",
    answerId: "nectarine",
  },
  {
    en: "How much are the strawberries? (תּוּת שָׂדֶה)",
    he: "כַּמָּה עוֹלֶה תּוּת הַשָּׂדֶה?",
    answerId: "strawberry",
  },
  {
    en: "Which is more expensive — avocado or nectarine?",
    he: "מָה יוֹתֵר יָקָר — אֲבוֹקָדוֹ אוֹ נֶקְטָרִינָה?",
    answerId: "avocado",
  },
  {
    en: "How much is the avocado? (אֲבוֹקָדוֹ)",
    he: "כַּמָּה עוֹלֶה הָאֲבוֹקָדוֹ?",
    answerId: "avocado",
  },
];

interface Props {
  onBack: () => void;
}

export default function FruitStand({ onBack }: Props) {
  const [promptIndex, setPromptIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const current = PROMPTS[promptIndex];
  const selected = FRUIT_STAND_PRODUCTS.find((p) => p.id === selectedId);

  const handleNext = () => {
    setPromptIndex((i) => (i + 1) % PROMPTS.length);
    setSelectedId(null);
  };

  const handleReset = () => {
    setPromptIndex(0);
    setSelectedId(null);
  };

  const answerProduct = FRUIT_STAND_PRODUCTS.find((p) => p.id === current.answerId);

  return (
    <ActivityLayout
      title="Fruit Stand"
      titleHe="דּוּכַן פֵּרוֹת"
      emoji="🍓"
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
              <p className="selection-product">
                {selected.emoji} {selected.nameHe} / {selected.nameEn}
              </p>
              <p className="selection-price">₪{selected.price}</p>
            </div>
          )}

          {answerProduct && (
            <RevealAnswer
              key={promptIndex}
              answer={`${answerProduct.nameEn} — ₪${answerProduct.price}`}
              answerHe={toHebrewPrice(answerProduct.price)}
            />
          )}
        </div>

        <div className="activity-right">
          <h2 className="section-label">לְחַץ עַל מוּצָר / Click a product</h2>
          <div className="product-grid">
            {FRUIT_STAND_PRODUCTS.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                selected={selectedId === p.id}
                onClick={() => setSelectedId(p.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </ActivityLayout>
  );
}
