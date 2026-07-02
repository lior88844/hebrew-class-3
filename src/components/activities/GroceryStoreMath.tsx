import { useState } from "react";
import ActivityLayout from "../common/ActivityLayout";
import RevealAnswer from "../common/RevealAnswer";
import { GROCERY_PRODUCTS } from "../../utils/products";
import { toHebrewPrice } from "../../utils/hebrewNumbers";
import type { Product } from "../../types";

interface Props {
  onBack: () => void;
}

export default function GroceryStoreMath({ onBack }: Props) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const [revealKey, setRevealKey] = useState(0);

  const total = selectedProduct ? selectedProduct.price * qty : 0;

  const handleSelect = (p: Product) => {
    setSelectedProduct(p);
    setQty(1);
    setRevealKey((k) => k + 1);
  };

  const handleQty = (delta: number) => {
    setQty((q) => Math.max(1, Math.min(10, q + delta)));
    setRevealKey((k) => k + 1);
  };

  const handleReset = () => {
    setSelectedProduct(null);
    setQty(1);
    setRevealKey((k) => k + 1);
  };

  return (
    <ActivityLayout
      title="Grocery Store Math"
      titleHe="חִישׁוּבִים בַּסּוּפֶּרְמַרְקֶט"
      emoji="🧮"
      onBack={onBack}
    >
      <div className="activity-grid">
        <div className="activity-left">
          <div className="card">
            <h2 className="card-title">👩‍🏫 Teacher Controls</h2>
            <p className="help-text">Select a product, then set a quantity. Show the calculation to the student.</p>

            {selectedProduct ? (
              <div className="math-display">
                <div className="math-product-info">
                  <span className="math-emoji">{selectedProduct.emoji}</span>
                  <div>
                    <p className="math-name-he" dir="rtl">{selectedProduct.nameHe}</p>
                    <p className="math-name-en">{selectedProduct.nameEn}</p>
                    <p className="math-unit-price">₪{selectedProduct.price} each</p>
                  </div>
                </div>

                <div className="quantity-controls" style={{ justifyContent: "center", margin: "1rem 0" }}>
                  <button className="qty-btn" onClick={() => handleQty(-1)}>−</button>
                  <span className="qty-display">{qty}</span>
                  <button className="qty-btn" onClick={() => handleQty(1)}>+</button>
                </div>

                <div className="math-equation">
                  <span className="math-term">{qty}</span>
                  <span className="math-op">×</span>
                  <span className="math-term">₪{selectedProduct.price}</span>
                  <span className="math-op">=</span>
                  <span className="math-result">₪{total}</span>
                </div>
              </div>
            ) : (
              <div className="empty-state">← בְּחַר מוּצָר / Select a product</div>
            )}

            {selectedProduct && (
              <RevealAnswer
                key={revealKey}
                answer={`${qty} × ₪${selectedProduct.price} = ₪${total}`}
                answerHe={`${qty} × ${selectedProduct.nameHe} = ${toHebrewPrice(total)}`}
              />
            )}

            <button className="ctrl-btn ctrl-btn--reset" style={{ marginTop: "1rem" }} onClick={handleReset}>
              ↺ אַתְחֵל / Reset
            </button>
          </div>
        </div>

        <div className="activity-right">
          <h2 className="section-label">בְּחַר מוּצָר / Select a product</h2>
          <div className="product-grid">
            {GROCERY_PRODUCTS.map((p) => (
              <button
                key={p.id}
                className={`product-card ${selectedProduct?.id === p.id ? "product-card--selected" : ""}`}
                onClick={() => handleSelect(p)}
              >
                <span className="product-emoji">{p.emoji}</span>
                <span className="product-name-he" dir="rtl">{p.nameHe}</span>
                <span className="product-name-en">{p.nameEn}</span>
                <span className="product-price">₪{p.price}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </ActivityLayout>
  );
}
