/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  future: {
    hoverOnlyWhenSupported: true,
  },
  
  theme: {
    extend: {
      fontFamily: {
        pacifico: ["Pacifico", "sans-serif"],
        fjalla: ["Fjalla One", "sans-serif"],
      }
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}

