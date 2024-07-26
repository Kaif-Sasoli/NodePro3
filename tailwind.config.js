/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.{html,ejs,js}',
             './public/**/*.{html,ejs,js}'],
  theme: {
    extend: {
      screens: {
        'xs' : '385px', // Custom Breakout
      },
    },
  },
  plugins: [],
}

