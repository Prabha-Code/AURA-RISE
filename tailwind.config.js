/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-ember": "var(--color-primary)",
        "brand-gold": "var(--color-secondary)",
        "brand-forest": "var(--color-bg-dark)",
        "brand-earth": "var(--color-text-muted)",
        "brand-cream": "var(--color-bg)",
        "brand-sage": "var(--color-accent)",
        "brand-charcoal": "var(--color-text)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

module.exports = config;
