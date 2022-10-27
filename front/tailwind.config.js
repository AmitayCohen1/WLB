/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {      
      boxShadow: {
      '3xl': '0 100px 60px -15px rgba(10, 10, 10, 10)',
    }, 
    fontFamily: { 
      'JockeyOne': ['Jockey One', 'sans-serif'],
      'Inter': ['Inter', 'sans-serif'],
      'Badge': ['Badge', 'porter_sans_blockblock'],
      'RedBadge': ['RedBadgeRoman', 'IowanOldSt'],
      'Roman': ['Roman', 'Roman'],
        }, 
    colors: { 
      'red': '#F35D45',
      'yellow': '#FEBE44',
      'gray': '#F1F1F1',
      'createdByColor': '#F0E6C5',
      'hoverRed': '#AF2B16',
      'badgeBG': '#1A1A1A'
    }
  },
  },
  plugins: [],
}






