/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1360px',
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    keyframes: {
      'image-glow': {
        '0%': {
          opacity: 0,
          'animation-timing-function': 'cubic-bezier(0.74,0.25,0.76,1)',
        },
        '10%': {
          opacity: 1,
          'animation-timing-function': 'cubic-bezier(0.12,0.01,0.08,0.99)',
        },
        '100%': {
          opacity: 0.2,
        },
      },
      animation: {
        'image-glow': 'image-glow 4100ms 600ms ease-out forwards',
      },
    },
  },

  plugins: [],
};
