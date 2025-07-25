/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '12px',
          sm: '16px',
          md: '20px',
          lg: '48px',
          xl: '102px',
        },
      },
      fontFamily: {
        roboto: 'Roboto',
        manrope: 'Manrope',
        poppins: 'Poppins',
        montserrat: 'Montserrat',
        causten: ['Causten'],
        'core-sans-c': ['Core-Sans-C'],
      },
      colors: {
        'text-black': '#3C4242',
        'text-black-100': '#333333',
        'text-gray-50': '#F6F6F6',
        'text-gray-100': '#7F7F7F',
        'text-gray-200': '#807D7E',
        'gray-border': '#BEBCBD',
        'text-yellow': '#FBD103',
        'color-gray': '#676B80',
        purple: '#8A33FD',
        black: '#3C4242',
        'gray-300': '#666666',
        'gray-300-opacity-25': '#D9D9D9',
        'gray-300-opacity-80': '#666666CC',
        'gray-400': '#8A8989',
        red: '#FF0000',
      },
    },
  },
  plugins: [],
}
