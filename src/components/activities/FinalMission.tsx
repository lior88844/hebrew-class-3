import { useState } from "react";
import ActivityLayout from "../common/ActivityLayout";
import BudgetCart from "../common/BudgetCart";
import { SUPERMARKET_ALL_PRODUCTS, SUPERMARKET_REQUIRED } from "../../utils/products";
import type { Product } from "../../types";

const BUDGET = 120;

interface Props {
  onBack: () => void;
}

export default function FinalMission({ onBack }: Props) {
  const [cart, setCart] = useState<Record<string, number>>({});

  const addToCart = (product: Product) => {
    setCart((prev) => ({ ...prev, [product.id]: (prev[product.id] ?? 0) + 1 }));
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
      product: SUPERMARKET_ALL_PRODUCTS.find((p) => p.id === id)!,
      qty,
    }))
    .filter((i) => i.product);

  const total = cartItems.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const remaining = BUDGET - total;
  const hasRequired = SUPERMARKET_REQUIRED.every((rid) => (cart[rid] ?? 0) > 0);
  const withinBudget = total <= BUDGET;
  const success = hasRequired && withinBudget;

  const requiredProducts = SUPERMARKET_ALL_PRODUCTS.filter((p) =>
    SUPERMARKET_REQUIRED.includes(p.id)
  );

  return (
    <ActivityLayout
      title="Final Supermarket Mission"
      titleHe="הַמִּשִּׁימָה הַסּוֹפִית"
      emoji="🏆"
      onBack={onBack}
    >
      <div className="mission-layout">
        {/* Top bar */}
        <div className="mission-topbar">
          <div className="mission-budget-display">
            <span>💰 תַּקְצִיב</span>
            <span className="mission-budget-amount">₪{BUDGET}</span>
          </div>
          <div className="mission-required-list">
            <span className="mission-list-label">פְּרִיטִים נִדְרָשִׁים / Required:</span>
            {requiredProducts.map((p) => {
              const done = (cart[p.id] ?? 0) > 0;
              return (
                <span key={p.id} className={`mission-item-tag ${done ? "mission-item-tag--done" : ""}`}>
                  {p.emoji} {p.nameHe} {done ? "✓" : ""}
                </span>
              );
            })}
          </div>
          <button className="ctrl-btn ctrl-btn--reset" onClick={reset}>↺ אַתְחֵל</button>
        </div>

        {success && (
          <div className="success-banner success-banner--big">
            🎉 מָצוּיָן! Mission Complete! All required items, within budget!
          </div>
        )}
        {!withinBudget && (
          <div className="warning-banner">
            ⚠️ חָרַגְתָּ מֵהַתַּקְצִיב! Over budget! ₪{total} &gt; ₪{BUDGET}
          </div>
        )}

        <div className="mission-content">
          {/* Product grid */}
          <div className="mission-products">
            <h2 className="section-label">חֲנוּת / Store — {SUPERMARKET_ALL_PRODUCTS.length} פְּרִיטִים</h2>
            <div className="mission-product-grid">
              {SUPERMARKET_ALL_PRODUCTS.map((p) => {
                const qty = cart[p.id] ?? 0;
                const required = SUPERMARKET_REQUIRED.includes(p.id);
                return (
                  <div
                    key={p.id}
                    className={`mission-product-card ${qty > 0 ? "mission-product-card--in-cart" : ""} ${required ? "mission-product-card--required" : ""}`}
                  >
                    {required && <span className="required-star">★</span>}
                    {qty > 0 && <span className="product-badge">×{qty}</span>}
                    <span className="product-emoji">{p.emoji}</span>
                    <span className="product-name-he" dir="rtl">{p.nameHe}</span>
                    <span className="product-name-en">{p.nameEn}</span>
                    <span className="product-price">₪{p.price}</span>
                    <div className="quantity-controls" style={{ marginTop: "0.4rem" }}>
                      <button className="qty-btn qty-btn--sm" onClick={() => removeFromCart(p.id)} disabled={qty === 0}>−</button>
                      <span className="qty-display qty-display--sm">{qty}</span>
                      <button className="qty-btn qty-btn--sm" onClick={() => addToCart(p)}>+</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cart panel */}
          <div className="mission-cart">
            <BudgetCart
              items={cartItems}
              budget={BUDGET}
              total={total}
              onRemove={(id) => removeFromCart(id)}
            />
            <div className="mission-status-card">
              <h3>סְטָטוּס מִשִּׁימָה / Mission Status</h3>
              <div className={`mission-check ${hasRequired ? "mission-check--pass" : "mission-check--fail"}`}>
                {hasRequired ? "✓" : "✗"} כָּל הַפְּרִיטִים הַנִּדְרָשִׁים / All required items
              </div>
              <div className={`mission-check ${withinBudget ? "mission-check--pass" : "mission-check--fail"}`}>
                {withinBudget ? "✓" : "✗"} בְּתוֹךְ הַתַּקְצִיב — נִשְׁאַר ₪{remaining}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ActivityLayout>
  );
}
