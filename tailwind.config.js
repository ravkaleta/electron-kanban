/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
      },
      animation: {
        gradient: 'gradient 4s linear infinite',
      },
      keyframes: {
        gradient: {
          to: { 'background-position': '200% center' },
        },
      },
    },
  },
  plugins: [],
}
