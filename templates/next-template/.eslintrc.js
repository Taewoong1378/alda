module.exports = {
  ...require('eslint-config-custom/eslint'),
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
};
