import { useState } from "react";
import ActivityLayout from "../common/ActivityLayout";
import { FRUIT_STAND_PRODUCTS } from "../../utils/products";
import { toHebrewWord } from "../../utils/hebrewNumbers";

const SHOPPING_LIST = [
  { id: "strawberry", qty: 4 },
  { id: "mango",      qty: 2 },
  { id: "avocado",    qty: 3 },
];

const INITIAL_BASKET = Object.fromEntries(SHOPPING_LIST.map((i) => [i.id, 0]));

interface Props {
  onBack: () => void;
}

export default function FillTheBasket({ onBack }: Props) {
  const [basket, setBasket] = useState<Record<string, number>>(INITIAL_BASKET);

  const adjust = (id: string, delta: number) => {
    setBasket((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] ?? 0) + delta),
    }));
  };

  const reset = () => setBasket({ ...INITIAL_BASKET });

  const complete = SHOPPING_LIST.every((item) => basket[item.id] === item.qty);

  const products = FRUIT_STAND_PRODUCTS.filter((p) =>
    SHOPPING_LIST.some((s) => s.id === p.id)
  );

  return (
    <ActivityLayout
      title="Fill the Basket"
      titleHe="מַלֵּא אֶת הַסַּל"
      emoji="🧺"
      onBack={onBack}
    >
      <div className="activity-grid">
        <div className="activity-left">
          <div className="card">
            <h2 className="card-title">🗒 רְשִׁימַת קְנִיּוֹת / Shopping List</h2>
            <ul className="shopping-list">
              {SHOPPING_LIST.map((item) => {
                const product = products.find((p) => p.id === item.id)!;
                const current = basket[item.id] ?? 0;
                const done = current === item.qty;
                return (
                  <li key={item.id} className={`shopping-list-item ${done ? "shopping-list-item--done" : ""}`}>
                    <span>
                      {product.emoji} {toHebrewWord(item.qty)} {product.nameHe} / {item.qty} {product.nameEn}
                    </span>
                    {done && <span className="check-badge">✓</span>}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="card" style={{ marginTop: "1rem" }}>
            <div className="teacher-controls">
              <button className="ctrl-btn ctrl-btn--reset" onClick={reset}>↺ אַתְחֵל סַל / Reset</button>
            </div>
          </div>

          {complete && (
            <div className="success-banner">
              🎉 הַסַּל מָלֵא! Basket complete!
            </div>
          )}
        </div>

        <div className="activity-right">
          <h2 className="section-label">שַׁנֵּה כַּמּוּיוֹת / Adjust quantities</h2>
          <div className="product-grid">
            {products.map((product) => {
              const target = SHOPPING_LIST.find((s) => s.id === product.id)!;
              const current = basket[product.id] ?? 0;
              const done = current === target.qty;
              const over = current > target.qty;
              return (
                <div
                  key={product.id}
                  className={`quantity-card ${done ? "quantity-card--done" : ""} ${over ? "quantity-card--over" : ""}`}
                >
                  <span className="product-emoji">{product.emoji}</span>
                  <span className="product-name-he" dir="rtl">{product.nameHe}</span>
                  <span className="product-name-en">{product.nameEn}</span>
                  <div className="quantity-controls">
                    <button className="qty-btn" onClick={() => adjust(product.id, -1)}>−</button>
                    <span className={`qty-display ${done ? "qty-done" : over ? "qty-over" : ""}`}>{current}</span>
                    <button className="qty-btn" onClick={() => adjust(product.id, 1)}>+</button>
                  </div>
                  <div className="qty-target">Target: {target.qty}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ActivityLayout>
  );
}
