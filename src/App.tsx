import { useState } from "react";
import type { ComponentType } from "react";
import Dashboard from "./components/Dashboard";
import NumberReference from "./components/activities/NumberReference";
import PriceBingo from "./components/activities/PriceBingo";
import CafeOrder from "./components/activities/CafeOrder";
import SentenceBuilder from "./components/activities/SentenceBuilder";
import ShoppingDictation from "./components/activities/ShoppingDictation";
import FruitStand from "./components/activities/FruitStand";
import FillTheBasket from "./components/activities/FillTheBasket";
import BakeryPrices from "./components/activities/BakeryPrices";
import GroceryStoreMath from "./components/activities/GroceryStoreMath";
import CheckoutReceipt from "./components/activities/CheckoutReceipt";
import DiscountGame from "./components/activities/DiscountGame";
import ShoppingCartChallenge from "./components/activities/ShoppingCartChallenge";
import MarketRace from "./components/activities/MarketRace";
import ReceiptDetective from "./components/activities/ReceiptDetective";
import FinalMission from "./components/activities/FinalMission";
import FamilyNumbers from "./components/activities/FamilyNumbers";
import BombNumber from "./components/activities/BombNumber";
import DontHit100 from "./components/activities/DontHit100";
import CountTo100 from "./components/activities/CountTo100";
import type { ActivityId } from "./types";

const ACTIVITIES: Record<ActivityId, ComponentType<{ onBack: () => void }>> = {
  "number-ref": NumberReference,
  "price-bingo": PriceBingo,
  "cafe-order": CafeOrder,
  "sentence-builder": SentenceBuilder,
  "shopping-dictation": ShoppingDictation,
  "fruit-stand": FruitStand,
  "fill-basket": FillTheBasket,
  "bakery": BakeryPrices,
  "grocery-math": GroceryStoreMath,
  "checkout": CheckoutReceipt,
  "discount": DiscountGame,
  "cart-challenge": ShoppingCartChallenge,
  "market-race": MarketRace,
  "receipt-detective": ReceiptDetective,
  "supermarket-mission": FinalMission,
  "family-numbers": FamilyNumbers,
  "bomb-number": BombNumber,
  "dont-hit-100": DontHit100,
  "count-to-100": CountTo100,
};

export default function App() {
  const [current, setCurrent] = useState<ActivityId | null>(null);
  const goBack = () => setCurrent(null);

  if (!current) return <Dashboard onSelect={setCurrent} />;

  const Activity = ACTIVITIES[current];
  return <Activity onBack={goBack} />;
}
