import DashboardCard from "./common/DashboardCard";
import type { ActivityId, ActivityMeta } from "../types";

const ACTIVITIES: ActivityMeta[] = [
  {
    id: "number-ref",
    title: "Number Reference",
    titleHe: "לוּחַ הַמִּסְפָּרִים",
    description: "Count 0–120 in Hebrew — range tabs, spotlight & count-together mode",
    emoji: "🔢",
    color: "#5b5ea6",
  },
  {
    id: "price-bingo",
    title: "Price Bingo",
    titleHe: "בִּינְגּוֹ מְחִירִים",
    description: "Teacher calls a Hebrew number — student finds it on the card",
    emoji: "🎱",
    color: "#9b59b6",
  },
  {
    id: "cafe-order",
    title: "Café Order",
    titleHe: "הַזְמָנָה בְּבֵית קָפֶה",
    description: "Build a café order and split the bill between 1–4 people",
    emoji: "☕",
    color: "#6f4e37",
  },
  {
    id: "sentence-builder",
    title: "Number Word Builder",
    titleHe: "בּוֹנֵה מִסְפָּרִים",
    description: "Assemble scrambled Hebrew number tokens for a given price",
    emoji: "🧩",
    color: "#1abc9c",
  },
  {
    id: "shopping-dictation",
    title: "Price Dictation",
    titleHe: "הַכָּתָבַת מְחִירִים",
    description: "Hebrew word → pick the numeral, or numeral → pick the Hebrew word",
    emoji: "🎧",
    color: "#e67e22",
  },
  {
    id: "fruit-stand",
    title: "Fruit Stand",
    titleHe: "דּוּכַן פֵּרוֹת",
    description: "Practice numbers 1–10 through fruit prices",
    emoji: "🍎",
    color: "#e74c3c",
  },
  {
    id: "fill-basket",
    title: "Fill the Basket",
    titleHe: "מַלֵּא אֶת הַסַּל",
    description: "Practice quantities with plus/minus counters",
    emoji: "🧺",
    color: "#f39c12",
  },
  {
    id: "bakery",
    title: "Bakery Prices",
    titleHe: "מְחִירֵי הַמַּאֲפִיָּה",
    description: "Practice numbers 11–40",
    emoji: "🥐",
    color: "#d35400",
  },
  {
    id: "grocery-math",
    title: "Grocery Store Math",
    titleHe: "חִישׁוּבִים בַּסּוּפֶּרְמַרְקֶט",
    description: "Multiplication and totals",
    emoji: "🧮",
    color: "#27ae60",
  },
  {
    id: "checkout",
    title: "Checkout Receipt",
    titleHe: "חֶשְׁבּוֹנִית הַקּוּפָּה",
    description: "Read a receipt and calculate totals",
    emoji: "🧾",
    color: "#2980b9",
  },
  {
    id: "discount",
    title: "Discount Game",
    titleHe: "מִשְׂחַק הַהֲנָחוֹת",
    description: "Compare before/after prices",
    emoji: "🏷",
    color: "#8e44ad",
  },
  {
    id: "cart-challenge",
    title: "Shopping Cart Challenge",
    titleHe: "אַתְגַּר עֲגֶלֶת הַקְּנִיּוֹת",
    description: "Stay within a ₪50 budget",
    emoji: "🛒",
    color: "#16a085",
  },
  {
    id: "market-race",
    title: "Market Race",
    titleHe: "מֵרוֹץ הַשּׁוּק",
    description: "Fast price recognition — click the right item",
    emoji: "🏁",
    color: "#c0392b",
  },
  {
    id: "receipt-detective",
    title: "Receipt Detective",
    titleHe: "בַּלָּשׁ הַחֶשְׁבּוֹנִיּוֹת",
    description: "Investigate a realistic 10-item receipt",
    emoji: "🔍",
    color: "#2c3e50",
  },
  {
    id: "supermarket-mission",
    title: "Final Supermarket Mission",
    titleHe: "הַמִּשִּׁימָה הַסּוֹפִית",
    description: "Build a cart with ₪120 budget — don't miss required items!",
    emoji: "🏆",
    color: "#f1c40f",
  },
  {
    id: "family-numbers",
    title: "Family Numbers",
    titleHe: "מִסְפָּרֵי הַמִּשְׁפָּחָה",
    description: "Count family members using masculine-form numbers 1–10",
    emoji: "👨‍👦",
    color: "#f0fdf4",
  },
  {
    id: "bomb-number",
    title: "Bomb Number",
    titleHe: "מִסְפַּר הַפְּצָצָה",
    description: "Secret ₪ target — add Hebrew amounts each turn. Whoever hits it loses!",
    emoji: "💣",
    color: "#fff8f0",
  },
  {
    id: "dont-hit-100",
    title: "Don't Hit 100",
    titleHe: "אַל תִּגַּע בְּמֵאָה",
    description: "Add ₪1–20 (no repeats). Say every move in Hebrew. Land on ₪100 and you lose!",
    emoji: "🧨",
    color: "#fff0f0",
  },
  {
    id: "count-to-100",
    title: "Count to 100",
    titleHe: "לִסְפּוֹר עַד מֵאָה",
    description: "Round 1: count with Hebrew · Round 2: say it from memory (blind mode)",
    emoji: "💯",
    color: "#f0f9ff",
  },
];

interface Props {
  onSelect: (id: ActivityId) => void;
}

export default function Dashboard({ onSelect }: Props) {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-title-block">
          <h1 className="dashboard-title">
            קְנִיּוֹת בְּעִבְרִית
          </h1>
          <h2 className="dashboard-subtitle">Shopping in Hebrew</h2>
          <p className="dashboard-desc">
            Interactive lesson board — teacher-guided activities for adult learners
          </p>
        </div>
        <div className="dashboard-badge-row">
          <span className="lang-badge">🇮🇱 עִבְרִית</span>
          <span className="lang-badge">🇬🇧 English support</span>
          <span className="lang-badge">₪ שְׁקָלִים</span>
        </div>
      </header>

      <div className="dashboard-grid">
        {ACTIVITIES.map((activity) => (
          <DashboardCard
            key={activity.id}
            activity={activity}
            onClick={() => onSelect(activity.id)}
          />
        ))}
      </div>
    </div>
  );
}
