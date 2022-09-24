module.exports = {
  content: ['./client/**/*.{js,jsx}', './client/**/**/*.{js,jsx}', '/index.html'],
  theme: {
      extend: {
          colors: {
              primary: '#1B73E8',
          },
      },
  },
  plugins: [require('@tailwindcss/line-clamp'),require('tailwind-scrollbar')({ nocompatible: true }),],
};