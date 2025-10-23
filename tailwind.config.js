/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'boska': ['Boska', 'serif'],
        'switzer': ['Switzer', 'sans-serif'],
        'cinzel': ['Cinzel', 'serif'],
        'syncopate': ['Syncopate', 'sans-serif'],
        'bicylette': ['Bicylette', 'sans-serif'],
      },
      animation: {
        'scroll': 'scroll 20s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
}
