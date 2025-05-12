/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './src/css/**/*.css'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'navbar-start': '#60A5FA',
        'navbar-end': '#C084FC',
        'button-start': '#518BD1',
        'button-end': '#A171D2',
        'card-start': '#9095FB',
        'card-end': '#B489FC',
        light: '#FFF2F2',
        muted: '#F0E7FF',
        hover: '#FCA5F1',
        'overlay-start': '#4141431a',
        'overlay-end': '#414143cc',
        'shadow-dark': '#4612a1',
        soft: '#F8D1FF',
        'dark-bg': '#1E1A3C', // 深色模式背景
        'dark-navbar-start': '#7BB5FF', // 深色模式漸層起始
        'dark-navbar-end': '#D4A5FF', // 深色模式漸層結束
      },
      backgroundImage: {
        'navbar-gradient': 'linear-gradient(135deg, #60A5FA, #C084FC)',
        'dark-navbar-gradient': 'linear-gradient(135deg, #7BB5FF, #D4A5FF)', // 深色模式漸層
        'button-gradient': 'linear-gradient(to right, #518BD1, #A171D2)',
        'card-gradient': 'linear-gradient(to bottom right, #9095FB, #B489FC)',
        'dark-card-gradient':
          'linear-gradient(to bottom right, #A5B0FF, #C8A5FF)',
        'back-btn': 'linear-gradient(to right, #60A5FA, #9095FB)',
        'back-btn-hover': 'linear-gradient(to right, #9095FB, #A88DFC)',
        'favorite-btn': 'linear-gradient(to right, #B489FC, #C084FC)',
        'favorite-btn-hover': 'linear-gradient(to right, #C084FC, #E8A9F8)',
        'favorite-btn-active': 'linear-gradient(to right, #E8A9F8, #F5C6F8)',
        'search-btn-hover': 'linear-gradient(to right, #8085F4, #BDAAF6)',
        'overlay-gradient': 'linear-gradient(to bottom, #4141431a, #414143cc)',
        'filter-btn-hover': 'linear-gradient(to right, #80AFD1, #BCA9CF)',
      },
      fontFamily: {
        navbar: ['Georgia', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
        body: ['Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      animation: {
        pulse: 'pulse 1.5s infinite',
        fadeIn: 'fadeIn 0.3s ease-out forwards',
        blink: 'blink 1s infinite alternate',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.6 },
        },
        fadeIn: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        blink: {
          from: { opacity: 0.6 },
          to: { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
