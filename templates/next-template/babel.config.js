module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['next/babel', '@babel/preset-env', '@babel/preset-typescript'],
    plugins: [
      '@babel/plugin-transform-runtime',
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@components': './components',
            '@templates': './templates',
            '@constants': './constants',
            '@config': './config',
            '@assets': './assets',
            '@hooks': './hooks',
            '@styles': './styles',
            '@types': './types',
            '@themes': './themes',
            '@util': './util',
            '@pages': './pages',
            '@recoilState': './recoilState',
            '@api': './api',
          },
        },
      ],
    ],
  };
};
