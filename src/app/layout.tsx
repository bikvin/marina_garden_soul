import type { Metadata } from "next";
import { nunitoSans, cormorantGaramond } from "@/app/fonts";
import "./globals.css";

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
        className={`${nunitoSans.className} ${cormorantGaramond.className} font-nunito bg-bodybackground overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
