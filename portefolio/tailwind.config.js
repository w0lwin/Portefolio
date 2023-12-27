/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        'dark': '#1a202c',
        'dark-light': '#2d3748',
      },
    },
  },
  plugins: [],
}

