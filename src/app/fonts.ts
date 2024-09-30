import { Nunito_Sans, Cormorant_Garamond } from "next/font/google";

export const nunitoSans = Nunito_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-lora",
  weight: ["200", "400", "700"],
});

export const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  variable: "--font-carlito",
  weight: ["300", "400", "700"],
});
