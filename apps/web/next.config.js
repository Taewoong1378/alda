/* eslint-disable @typescript-eslint/no-var-requires */
const withTM = require('next-transpile-modules')(['ui']);
const path = require('path');

const nextConfig = {
  compress: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    // prependData: `@import "styles/_variables.scss";`,
  },
  // images: {
  //   domains: ['firebasestorage.googleapis.com'],
  // },
  i18n: {
    locales: ['ko'],
    defaultLocale: 'ko',
  },
};

module.exports = withTM({
  webpack(config, { webpack }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    const prod = process.env.NODE_ENV === 'production';
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval',
      plugins: [
        ...config.plugins,
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
      ],
    };
  },
  ...nextConfig,
});
