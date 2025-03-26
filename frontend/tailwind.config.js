/**  @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        glory: ['Glory', 'sans-serif'],
        caveat: ['Caveat', 'sans-serif'],
        raleway: ["Raleway", "sans-serif"],
      },
      colors: {
        primary: '#ff0000',
        textPrm: '#4A4A4A',
        secondary: '#fcbd40',
        navBG: '#89fc7e',
        border: '#f8714f',
        background: '#FFF3DA',
        text: '#57C5B6',
        text1: '#161615',
        hover: '#5271FF',
        lightError: '#EA6C61',
        lightSuccess: '#09EB22',
        swiperBG: '#FFA987',
      },
      screens: {
        xs: '400px',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        heroBg: "url('/assets/homeHero.jpeg')",
      },
    },
  },
  plugins: [],
}
