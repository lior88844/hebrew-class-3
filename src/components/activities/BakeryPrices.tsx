import { useState } from "react";
import ActivityLayout from "../common/ActivityLayout";
import ProductCard from "../common/ProductCard";
import TeacherPrompt from "../common/TeacherPrompt";
import RevealAnswer from "../common/RevealAnswer";
import { BAKERY_PRODUCTS } from "../../utils/products";
import { toHebrewPrice } from "../../utils/hebrewNumbers";

const PROMPTS = [
  {
    en: "How much is the cheesecake? (עוּגַת גְּבִינָה)",
    he: "כַּמָּה עוֹלָה עוּגַת הַגְּבִינָה?",
    answerId: "cheesecake",
  },
  {
    en: "What costs twenty-four shekels?",
    he: "מָה עוֹלֶה עֶשְׂרִים וְאַרְבָּעָה שְׁקָלִים?",
    answerId: "muffin",
  },
  {
    en: "What is more expensive — rye bread or croissant?",
    he: "מָה יוֹתֵר יָקָר — לֶחֶם שִׁיפוֹן אוֹ קְרוּאָסוֹן?",
    answerId: "rye_bread",
  },
  {
    en: "What is the cheapest item in the bakery?",
    he: "מָה הֲכִי זוֹל בַּמַּאֲפִיָּה?",
    answerId: "croissant",
  },
  {
    en: "How much is the rye bread? (לֶחֶם שִׁיפוֹן)",
    he: "כַּמָּה עוֹלֶה לֶחֶם הַשִּׁיפוֹן?",
    answerId: "rye_bread",
  },
  {
    en: "Read the price of the chocolate muffin.",
    he: "קְרָא אֶת הַמְּחִיר שֶׁל הַמַּאֲפִין.",
    answerId: "muffin",
  },
];

interface Props {
  onBack: () => void;
}

export default function BakeryPrices({ onBack }: Props) {
  const [promptIndex, setPromptIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const current = PROMPTS[promptIndex];
  const selected = BAKERY_PRODUCTS.find((p) => p.id === selectedId);
  const answerProduct = BAKERY_PRODUCTS.find((p) => p.id === current.answerId);

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
      title="Bakery Prices"
      titleHe="מְחִירֵי הַמַּאֲפִיָּה"
      emoji="🥐"
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
          <h2 className="section-label">פְּרִיטֵי הַמַּאֲפִיָּה / Bakery items</h2>
          <div className="product-grid">
            {BAKERY_PRODUCTS.map((p) => (
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
