import type { Metadata } from "next";
import "./globals.css";
import { Nunito_Sans, Cormorant_Garamond } from "next/font/google";

const nunitoSans = Nunito_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-nunito",
  weight: ["200", "400", "700"],
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  variable: "--font-cormorant",
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Ландшафтный дизайнер Марина Шестакова",
  description: "Ландшафтный дизайнер Марина Шестакова",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body
        className={`${nunitoSans.variable} ${cormorantGaramond.variable} font-nunito bg-bodybackground overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
