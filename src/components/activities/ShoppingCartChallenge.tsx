import { useState } from "react";
import ActivityLayout from "../common/ActivityLayout";
import BudgetCart from "../common/BudgetCart";
import { CART_CHALLENGE_PRODUCTS } from "../../utils/products";

const BUDGET = 50;

interface Props {
  onBack: () => void;
}

export default function ShoppingCartChallenge({ onBack }: Props) {
  const [cart, setCart] = useState<Record<string, number>>({});

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const qty = (prev[id] ?? 0) - 1;
      if (qty <= 0) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: qty };
    });
  };

  const reset = () => setCart({});

  const cartItems = Object.entries(cart)
    .map(([id, qty]) => ({
      product: CART_CHALLENGE_PRODUCTS.find((p) => p.id === id)!,
      qty,
    }))
    .filter((item) => item.product);

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  return (
    <ActivityLayout
      title="Shopping Cart Challenge"
      titleHe="אַתְגַּר עֲגֶלֶת הַקְּנִיּוֹת"
      emoji="🛒"
      onBack={onBack}
    >
      <div className="activity-grid">
        <div className="activity-left">
          <div className="card">
            <h2 className="card-title">💰 תַּקְצִיב / Budget: ₪{BUDGET}</h2>
            <p className="help-text">
              הוֹסֵף פְּרִיטִים לָעֲגָלָה — הִשָּׁאֵר בַּתַּקְצִיב!
            </p>
            <p className="help-text" style={{ marginTop: "0.2rem" }}>
              Add items to your cart. Stay within budget!
            </p>
            <button className="ctrl-btn ctrl-btn--reset" style={{ marginTop: "0.5rem" }} onClick={reset}>
              ↺ אַתְחֵל עֲגָלָה / Reset Cart
            </button>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <BudgetCart
              items={cartItems}
              budget={BUDGET}
              total={total}
              onRemove={(id) => removeFromCart(id)}
            />
          </div>
        </div>

        <div className="activity-right">
          <h2 className="section-label">הוֹסֵף לָעֲגָלָה / Add items</h2>
          <div className="product-grid">
            {CART_CHALLENGE_PRODUCTS.map((p) => {
              const inCart = cart[p.id] ?? 0;
              return (
                <div key={p.id} className={`product-card product-card--static ${inCart > 0 ? "product-card--selected" : ""}`}>
                  {inCart > 0 && <span className="product-badge">×{inCart}</span>}
                  <span className="product-emoji">{p.emoji}</span>
                  <span className="product-name-he" dir="rtl">{p.nameHe}</span>
                  <span className="product-name-en">{p.nameEn}</span>
                  <span className="product-price">₪{p.price}</span>
                  <div className="quantity-controls" style={{ marginTop: "0.5rem" }}>
                    <button className="qty-btn" onClick={() => removeFromCart(p.id)} disabled={inCart === 0}>−</button>
                    <span className="qty-display">{inCart}</span>
                    <button className="qty-btn" onClick={() => addToCart(p.id)}>+</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ActivityLayout>
  );
}
