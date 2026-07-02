import { useState } from "react";
import ActivityLayout from "../common/ActivityLayout";
import { toHebrewPrice } from "../../utils/hebrewNumbers";

interface MenuItem {
  id: string;
  nameHe: string;
  nameEn: string;
  price: number;
  emoji: string;
  category: "drink" | "food";
}

const MENU: MenuItem[] = [
  { id: "espresso",   nameHe: "אֶסְפְּרֶסּוֹ",      nameEn: "Espresso",        price: 14, emoji: "☕", category: "drink" },
  { id: "black",      nameHe: "קָפֶה שָׁחוֹר",       nameEn: "Black Coffee",    price: 18, emoji: "🖤", category: "drink" },
  { id: "latte",      nameHe: "לַטֶּה",              nameEn: "Latte",           price: 22, emoji: "🥛", category: "drink" },
  { id: "cappuccino", nameHe: "קַפּוּצִ'ינוֹ",       nameEn: "Cappuccino",      price: 22, emoji: "☁️", category: "drink" },
  { id: "iced",       nameHe: "קָפֶה קַר",           nameEn: "Iced Coffee",     price: 26, emoji: "🧊", category: "drink" },
  { id: "matcha",     nameHe: "מָאצ'ה לַאטֶה",      nameEn: "Matcha Latte",    price: 28, emoji: "🍵", category: "drink" },
  { id: "croissant",  nameHe: "קְרוּאָסוֹן חֶמְאָה", nameEn: "Butter Croissant",price: 18, emoji: "🥐", category: "food"  },
  { id: "muffin",     nameHe: "מַאֲפִין שׁוֹקוֹלָד", nameEn: "Choc Muffin",     price: 24, emoji: "🧁", category: "food"  },
  { id: "avotoast",   nameHe: "אֲבוֹקָדוֹ טוֹסְט",  nameEn: "Avocado Toast",   price: 52, emoji: "🥑", category: "food"  },
  { id: "cheesecake", nameHe: "עוּגַת גְּבִינָה",    nameEn: "Cheesecake",      price: 38, emoji: "🍰", category: "food"  },
  { id: "granola",    nameHe: "גְּרָנוֹלָה",         nameEn: "Granola Bowl",    price: 42, emoji: "🥣", category: "food"  },
];

interface Props {
  onBack: () => void;
}

