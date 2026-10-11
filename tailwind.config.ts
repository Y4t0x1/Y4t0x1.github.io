import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#090A0C",
          900: "#0C0E11",
          850: "#101318",
          800: "#14181E",
          700: "#1C2129",
          600: "#282F3A",
        },
        signal: {
          300: "#F5C984",
          400: "#F0B35A",
          500: "#E8A33D",
          600: "#CF8A27",
          700: "#A66B1B",
        },
        accent: {
          DEFAULT: "#E8A33D",
          bright: "#F0B35A",
          dim: "#CF8A27",
          wash: "rgba(232, 163, 61, 0.12)",
        },
      },
      fontFamily: {
        sans: ["'Inter Variable'", "Inter", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono Variable'", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      maxWidth: {
        shell: "96rem",
      },
      letterSpacing: {
        label: "0.18em",
      },
    },
  },
  plugins: [],
};

export default config;
