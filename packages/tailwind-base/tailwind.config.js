/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const colors = require('./styles/themes/colorObject');
const plugin = require('tailwindcss/plugin');
const text = require('./components/text');
const reusable = require('./components/reusable');

const createSize = number => {
  const obj = new Object();
  for (var i = 1; i <= number; i++) {
    obj[i] = `${i}px`;
  }
  return obj;
};

module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './templates/**/*.{js,ts,jsx,tsx}',
    './index.html',
  ],
  jit: true,
  theme: {
    keyframes: {
      'loading-ani': {
        '0%': {
          backgroundColor: '#2B2929',
        },
        '40%': {
          backgroundColor: '#6B6B6B',
        },
        '80%': {
          backgroundColor: '#C0C0C0',
        },
      },
    },
    colors,
    fontFamily: {
      SFPro: ['SF-Pro'],
    },
    fontWeight: {
      regular: '400',
      semibold: '600',
      bold: '700',
      extraBold: '800',
    },
    extend: {
      borderRadius: {
        xs: '4px',
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        xxl: '100px',
      },
      spacing: createSize(100),
      transitionProperty: {
        position: 'top, left, right, bottom',
      },
    },
    borderWidth: createSize(10),
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.x-scroll-touchable': {
          '-webkit-transform': 'translateZ(0)',
        },
        ...text.AX4,
        ...text.AX1,
        ...reusable,
      });
    }),
    require('tailwind-scrollbar-hide'),
    require('tailwindcss-textshadow'),
    require('tailwindcss-animation-delay'),
  ],
};
