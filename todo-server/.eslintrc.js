module.exports = {
  extends: ['airbnb-base', 'eslint-config-prettier'],
  parser: '@babel/eslint-parser',
  rules: {
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    camelcase: 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'no-use-before-define': 'off',
    'import/prefer-default-export': 'off',
    'no-restricted-syntax': 'off',
    'import/newline-after-import': 'warn',
    'no-useless-catch': 'off',
    'no-await-in-loop': 'warn',
  },
};
