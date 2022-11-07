/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const colors = require('./colorObject.js');
const plugin = require('tailwindcss/plugin');

const createSize = number => {
  const obj = new Object();
  for (var i = 1; i <= number; i++) {
    obj[i] = `${i}px`;
  }
  return obj;
};

module.exports = {
  mode: 'jit',
  content: ['./*.{js,ts,jsx,tsx}'],
  jit: true,
  theme: {
    colors,
    fontSize: {
      A1: ['22px'],
      A2: ['18px'],
      A3: ['16px'],
      A4: ['14px'],
      A5: ['12px'],
      A6: ['11px'],
      A7: ['10px'],
    },
    fontWeight: {
      extraLight: '100',
      thin: '200',
      light: '300',
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extraBold: '800',
      title: '900',
    },
    textShadow: {
      default: '0px 2px 3px rgba(0, 0, 0, 0.3)',
    },
    boxShadow: {
      1: '0px 4px 8px rgba(0, 0, 0, 0.08)',
      2: '0px 2px 6px rgba(0, 0, 0, 0.16)',
      3: '0px 2px 6px rgba(0, 0, 0, 0.4)',
      4: '0px 2px 6px rgba(0, 0, 0, 0.08)',
      5: '0px 0px 20px rgba(0, 0, 0, 0.08)',
      6: '0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d',
    },
    extend: {
      keyframes: {
        'loading-ani': {
          '0%': {
            backgroundColor: '#FDC027',
          },
          '40%': {
            backgroundColor: '#FED368',
          },
          '80%': {
            backgroundColor: '#FEECBE',
          },
        },
      },
      borderRadius: {
        xs: '4px',
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        xxl: '100px',
      },
      spacing: createSize(70),
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
        '.text-T1': {
          fontFamily: 'TmoneyRoundWindExtraBold',
          fontSize: '28px',
          fontWeight: 800,
        },
        '.text-T2': {
          fontFamily: 'TmoneyRoundWindExtraBold',
          fontSize: '22px',
          fontWeight: 800,
        },
        '.text-T3': {
          fontFamily: 'TmoneyRoundWindExtraBold',
          fontSize: '18px',
          fontWeight: 800,
        },
        '.text-T4': {
          fontFamily: 'TmoneyRoundWindExtraBold',
          fontSize: '16px',
          fontWeight: 800,
        },
        '.text-T5': {
          fontFamily: 'TmoneyRoundWindExtraBold',
          fontSize: '14px',
          fontWeight: 800,
        },
        '.text-T6': {
          fontFamily: 'TmoneyRoundWindExtraBold',
          fontSize: '13px',
          fontWeight: 800,
        },
        '.text-T7': {
          fontFamily: 'TmoneyRoundWindExtraBold',
          fontSize: '12px',
          fontWeight: 800,
        },
        '.text-T8': {
          fontFamily: 'TmoneyRoundWindExtraBold',
          fontSize: '11px',
          fontWeight: 800,
        },
        '.text-T9': {
          fontFamily: 'TmoneyRoundWindExtraBold',
          fontSize: '10px',
          fontWeight: 800,
        },
      });
    }),
    require('tailwind-scrollbar-hide'),
    require('tailwindcss-textshadow'),
    require('tailwindcss-animation-delay'),
  ],
};
