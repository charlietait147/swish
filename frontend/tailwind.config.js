/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ 
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
   ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Raleway, sans-serif'],
        header: ['Dancing Script, sans-serif'],
      },
    },
  },
  plugins: [],
}

