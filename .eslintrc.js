module.exports = {
  env: {
    es2017: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  root: true,
  rules: {
    'sort-keys': ['error', 'asc', { caseSensitive: false }]
  }
};
