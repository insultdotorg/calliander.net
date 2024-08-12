const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        amaranth: '#a12657',
        antiflash: '#f1f1f1',
        battleship: '#c1c7cb',
        cadet: '#afb1b6',
        caribbean: '#06616f',
        eerie: '#242424',
        feldgrau: '#475c5c',
        moss: '#286317',
      },
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
        serif: ['"Libre Baskerville"', ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
