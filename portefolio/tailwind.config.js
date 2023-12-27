/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        'dark': '#000000',
        'dark-light': '#ffffff',
      },
    },
  },
  plugins: [],
}

