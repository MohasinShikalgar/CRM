import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        foreground: "#090D1A",
        brand: {
          dark: "#FFFFFF",
          darkGray: "#F8FAFC",
          blue: "#0066FF",
          cyan: "#00A3FF",
          purple: "#7000FF",
          light: "#090D1A",
          muted: "#64748B",
        },
      },
      fontFamily: {
        heading: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out infinite 3s",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 15px rgba(0, 102, 255, 0.3)",
            borderColor: "rgba(0, 102, 255, 0.4)",
          },
          "50%": {
            boxShadow: "0 0 30px rgba(0, 163, 255, 0.7)",
            borderColor: "rgba(0, 163, 255, 0.8)",
          },
        },
      },
      boxShadow: {
        neon: "0 0 20px rgba(0, 102, 255, 0.6)",
        "neon-hover": "0 0 40px rgba(0, 163, 255, 0.9)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
    },
  },
  plugins: [],
};
export default config;
