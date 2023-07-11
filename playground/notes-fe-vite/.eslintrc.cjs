module.exports = {
  env: {
    browser: true,
    es2020: true,
    'jest/globals': true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'react', 'jest'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'react/prop-types': 'off',
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': [
      'error', { 'before': true, 'after': true }
    ],
    'no-console': 'off',
    'react/react-in-jsx-scope': 'off'
  },
}
