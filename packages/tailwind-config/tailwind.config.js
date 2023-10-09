/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", ".dark-theme"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}",
    `src/**/*.{js,ts,jsx,tsx}`,
    "../../packages/core/src/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ["var(--font-title)", "system-ui", "sans-serif"],
        default: ["var(--font-default)", "system-ui", "sans-serif"],
      },
      colors: {
        white: "var(--inke-white)",
        stone: {
          50: "var(--inke-stone-50)",
          100: "var(--inke-stone-100)",
          200: "var(--inke-stone-200)",
          300: "var(--inke-stone-300)",
          400: "var(--inke-stone-400)",
          500: "var(--inke-stone-500)",
          600: "var(--inke-stone-600)",
          700: "var(--inke-stone-700)",
          800: "var(--inke-stone-800)",
          900: "var(--inke-stone-900)",
        },
      },
    },
  },
  plugins: [
    // Tailwind plugins
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
  ],
};
