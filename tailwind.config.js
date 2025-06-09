import plugin from 'tailwindcss/plugin';
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './src/css/**/*.css'],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"pixel"', 'sans-serif'],
        navbar: ['"Press Start 2P"', 'cursive'],
        body: ['Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        'navbar-start': '#60A5FA',
        'navbar-end': '#C084FC',
        'button-start': '#518BD1',
        'button-end': '#A171D2',
        'card-start': '#9095FB',
        'card-end': '#B489FC',
        'overlay-start': '#4141431a',
        'overlay-end': '#414143cc',
        'shadow-dark': '#4612a1',
        purple: '#494b80',
        blue: '#1559ad',
      },
      backgroundImage: {
        // Purple 主題的背景漸層
        'theme-purple-nav-gradient':
          'linear-gradient(to bottom, #9095FB, #ffffff)',
        'theme-purple-menu-gradient':
          'linear-gradient(to bottom, #ffffff, #9095FB)',
        'theme-purple-button-gradient':
          'linear-gradient(to bottom, #FFFFFF 5%, #9095FB 95%)',
        'theme-purple-search-btn-hover':
          'linear-gradient(to bottom, #FFFFFF 5%, #747af7 95%)',
        'theme-purple-card-gradient':
          'linear-gradient(to bottom, #9095FB, #ffffff)',
        'theme-purple-overlay-gradient':
          'linear-gradient(to bottom, #4141431a, #414143cc)',

        // Blue 主題的背景漸層
        'theme-blue-nav-gradient':
          'linear-gradient(to bottom, #57a3ff, #ffffff)',
        'theme-blue-menu-gradient':
          'linear-gradient(to bottom, #ffffff, #57a3ff)',
        'theme-blue-button-gradient':
          'linear-gradient(to bottom, #ffffff 5%, #57a3ff 95%)',
        'theme-blue-search-btn-hover':
          'linear-gradient(to bottom, #ffffff 5%, #308cfc 95%)',
        'theme-blue-card-gradient':
          'linear-gradient(to bottom, #57a3ff, #ffffff)',
        'theme-blue-overlay-gradient':
          'linear-gradient(to bottom, #1e1a3c1a, #1e1a3ccc)',

        // 其他共用背景
        'back-btn': 'linear-gradient(to bottom, #ffffff 5%, #94a3b8 95%)',
        'back-btn-hover': 'linear-gradient(to bottom, #ffffff 5%, #64748b 95%)',
        'favorite-btn': 'linear-gradient(to bottom, #ffffff 5%, #ed98fa 95%)',
        'favorite-btn-hover':
          'linear-gradient(to bottom, #ffffff 5%, #ec6eff 95%)',
        'favorite-btn-active': 'linear-gradient(to right, #E8A9F8, #F5C6F8)',
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
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('theme-blue', '.theme-blue &');
      addVariant('theme-purple', '.theme-purple &');
    }),
  ],
};