export default function CafeOrder({ onBack }: Props) {
  const [order, setOrder] = useState<Record<string, number>>({});
  const [people, setPeople] = useState(1);

  const adjust = (id: string, delta: number) => {
    setOrder((prev) => {
      const qty = Math.max(0, (prev[id] ?? 0) + delta);
      if (qty === 0) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: qty };
    });
  };

  const reset = () => setOrder({});

  const orderLines = Object.entries(order)
    .map(([id, qty]) => ({ item: MENU.find((m) => m.id === id)!, qty }))
    .filter((l) => l.item);

  const total = orderLines.reduce((s, l) => s + l.item.price * l.qty, 0);
  const perPerson = people > 0 ? Math.ceil(total / people) : 0;

  const drinks = MENU.filter((m) => m.category === "drink");
  const foods  = MENU.filter((m) => m.category === "food");

  return (
    <ActivityLayout
      title="Café Order"
      titleHe="הַזְמָנָה בְּבֵית קָפֶה"
      emoji="☕"
      onBack={onBack}
    >
      <div className="cafe-layout">
        {/* Left: order summary */}
        <div className="cafe-order-panel">
          <div className="card">
            <h2 className="card-title">🧾 הַזְמָנָה / Order</h2>

            {orderLines.length === 0 ? (
              <p className="budget-cart-empty">הַזְמָנָה רֵיקָה — הוֹסֵף פְּרִיטִים מֵהַתַּפְרִיט</p>
            ) : (
              <div className="cafe-order-lines">
                {orderLines.map(({ item, qty }) => (
                  <div key={item.id} className="cafe-order-row">
                    <span className="cafe-order-emoji">{item.emoji}</span>
                    <div className="cafe-order-info">
                      <span className="cafe-order-name-he" dir="rtl">{item.nameHe}</span>
                      <span className="cafe-order-name-en">{item.nameEn}</span>
                    </div>
                    {qty > 1 && <span className="cart-qty">×{qty}</span>}
                    <span className="cart-item-price">₪{item.price * qty}</span>
                    <button className="cart-remove-btn" onClick={() => adjust(item.id, -qty)}>✕</button>
                  </div>
                ))}
              </div>
            )}

            <div className="cafe-order-total">
              <div className="budget-row" style={{ fontSize: "1.05rem", fontWeight: 700 }}>
                <span>סַךְ הַכֹּל / Total</span>
                <span style={{ color: "var(--accent)" }}>₪{total}</span>
              </div>
              <div style={{ color: "var(--muted)", fontSize: "0.8rem", marginTop: "0.2rem", direction: "rtl" }}>
                {total > 0 && toHebrewPrice(total)}
              </div>
            </div>
          </div>

          {/* People selector */}
          <div className="card">
            <h2 className="card-title">👥 לְחַלֵּק / Split the bill</h2>
            <div className="people-selector">
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  className={`people-btn ${people === n ? "people-btn--active" : ""}`}
                  onClick={() => setPeople(n)}
                >
                  {n} {n === 1 ? "person" : "people"}
                </button>
              ))}
            </div>
            {total > 0 && people > 1 && (
              <div className="cafe-split">
                <span>כָּל אֶחָד מְשַׁלֵּם / Each pays</span>
                <span className="cafe-split-amount">₪{perPerson}</span>
              </div>
            )}
          </div>

          <button className="ctrl-btn ctrl-btn--reset" onClick={reset}>↺ אַתְחֵל הַזְמָנָה</button>
        </div>

        {/* Right: menu */}
        <div className="cafe-menu-panel">
          <div className="cafe-menu-section">
            <h2 className="cafe-menu-heading">☕ מַשְׁקָאוֹת / Drinks</h2>
            <div className="cafe-menu-grid">
              {drinks.map((item) => {
                const qty = order[item.id] ?? 0;
                return (
                  <div key={item.id} className={`cafe-menu-card ${qty > 0 ? "cafe-menu-card--ordered" : ""}`}>
                    {qty > 0 && <span className="product-badge">×{qty}</span>}
                    <span className="cafe-menu-emoji">{item.emoji}</span>
                    <span className="cafe-menu-name-he" dir="rtl">{item.nameHe}</span>
                    <span className="cafe-menu-name-en">{item.nameEn}</span>
                    <span className="cafe-menu-price">₪{item.price}</span>
                    <div className="quantity-controls" style={{ marginTop: "0.4rem" }}>
                      <button className="qty-btn qty-btn--sm" onClick={() => adjust(item.id, -1)} disabled={qty === 0}>−</button>
                      <span className="qty-display qty-display--sm">{qty}</span>
                      <button className="qty-btn qty-btn--sm" onClick={() => adjust(item.id, 1)}>+</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="cafe-menu-section">
            <h2 className="cafe-menu-heading">🍽 אוֹכֶל / Food</h2>
            <div className="cafe-menu-grid">
              {foods.map((item) => {
                const qty = order[item.id] ?? 0;
                return (
                  <div key={item.id} className={`cafe-menu-card ${qty > 0 ? "cafe-menu-card--ordered" : ""}`}>
                    {qty > 0 && <span className="product-badge">×{qty}</span>}
                    <span className="cafe-menu-emoji">{item.emoji}</span>
                    <span className="cafe-menu-name-he" dir="rtl">{item.nameHe}</span>
                    <span className="cafe-menu-name-en">{item.nameEn}</span>
                    <span className="cafe-menu-price">₪{item.price}</span>
                    <div className="quantity-controls" style={{ marginTop: "0.4rem" }}>
                      <button className="qty-btn qty-btn--sm" onClick={() => adjust(item.id, -1)} disabled={qty === 0}>−</button>
                      <span className="qty-display qty-display--sm">{qty}</span>
                      <button className="qty-btn qty-btn--sm" onClick={() => adjust(item.id, 1)}>+</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </ActivityLayout>
  );
}
