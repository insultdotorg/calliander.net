const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        accent: '#44403c',
        background: '#fde047',
        copy: '#0c0a09',
      },
      fontFamily: {
        sans: ['"EB Garamond"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
