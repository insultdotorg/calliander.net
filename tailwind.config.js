const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"EB Garamond"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
