import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: "#06070b", 2: "#0d0e15", 3: "#14151f" },
        surface: { DEFAULT: "#1a1b28", 2: "#212232", 3: "#2a2b3e" },
        border: { DEFAULT: "#252640", 2: "#32335a" },
        txt: { DEFAULT: "#eaebf2", 2: "#9698b0", 3: "#5e5f7a" },
        accent: { DEFAULT: "#6366f1", light: "#818cf8", glow: "rgba(99,102,241,0.12)" },
        emerald: "#10b981",
        danger: "#ef4444",
        amber: "#f59e0b",
      },
      fontFamily: {
        display: ['"Instrument Serif"', "Georgia", "serif"],
        body: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease forwards",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "slide-in": "slideIn 0.6s ease forwards",
        "score-fill": "scoreFill 1.5s ease forwards",
        "float": "float 6s ease-in-out infinite",
        "draw-line": "drawLine 1.5s ease forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scoreFill: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        drawLine: {
          "0%": { strokeDashoffset: "500" },
          "100%": { strokeDashoffset: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
