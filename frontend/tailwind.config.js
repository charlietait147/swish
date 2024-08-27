/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ 
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
   ],
  theme: {
    extend: {
      backgroundImage: {
        'not-found': "url('/images/spilt-coffee-beans.jpg')",
      },
      fontFamily: {
        body: ['Raleway, sans-serif'],
        header: ['Dancing Script, sans-serif'],
      },
      height: {
        '108': '27rem', 
        '120': '30rem', 
        '132': '33rem', 
      },
    },
    screens: {
      'xs': '480px', 
      'sm': '640px',  
      'md': '768px',  
      'lg': '1024px', 
      'xl': '1280px', 
    },
  },
  plugins: [],
}

