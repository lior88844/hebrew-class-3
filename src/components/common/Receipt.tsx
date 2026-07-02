import type { Product } from "../../types";

interface ReceiptLine {
  product: Product;
  qty?: number;
}

interface Props {
  storeName?: string;
  items: ReceiptLine[];
  total: number;
  paid?: number;
  change?: number;
}

export default function Receipt({
  storeName = "🏪 סוּפֶּרְמַרְקֶט | Supermarket",
  items,
  total,
  paid,
  change,
}: Props) {
  return (
    <div className="receipt">
      <div className="receipt-header">
        <p className="receipt-store" dir="rtl">{storeName}</p>
        <div className="receipt-divider" />
      </div>
      <div className="receipt-items">
        {items.map((line, i) => (
          <div key={i} className="receipt-row">
            <span className="receipt-item-name">
              {line.product.emoji} {line.product.nameHe} / {line.product.nameEn}
              {line.qty && line.qty > 1 ? ` ×${line.qty}` : ""}
            </span>
            <span className="receipt-item-price">
              ₪{line.qty ? line.product.price * line.qty : line.product.price}
            </span>
          </div>
        ))}
      </div>
      <div className="receipt-divider" />
      <div className="receipt-total-row">
        <span className="receipt-total-label">סַךְ הַכֹּל / Total</span>
        <span className="receipt-total-price">₪{total}</span>
      </div>
      {paid !== undefined && (
        <>
          <div className="receipt-row">
            <span>שׁוּלַּם / Paid</span>
            <span>₪{paid}</span>
          </div>
          {change !== undefined && change >= 0 && (
            <div className="receipt-row receipt-row--change">
              <span>עוֹדֵף / Change</span>
              <span>₪{change}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
