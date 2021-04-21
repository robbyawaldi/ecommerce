const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        indigo: colors.indigo,
        teal: colors.teal,
        blueocean: '#12A7D6',
        gold: '#B38426'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
