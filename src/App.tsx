import { useState } from "react";
import Dashboard from "./components/Dashboard";
import NumberReference from "./components/activities/NumberReference";
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
import type { ActivityId } from "./types";

export default function App() {
  const [current, setCurrent] = useState<ActivityId | null>(null);

  const goBack = () => setCurrent(null);

  if (current === "number-ref") return <NumberReference onBack={goBack} />;
  if (current === "fruit-stand") return <FruitStand onBack={goBack} />;
  if (current === "fill-basket") return <FillTheBasket onBack={goBack} />;
  if (current === "bakery") return <BakeryPrices onBack={goBack} />;
  if (current === "grocery-math") return <GroceryStoreMath onBack={goBack} />;
  if (current === "checkout") return <CheckoutReceipt onBack={goBack} />;
  if (current === "discount") return <DiscountGame onBack={goBack} />;
  if (current === "cart-challenge") return <ShoppingCartChallenge onBack={goBack} />;
  if (current === "market-race") return <MarketRace onBack={goBack} />;
  if (current === "receipt-detective") return <ReceiptDetective onBack={goBack} />;
  if (current === "supermarket-mission") return <FinalMission onBack={goBack} />;

  return <Dashboard onSelect={setCurrent} />;
}
