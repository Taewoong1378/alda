module.exports = {
  ...require('eslint-config-custom/eslint-admin'),
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
};
