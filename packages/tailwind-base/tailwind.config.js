/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const colors = require('./styles/themes/colorObject');
const plugin = require('tailwindcss/plugin');

const AX5 = {
  '.text-AX5-Large': {
    fontFamily: 'SF Pro',
    fontSize: '60px',
    fontWeight: 400,
    lineHeight: '70px',
  },
  '.text-AX5-Title1': {
    fontFamily: 'SF Pro',
    fontSize: '58px',
    fontWeight: 400,
    lineHeight: '68px',
  },
  '.text-AX5-Title2': {
    fontFamily: 'SF Pro',
    fontSize: '56px',
    fontWeight: 400,
    lineHeight: '66px',
  },
  '.text-AX5-Title3': {
    fontFamily: 'SF Pro',
    fontSize: '55px',
    fontWeight: 400,
    lineHeight: '65px',
  },
  '.text-AX5-Headline': {
    fontFamily: 'SF Pro',
    fontSize: '53px',
    fontWeight: 600,
    lineHeight: '62px',
  },
  '.text-AX5-Body': {
    fontFamily: 'SF Pro',
    fontSize: '53px',
    fontWeight: 400,
    lineHeight: '62px',
  },
  '.text-AX5-Callout': {
    fontFamily: 'SF Pro',
    fontSize: '51px',
    fontWeight: 400,
    lineHeight: '60px',
  },
  '.text-AX5-Subhead': {
    fontFamily: 'SF Pro',
    fontSize: '49px',
    fontWeight: 400,
    lineHeight: '58px',
  },
  '.text-AX5-Footnote': {
    fontFamily: 'SF Pro',
    fontSize: '44px',
    fontWeight: 400,
    lineHeight: '52px',
  },
  '.text-AX5-Caption1': {
    fontFamily: 'SF Pro',
    fontSize: '43px',
    fontWeight: 400,
    lineHeight: '51px',
  },
  '.text-AX5-Caption2': {
    fontFamily: 'SF Pro',
    fontSize: '40px',
    fontWeight: 400,
    lineHeight: '48px',
  },
};

const AX4 = {
  '.text-AX4-Large': {
    fontFamily: 'SF Pro',
    fontSize: '56px',
    fontWeight: 400,
    lineHeight: '66px',
  },
  '.text-AX4-Title1': {
    fontFamily: 'SF Pro',
    fontSize: '53px',
    fontWeight: 400,
    lineHeight: '62px',
  },
  '.text-AX4-Title2': {
    fontFamily: 'SF Pro',
    fontSize: '50px',
    fontWeight: 400,
    lineHeight: '59px',
  },
  '.text-AX4-Title3': {
    fontFamily: 'SF Pro',
    fontSize: '43px',
    fontWeight: 400,
    lineHeight: '51px',
  },
  '.text-AX4-Headline': {
    fontFamily: 'SF Pro',
    fontSize: '47px',
    fontWeight: 600,
    lineHeight: '56px',
  },
  '.text-AX4-Body': {
    fontFamily: 'SF Pro',
    fontSize: '47px',
    fontWeight: 400,
    lineHeight: '56px',
  },
  '.text-AX4-Callout': {
    fontFamily: 'SF Pro',
    fontSize: '44px',
    fontWeight: 400,
    lineHeight: '52px',
  },
  '.text-AX4-Subhead': {
    fontFamily: 'SF Pro',
    fontSize: '42px',
    fontWeight: 400,
    lineHeight: '50px',
  },
  '.text-AX4-Footnote': {
    fontFamily: 'SF Pro',
    fontSize: '38px',
    fontWeight: 400,
    lineHeight: '46px',
  },
  '.text-AX4-Caption1': {
    fontFamily: 'SF Pro',
    fontSize: '37px',
    fontWeight: 400,
    lineHeight: '44px',
  },
  '.text-AX4-Caption2': {
    fontFamily: 'SF Pro',
    fontSize: '34px',
    fontWeight: 400,
    lineHeight: '41px',
  },
};

const AX3 = {
  '.text-AX3-Large': {
    fontFamily: 'SF Pro',
    fontSize: '52px',
    fontWeight: 400,
    lineHeight: '61px',
  },
  '.text-AX3-Title1': {
    fontFamily: 'SF Pro',
    fontSize: '48px',
    fontWeight: 400,
    lineHeight: '57px',
  },
  '.text-AX3-Title2': {
    fontFamily: 'SF Pro',
    fontSize: '44px',
    fontWeight: 400,
    lineHeight: '52px',
  },
  '.text-AX3-Title3': {
    fontFamily: 'SF Pro',
    fontSize: '43px',
    fontWeight: 400,
    lineHeight: '51px',
  },
  '.text-AX3-Headline': {
    fontFamily: 'SF Pro',
    fontSize: '40px',
    fontWeight: 600,
    lineHeight: '48px',
  },
  '.text-AX3-Body': {
    fontFamily: 'SF Pro',
    fontSize: '40px',
    fontWeight: 400,
    lineHeight: '48px',
  },
  '.text-AX3-Callout': {
    fontFamily: 'SF Pro',
    fontSize: '38px',
    fontWeight: 400,
    lineHeight: '46px',
  },
  '.text-AX3-Subhead': {
    fontFamily: 'SF Pro',
    fontSize: '36px',
    fontWeight: 400,
    lineHeight: '43px',
  },
  '.text-AX3-Footnote': {
    fontFamily: 'SF Pro',
    fontSize: '33px',
    fontWeight: 400,
    lineHeight: '40px',
  },
  '.text-AX3-Caption1': {
    fontFamily: 'SF Pro',
    fontSize: '32px',
    fontWeight: 400,
    lineHeight: '39px',
  },
  '.text-AX3-Caption2': {
    fontFamily: 'SF Pro',
    fontSize: '29px',
    fontWeight: 400,
    lineHeight: '35px',
  },
};

