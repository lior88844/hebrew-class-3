import type { Product } from "../types";

// Prices ₪5–₪9 → practice numbers 1–10
export const FRUIT_STAND_PRODUCTS: Product[] = [
  { id: "strawberry", nameHe: "תּוּת שָׂדֶה",  nameEn: "Strawberries", price: 9, emoji: "🍓" },
  { id: "mango",      nameHe: "מַנְגּוֹ",       nameEn: "Mango",        price: 8, emoji: "🥭" },
  { id: "avocado",    nameHe: "אֲבוֹקָדוֹ",    nameEn: "Avocado",      price: 7, emoji: "🥑" },
  { id: "nectarine",  nameHe: "נֶקְטָרִינָה",  nameEn: "Nectarine",    price: 5, emoji: "🍑" },
];

// Prices ₪12–₪35 → practice numbers 11–40
export const BAKERY_PRODUCTS: Product[] = [
  { id: "croissant",  nameHe: "קְרוּאָסוֹן חֶמְאָה", nameEn: "Butter Croissant",   price: 12, emoji: "🥐" },
  { id: "rye_bread",  nameHe: "לֶחֶם שִׁיפוֹן",       nameEn: "Rye Bread",          price: 18, emoji: "🍞" },
  { id: "cheesecake", nameHe: "עוּגַת גְּבִינָה",     nameEn: "Cheesecake",         price: 35, emoji: "🍰" },
  { id: "muffin",     nameHe: "מַאֲפִין שׁוֹקוֹלָד",  nameEn: "Chocolate Muffin",   price: 24, emoji: "🧁" },
];

// For multiplication practice
export const GROCERY_PRODUCTS: Product[] = [
  { id: "greek_yogurt", nameHe: "יוֹגוּרְט יְווָנִי",    nameEn: "Greek Yogurt",    price: 9,  emoji: "🥣" },
  { id: "granola",      nameHe: "גְּרָנוֹלָה",           nameEn: "Granola",         price: 18, emoji: "🌾" },
  { id: "tahini",       nameHe: "טְחִינָה",              nameEn: "Tahini",          price: 26, emoji: "🫙" },
  { id: "chicken",      nameHe: "חֲזֵה עוֹף",            nameEn: "Chicken Breast",  price: 47, emoji: "🍗" },
];

// Total = ₪53 → change from ₪100 = ₪47 (clean numbers for the lesson)
export const RECEIPT_PRODUCTS: Product[] = [
  { id: "labneh",          nameHe: "לַבָּנֶה",             nameEn: "Labneh",          price: 9,  emoji: "🫙" },
  { id: "olive_oil",       nameHe: "שֶׁמֶן זַיִת",         nameEn: "Olive Oil",       price: 18, emoji: "🫒" },
  { id: "cherry_tomatoes", nameHe: "עַגְבָנִיּוֹת שֶׁרִי", nameEn: "Cherry Tomatoes", price: 14, emoji: "🍅" },
  { id: "dark_choc",       nameHe: "שׁוֹקוֹלָד מָר",       nameEn: "Dark Chocolate",  price: 12, emoji: "🍫" },
];

// Budget challenge ₪50
export const CART_CHALLENGE_PRODUCTS: Product[] = [
  { id: "rye_bread",       nameHe: "לֶחֶם שִׁיפוֹן",       nameEn: "Rye Bread",       price: 18, emoji: "🍞" },
  { id: "greek_yogurt",    nameHe: "יוֹגוּרְט יְווָנִי",    nameEn: "Greek Yogurt",    price: 9,  emoji: "🥣" },
  { id: "dark_choc",       nameHe: "שׁוֹקוֹלָד מָר",        nameEn: "Dark Chocolate",  price: 12, emoji: "🍫" },
  { id: "bulgarian_cheese",nameHe: "גְּבִינָה בּוּלְגָרִית", nameEn: "Bulgarian Cheese",price: 26, emoji: "🧀" },
  { id: "cherry_tomatoes", nameHe: "עַגְבָנִיּוֹת שֶׁרִי",  nameEn: "Cherry Tomatoes", price: 14, emoji: "🍅" },
];

