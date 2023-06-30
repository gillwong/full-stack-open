module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_' },
    ],
    'consistent-return': 'off',
    'no-underscore-dangle': 'warn',
    'no-param-reassign': 'warn',
  },
};
