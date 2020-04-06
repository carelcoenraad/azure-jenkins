module.exports = {
  env: {
    node: true
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2019
  },
  root: true,
  rules: {
    'sort-keys': ['error', 'asc', { caseSensitive: false }]
  }
};
