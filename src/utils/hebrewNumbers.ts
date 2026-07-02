// Lookup table for Hebrew number words (1–120) with full nikud, masculine form for prices/shekels
const HEBREW_UNITS: Record<number, string> = {
  1: "אֶחָד",
  2: "שְׁנַיִם",
  3: "שְׁלוֹשָׁה",
  4: "אַרְבָּעָה",
  5: "חֲמִשָּׁה",
  6: "שִׁשָּׁה",
  7: "שִׁבְעָה",
  8: "שְׁמוֹנָה",
  9: "תִּשְׁעָה",
  10: "עֲשָׂרָה",
};

const HEBREW_TEENS: Record<number, string> = {
  11: "אַחַד עָשָׂר",
  12: "שְׁנֵים עָשָׂר",
  13: "שְׁלוֹשָׁה עָשָׂר",
  14: "אַרְבָּעָה עָשָׂר",
  15: "חֲמִשָּׁה עָשָׂר",
  16: "שִׁשָּׁה עָשָׂר",
  17: "שִׁבְעָה עָשָׂר",
  18: "שְׁמוֹנָה עָשָׂר",
  19: "תִּשְׁעָה עָשָׂר",
};

const HEBREW_TENS: Record<number, string> = {
  20: "עֶשְׂרִים",
  30: "שְׁלוֹשִׁים",
  40: "אַרְבָּעִים",
  50: "חֲמִשִּׁים",
  60: "שִׁשִּׁים",
  70: "שִׁבְעִים",
  80: "שְׁמוֹנִים",
  90: "תִּשְׁעִים",
  100: "מֵאָה",
};

export function toHebrewWord(n: number): string {
  if (n <= 0) return "אֶפֶס";
  if (n <= 10) return HEBREW_UNITS[n] ?? String(n);
  if (n <= 19) return HEBREW_TEENS[n] ?? String(n);
  if (n <= 100) {
    const tens = Math.floor(n / 10) * 10;
    const units = n % 10;
    if (units === 0) return HEBREW_TENS[tens] ?? String(n);
    return `${HEBREW_TENS[tens]} וְ${HEBREW_UNITS[units]}`;
  }
  if (n === 100) return "מֵאָה";
  if (n <= 120) {
    const remainder = n - 100;
    if (remainder === 0) return "מֵאָה";
    if (remainder <= 10) return `מֵאָה וְ${HEBREW_UNITS[remainder]}`;
    if (remainder <= 19) return `מֵאָה וְ${HEBREW_TEENS[remainder]}`;
    const tens = Math.floor(remainder / 10) * 10;
    const units = remainder % 10;
    if (units === 0) return `מֵאָה וְ${HEBREW_TENS[tens]}`;
    return `מֵאָה וְ${HEBREW_TENS[tens]} וְ${HEBREW_UNITS[units]}`;
  }
  return String(n);
}

export function toHebrewPrice(n: number): string {
  return `${toHebrewWord(n)} שְׁקָלִים`;
}

export function toHebrewChange(n: number): string {
  return `עוֹדֵף: ${toHebrewWord(n)} שְׁקָלִים`;
}
