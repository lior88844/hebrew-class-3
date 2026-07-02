import { useState } from "react";
import ActivityLayout from "../common/ActivityLayout";
import Receipt from "../common/Receipt";
import RevealAnswer from "../common/RevealAnswer";
import TeacherPrompt from "../common/TeacherPrompt";
import { RECEIPT_PRODUCTS } from "../../utils/products";
import { toHebrewPrice, toHebrewChange, toHebrewWord } from "../../utils/hebrewNumbers";

const PAID_AMOUNT = 100;
const total = RECEIPT_PRODUCTS.reduce((sum, p) => sum + p.price, 0);
const change = PAID_AMOUNT - total;

const cheapest = [...RECEIPT_PRODUCTS].sort((a, b) => a.price - b.price)[0];
const mostExpensive = [...RECEIPT_PRODUCTS].sort((a, b) => b.price - a.price)[0];

const PROMPTS = [
  {
    en: `What is the total? (סַךְ הַכֹּל)`,
    he: "כַּמָּה עוֹלֶה הַכֹּל?",
    answer: `Total is ₪${total}`,
    answerHe: `סַךְ הַכֹּל ${toHebrewPrice(total)}`,
  },
  {
    en: "Which item is cheapest?",
    he: "מָה הֲכִי זוֹל?",
    answer: `${cheapest.nameEn} — ₪${cheapest.price}`,
    answerHe: `${cheapest.nameHe} — הֲכִי זוֹל`,
  },
  {
    en: "Which item is most expensive?",
    he: "מָה הֲכִי יָקָר?",
    answer: `${mostExpensive.nameEn} — ₪${mostExpensive.price}`,
    answerHe: `${mostExpensive.nameHe} — הֲכִי יָקָר`,
  },
  {
    en: `If you pay ₪${PAID_AMOUNT}, how much change do you get?`,
    he: `אִם שִׁלַּמְתָּ ${toHebrewWord(PAID_AMOUNT)} שְׁקָלִים, כַּמָּה עוֹדֵף תְּקַבֵּל?`,
    answer: `Change: ₪${change}`,
    answerHe: toHebrewChange(change),
  },
];

interface Props {
  onBack: () => void;
}

export default function CheckoutReceipt({ onBack }: Props) {
  const [promptIndex, setPromptIndex] = useState(0);
  const [showPaid, setShowPaid] = useState(false);

  const current = PROMPTS[promptIndex];

  const handleNext = () => {
    setPromptIndex((i) => (i + 1) % PROMPTS.length);
  };

  const handleReset = () => {
    setPromptIndex(0);
    setShowPaid(false);
  };

  return (
    <ActivityLayout
      title="Checkout Receipt"
      titleHe="חֶשְׁבּוֹנִית הַקּוּפָּה"
      emoji="🧾"
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

          <div className="card" style={{ marginTop: "0.75rem" }}>
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={showPaid}
                onChange={(e) => setShowPaid(e.target.checked)}
                style={{ marginRight: "0.5rem" }}
              />
              Show paid / עוֹדֵף on receipt
            </label>
          </div>

          <RevealAnswer
            key={promptIndex}
            answer={current.answer}
            answerHe={current.answerHe}
          />
        </div>

        <div className="activity-right">
          <h2 className="section-label">חֶשְׁבּוֹנִית / Receipt</h2>
          <Receipt
            items={RECEIPT_PRODUCTS.map((p) => ({ product: p }))}
            total={total}
            paid={showPaid ? PAID_AMOUNT : undefined}
            change={showPaid ? change : undefined}
          />
        </div>
      </div>
    </ActivityLayout>
  );
}
