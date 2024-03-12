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
    screens: {
      'sm': '640px',
      'md': '768px',
      'custom-md': '940px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },

    extend: {
      fontFamily: {
        pacifico: ["Pacifico", "sans-serif"],
        fjalla: ["Fjalla One", "sans-serif"],
      }
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}

