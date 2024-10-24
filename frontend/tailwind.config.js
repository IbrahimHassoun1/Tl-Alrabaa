/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Include JSX and TSX files
  ],
  theme: {
    extend: {
      minWidth: {
        '1/2': '50%',
      }
    },
  },
  plugins: [],
}

