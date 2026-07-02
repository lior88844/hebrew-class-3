import type { Product } from "../../types";

interface Props {
  product: Product;
  selected?: boolean;
  highlighted?: boolean;
  showPrice?: boolean;
  onClick?: () => void;
  badge?: string;
}

export default function ProductCard({
  product,
  selected = false,
  highlighted = false,
  showPrice = true,
  onClick,
  badge,
}: Props) {
  return (
    <button
      className={`product-card ${selected ? "product-card--selected" : ""} ${highlighted ? "product-card--highlighted" : ""} ${onClick ? "" : "product-card--static"}`}
      onClick={onClick}
      disabled={!onClick}
    >
      {badge && <span className="product-badge">{badge}</span>}
      <span className="product-emoji">{product.emoji}</span>
      <span className="product-name-he" dir="rtl">{product.nameHe}</span>
      <span className="product-name-en">{product.nameEn}</span>
      {showPrice && <span className="product-price">₪{product.price}</span>}
    </button>
  );
}
