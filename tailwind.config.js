/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'primary': '#00B894',
        'primary-accent': '#afffe884',
        'secondary': '#002f5f',
        'secondary-accent': '#21588e4a',
      },
    },
  },
  plugins: [],
}