// 28-item supermarket for the Final Mission
export const SUPERMARKET_ALL_PRODUCTS: Product[] = [
  { id: "rye_bread",        nameHe: "לֶחֶם שִׁיפוֹן",          nameEn: "Rye Bread",          price: 18, emoji: "🍞" },
  { id: "greek_yogurt",     nameHe: "יוֹגוּרְט יְווָנִי",       nameEn: "Greek Yogurt",        price: 11, emoji: "🥣" },
  { id: "apples",           nameHe: "תַּפּוּחִים",              nameEn: "Apples",              price: 15, emoji: "🍎" },
  { id: "cherry_tomatoes",  nameHe: "עַגְבָנִיּוֹת שֶׁרִי",    nameEn: "Cherry Tomatoes",     price: 14, emoji: "🍅" },
  { id: "dark_choc",        nameHe: "שׁוֹקוֹלָד מָר",           nameEn: "Dark Chocolate",      price: 12, emoji: "🍫" },
  { id: "bulgarian_cheese", nameHe: "גְּבִינָה בּוּלְגָרִית",   nameEn: "Bulgarian Cheese",    price: 26, emoji: "🧀" },
  { id: "chicken",          nameHe: "חֲזֵה עוֹף",               nameEn: "Chicken Breast",      price: 47, emoji: "🍗" },
  { id: "eggs",             nameHe: "בֵּיצִים",                 nameEn: "Eggs",                price: 18, emoji: "🥚" },
  { id: "butter",           nameHe: "חֶמְאָה",                  nameEn: "Butter",              price: 22, emoji: "🧈" },
  { id: "labneh",           nameHe: "לַבָּנֶה",                 nameEn: "Labneh",              price: 14, emoji: "🫙" },
  { id: "orange_juice",     nameHe: "מִיץ תַּפּוּזִים",         nameEn: "Orange Juice",        price: 16, emoji: "🧃" },
  { id: "water",            nameHe: "מַיִם מִינֶרָלִי",         nameEn: "Mineral Water",       price: 6,  emoji: "💧" },
  { id: "coffee",           nameHe: "קָפֶה",                   nameEn: "Coffee",              price: 35, emoji: "☕" },
  { id: "matcha",           nameHe: "מָאצ'ה",                  nameEn: "Matcha",              price: 42, emoji: "🍵" },
  { id: "pasta",            nameHe: "פַּסְטָה",                 nameEn: "Pasta",               price: 11, emoji: "🍝" },
  { id: "quinoa",           nameHe: "קִינוֹאָה",                nameEn: "Quinoa",              price: 28, emoji: "🌾" },
  { id: "purple_onion",     nameHe: "בָּצָל סָגוֹל",            nameEn: "Purple Onion",        price: 5,  emoji: "🧅" },
  { id: "garlic",           nameHe: "שׁוּם",                   nameEn: "Garlic",              price: 7,  emoji: "🧄" },
  { id: "sweet_potato",     nameHe: "בָּטָטָה",                 nameEn: "Sweet Potato",        price: 9,  emoji: "🍠" },
  { id: "cucumber",         nameHe: "מְלַפְּפוֹן",              nameEn: "Cucumber",            price: 4,  emoji: "🥒" },
  { id: "tuna",             nameHe: "טוּנָה",                  nameEn: "Tuna",                price: 19, emoji: "🐟" },
  { id: "hummus",           nameHe: "חוּמוּס",                 nameEn: "Hummus",              price: 14, emoji: "🫙" },
  { id: "olive_oil",        nameHe: "שֶׁמֶן זַיִת",             nameEn: "Olive Oil",           price: 38, emoji: "🫒" },
  { id: "sea_salt",         nameHe: "מֶלַח יָם",                nameEn: "Sea Salt",            price: 8,  emoji: "🧂" },
  { id: "milk_choc",        nameHe: "שׁוֹקוֹלָד חָלָב",          nameEn: "Milk Chocolate",      price: 10, emoji: "🍫" },
  { id: "granola",          nameHe: "גְּרָנוֹלָה",              nameEn: "Granola",             price: 22, emoji: "🥣" },
  { id: "strawberry",       nameHe: "תּוּת שָׂדֶה",             nameEn: "Strawberries",        price: 22, emoji: "🍓" },
  { id: "avocado",          nameHe: "אֲבוֹקָדוֹ",              nameEn: "Avocado",             price: 14, emoji: "🥑" },
];

export const SUPERMARKET_REQUIRED: string[] = [
  "rye_bread",
  "greek_yogurt",
  "apples",
  "cherry_tomatoes",
  "dark_choc",
];
