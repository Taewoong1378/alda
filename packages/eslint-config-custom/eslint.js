module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    requireConfigFile: false,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'import'],
  rules: {
    'react/no-unescaped-entities': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-undef': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-dupe-keys': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
    'no-irregular-whitespace': 'off',
    'react/display-name': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'react/prop-types': 'warn',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react-hooks/rules-of-hooks': 'warn',
    'no-useless-escape': 'off',
    'no-empty-pattern': 'off',
    'react/no-unknown-property': [
      2,
      {
        ignore: ['jsx'],
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
