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
        purple: '#494b80',
        blue: '#1559ad',
      },
      backgroundImage: {
        'nav-gradient': 'linear-gradient(to bottom, #9095FB, #ffffff)',
        'dark-nav-gradient': 'linear-gradient(to bottom, #57a3ff, #ffffff)',
        'menu-gradient': 'linear-gradient(to bottom, #ffffff, #9095FB)',
        'dark-menu-gradient': 'linear-gradient(to bottom, #ffffff, #57a3ff)',
        'button-gradient':
          'linear-gradient(to bottom, #FFFFFF 5%, #9095FB 95%)',
        'dark-button-gradient':
          'linear-gradient(to bottom, #ffffff 5%, #57a3ff 95%)',
        'search-btn-hover':
          'linear-gradient(to bottom, #FFFFFF 5%, #747af7 95%)',
        'dark-search-btn-hover':
          'linear-gradient(to bottom, #ffffff 5%, #308cfc 95%)',
        'card-gradient': 'linear-gradient(to bottom, #9095FB, #ffffff)',
        'dark-card-gradient': 'linear-gradient(to bottom, #57a3ff, #ffffff)',
        'back-btn': 'linear-gradient(to bottom, #ffffff 5%, #94a3b8 95%)',
        'back-btn-hover': 'linear-gradient(to bottom, #ffffff 5%, #64748b 95%)',
        'favorite-btn': 'linear-gradient(to bottom, #ffffff 5%, #ed98fa 95%)',
        'favorite-btn-hover':
          'linear-gradient(to bottom, #ffffff 5%, #ec6eff 95%)',
        'favorite-btn-active': 'linear-gradient(to right, #E8A9F8, #F5C6F8)',
        'dark-favorite-btn-active':
          'linear-gradient(to right, #E8B9FF, #F5D6FF)',
        'overlay-gradient': 'linear-gradient(to bottom, #4141431a, #414143cc)',
        'dark-overlay-gradient':
          'linear-gradient(to bottom, #1e1a3c1a, #1e1a3ccc)',
        'filter-btn-hover': 'linear-gradient(to right, #80AFD1, #BCA9CF)',
        'dark-filter-btn-hover': 'linear-gradient(to right, #95BFE1, #C8B9E2)',
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
