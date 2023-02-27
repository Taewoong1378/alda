/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const colors = require('./styles/themes/colorObject');
const plugin = require('tailwindcss/plugin');

const Heading = {
  '.text-H1': {
    fontFamily: 'TmoneyRoundWindExtraBold',
    fontSize: '28px',
    fontWeight: 800,
    lineHeight: '40px',
  },
  '.text-H2': {
    fontFamily: 'TmoneyRoundWindExtraBold',
    fontSize: '24px',
    fontWeight: 800,
    lineHeight: '38px',
  },
  '.text-H3': {
    fontFamily: 'TmoneyRoundWindExtraBold',
    fontSize: '22px',
    fontWeight: 800,
    lineHeight: '32px',
  },
  '.text-H4': {
    fontFamily: 'TmoneyRoundWindExtraBold',
    fontSize: '20px',
    fontWeight: 800,
    lineHeight: '30px',
  },
};

const Title = {
  '.text-T1': {
    fontFamily: 'Pretendard Variable',
    fontSize: '20px',
    fontWeight: 600,
    lineHeight: '30px',
  },
  '.text-T2': {
    fontFamily: 'Pretendard Variable',
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '30px',
  },
  '.text-T3': {
    fontFamily: 'Pretendard Variable',
    fontSize: '16px',
    fontWeight: 800,
    lineHeight: '26px',
  },
  '.text-T4': {
    fontFamily: 'Pretendard Variable',
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: '20px',
  },
  '.text-T5': {
    fontFamily: 'Pretendard Variable',
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '20px',
  },
};

const Body = {
  '.text-B1': {
    fontFamily: 'Pretendard Variable',
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '28px',
  },
  '.text-B2': {
    fontFamily: 'Pretendard Variable',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '28px',
  },
  '.text-B3': {
    fontFamily: 'Pretendard Variable',
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '20px',
  },
  '.text-B4': {
    fontFamily: 'Pretendard Variable',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px',
  },
  '.text-B5': {
    fontFamily: 'Pretendard Variable',
    fontSize: '13px',
    fontWeight: 500,
    lineHeight: '19px',
  },
};

const Detail = {
  '.text-D1': {
    fontFamily: 'Pretendard Variable',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '24px',
  },
  '.text-D2': {
    fontFamily: 'Pretendard Variable',
    fontSize: '12px',
    fontWeight: 600,
    lineHeight: '18px',
  },
  '.text-D3': {
    fontFamily: 'Pretendard Variable',
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '18px',
  },
  '.text-D4': {
    fontFamily: 'Pretendard Variable',
    fontSize: '11px',
    fontWeight: 500,
    lineHeight: '16px',
  },
};

const Button = {
  '.text-Bt1': {
    fontFamily: 'TmoneyRoundWindExtraBold',
    fontSize: '16px',
    fontWeight: 800,
    lineHeight: '26px',
  },
  '.text-Bt2': {
    fontFamily: 'TmoneyRoundWindExtraBold',
    fontSize: '14px',
    fontWeight: 800,
    lineHeight: '24px',
  },
  '.text-Bt3': {
    fontFamily: 'TmoneyRoundWindExtraBold',
    fontSize: '12px',
    fontWeight: 800,
    lineHeight: '20px',
  },
};

const Link = {
  '.text-L1': {
    fontFamily: 'Pretendard Variable',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '24px',
  },
  '.text-L2': {
    fontFamily: 'Pretendard Variable',
    fontSize: '11px',
    fontWeight: 400,
    lineHeight: '16px',
  },
};

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
      Tmoney: ['TmoneyRoundWindExtraBold'],
      Pretendard: ['Pretendard Variable'],
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
        ...Heading,
        ...Title,
        ...Body,
        ...Detail,
        ...Button,
        ...Link,
      });
    }),
    require('tailwind-scrollbar-hide'),
    require('tailwindcss-textshadow'),
    require('tailwindcss-animation-delay'),
  ],
};
