import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        pine: "#1f2a25",
        amberwood: "#c79f68",
        mist: "#f5f1e8",
        stone: "#6c6257"
      },
      boxShadow: {
        soft: "0 10px 35px rgba(18, 27, 24, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
