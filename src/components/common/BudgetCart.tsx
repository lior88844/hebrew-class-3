import type { Product } from "../../types";

interface CartItem {
  product: Product;
  qty: number;
}

interface Props {
  items: CartItem[];
  budget: number;
  total: number;
  onRemove?: (id: string) => void;
}

export default function BudgetCart({ items, budget, total, onRemove }: Props) {
  const remaining = budget - total;
  const canAfford = remaining >= 0;

  return (
    <div className="budget-cart">
      <div className="budget-cart-header">
        <span>🛒 עֲגָלָה / Cart</span>
        <div className={`budget-status ${canAfford ? "budget-status--ok" : "budget-status--over"}`}>
          {canAfford ? "אֶפְשָׁר לִקְנוֹת ✓" : "אִי אֶפְשָׁר לִקְנוֹת ✗"}
        </div>
      </div>
      <div className="budget-cart-items">
        {items.length === 0 && (
          <p className="budget-cart-empty">הָעֲגָלָה רֵיקָה — הוֹסֵף פְּרִיטִים</p>
        )}
        {items.map(({ product, qty }) => (
          <div key={product.id} className="budget-cart-row">
            <span>{product.emoji} {product.nameHe} / {product.nameEn}</span>
            {qty > 1 && <span className="cart-qty">×{qty}</span>}
            <span className="cart-item-price">₪{product.price * qty}</span>
            {onRemove && (
              <button className="cart-remove-btn" onClick={() => onRemove(product.id)}>✕</button>
            )}
          </div>
        ))}
      </div>
      <div className="budget-cart-footer">
        <div className="budget-row">
          <span>סַךְ הַכֹּל / Total</span>
          <span className="budget-total">₪{total}</span>
        </div>
        <div className="budget-row">
          <span>תַּקְצִיב / Budget</span>
          <span>₪{budget}</span>
        </div>
        <div className={`budget-row budget-remaining ${canAfford ? "budget-remaining--ok" : "budget-remaining--over"}`}>
          <span>נִשְׁאַר / Remaining</span>
          <span>₪{remaining}</span>
        </div>
      </div>
    </div>
  );
}
