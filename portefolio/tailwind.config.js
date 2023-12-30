/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        'dark': '#0E0409',
        'dark-light': '#f4f1f8',
      },
    },
  },
  plugins: [],
}

