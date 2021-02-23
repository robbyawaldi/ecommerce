const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        indigo: colors.indigo,
        teal: colors.teal,
        blueocean: '#12A7D6'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