const AX2 = {
  '.text-AX2-Large': {
    fontFamily: 'SF Pro',
    fontSize: '49px',
    fontWeight: 400,
    lineHeight: '57px',
  },
  '.text-AX2-Title1': {
    fontFamily: 'SF Pro',
    fontSize: '43px',
    fontWeight: 400,
    lineHeight: '51px',
  },
  '.text-AX2-Title2': {
    fontFamily: 'SF Pro',
    fontSize: '43px',
    fontWeight: 400,
    lineHeight: '51px',
  },
  '.text-AX2-Title3': {
    fontFamily: 'SF Pro',
    fontSize: '43px',
    fontWeight: 400,
    lineHeight: '51px',
  },
  '.text-AX2-Headline': {
    fontFamily: 'SF Pro',
    fontSize: '33px',
    fontWeight: 600,
    lineHeight: '40px',
  },
  '.text-AX2-Body': {
    fontFamily: 'SF Pro',
    fontSize: '33px',
    fontWeight: 400,
    lineHeight: '40px',
  },
  '.text-AX2-Callout': {
    fontFamily: 'SF Pro',
    fontSize: '32px',
    fontWeight: 400,
    lineHeight: '39px',
  },
  '.text-AX2-Subhead': {
    fontFamily: 'SF Pro',
    fontSize: '30px',
    fontWeight: 400,
    lineHeight: '37px',
  },
  '.text-AX2-Footnote': {
    fontFamily: 'SF Pro',
    fontSize: '28px',
    fontWeight: 400,
    lineHeight: '33px',
  },
  '.text-AX2-Caption1': {
    fontFamily: 'SF Pro',
    fontSize: '26px',
    fontWeight: 400,
    lineHeight: '32px',
  },
  '.text-AX2-Caption2': {
    fontFamily: 'SF Pro',
    fontSize: '24px',
    fontWeight: 400,
    lineHeight: '30px',
  },
};

const AX1 = {
  '.text-AX1-Large': {
    fontFamily: 'SF Pro',
    fontSize: '44px',
    fontWeight: 400,
    lineHeight: '52px',
  },
  '.text-AX1-Title1': {
    fontFamily: 'SF Pro',
    fontSize: '38px',
    fontWeight: 400,
    lineHeight: '46px',
  },
  '.text-AX1-Title2': {
    fontFamily: 'SF Pro',
    fontSize: '34px',
    fontWeight: 400,
    lineHeight: '41px',
  },
  '.text-AX1-Title3': {
    fontFamily: 'SF Pro',
    fontSize: '31px',
    fontWeight: 400,
    lineHeight: '38px',
  },
  '.text-AX1-Headline': {
    fontFamily: 'SF Pro',
    fontSize: '28px',
    fontWeight: 600,
    lineHeight: '34px',
  },
  '.text-AX1-Body': {
    fontFamily: 'SF Pro',
    fontSize: '28px',
    fontWeight: 400,
    lineHeight: '34px',
  },
  '.text-AX1-Callout': {
    fontFamily: 'SF Pro',
    fontSize: '26px',
    fontWeight: 400,
    lineHeight: '32px',
  },
  '.text-AX1-Subhead': {
    fontFamily: 'SF Pro',
    fontSize: '25px',
    fontWeight: 400,
    lineHeight: '31px',
  },
  '.text-AX1-Footnote': {
    fontFamily: 'SF Pro',
    fontSize: '23px',
    fontWeight: 400,
    lineHeight: '29px',
  },
  '.text-AX1-Caption1': {
    fontFamily: 'SF Pro',
    fontSize: '22px',
    fontWeight: 400,
    lineHeight: '28px',
  },
  '.text-AX1-Caption2': {
    fontFamily: 'SF Pro',
    fontSize: '20px',
    fontWeight: 400,
    lineHeight: '25px',
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
        ...AX5,
        ...AX4,
        ...AX3,
        ...AX2,
        ...AX1,
      });
    }),
    require('tailwind-scrollbar-hide'),
    require('tailwindcss-textshadow'),
    require('tailwindcss-animation-delay'),
  ],
};
