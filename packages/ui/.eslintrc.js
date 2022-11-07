module.exports = {
  ...require('eslint-config-custom/eslint-web'),
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
};
