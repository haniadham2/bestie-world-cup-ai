import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Soft, playful pastel palette
        cream: "#FFF9F4",
        bubblegum: "#FF9EC4",
        peach: "#FFC9A3",
        sky: "#A8D8FF",
        mint: "#B8F2D8",
        lavender: "#D6C7FF",
        sunny: "#FFE08A",
        ink: "#3A3258",
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 12px 32px -8px rgba(120, 90, 160, 0.25)",
        glow: "0 0 0 6px rgba(255, 255, 255, 0.6)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
