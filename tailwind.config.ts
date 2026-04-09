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
        background: "#FAFAFA",
        foreground: "#171717",
        primary: "#4F46E5",
        "primary-dark": "#4338CA",
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
