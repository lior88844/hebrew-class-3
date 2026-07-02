import { toHebrewWord, toHebrewPrice } from "../../utils/hebrewNumbers";

interface Props {
  number: number;
  showPrice?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function NumberWordDisplay({ number, showPrice = false, size = "md" }: Props) {
  return (
    <div className={`number-word number-word--${size}`}>
      <span className="number-word-digit">₪{number}</span>
      <span className="number-word-he" dir="rtl">
        {showPrice ? toHebrewPrice(number) : toHebrewWord(number)}
      </span>
    </div>
  );
}
