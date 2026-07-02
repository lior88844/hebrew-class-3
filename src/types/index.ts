export interface Product {
  id: string;
  nameHe: string;
  nameEn: string;
  price: number;
  emoji: string;
}

export type ActivityId =
  | "number-ref"
  | "fruit-stand"
  | "fill-basket"
  | "bakery"
  | "grocery-math"
  | "checkout"
  | "discount"
  | "cart-challenge"
  | "market-race"
  | "receipt-detective"
  | "supermarket-mission";

export interface ActivityMeta {
  id: ActivityId;
  title: string;
  titleHe: string;
  description: string;
  emoji: string;
  color: string;
}
