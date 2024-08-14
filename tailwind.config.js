const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
        serif: ['"Libre Baskerville"', ...defaultTheme.fontFamily.serif],
      },
      height: {
        icon: '0.85rem',
      },
      width: {
        icon: '0.85rem',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
