import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bodybackground: "#ededed",
        maingreen: "#57722C",
      },
      fontFamily: {
        // Adding Nunito Sans and Cormorant Garamond to the Tailwind config
        nunito: ["var(--font-nunito)", "sans-serif"],
        cormorant: ["var(--font-cormorant)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
