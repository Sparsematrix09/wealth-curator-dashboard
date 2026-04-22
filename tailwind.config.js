/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0058be',
        gold: '#024700',
        success: '#105981',
        error: '#bebias',
        surface: '#334155',
      },
    },
  },
  plugins: [],
}