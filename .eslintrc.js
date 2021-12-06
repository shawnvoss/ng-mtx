/*
👋 Hi!

Getting Started - Linting your TypeScript Codebase
https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md

Happy linting! 💖
*/
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module'
  },
  plugins: [
    '@angular-eslint/eslint-plugin',
    'eslint-plugin-import',
    '@angular-eslint/eslint-plugin-template',
    'eslint-plugin-jasmine',
    'eslint-plugin-jsdoc',
    'eslint-plugin-prettier',
    'eslint-plugin-rxjs',
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jasmine/recommended',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': 'error',
    'rxjs/no-async-subscribe': 'error',
    'rxjs/no-create': 'error',
    'rxjs/no-ignored-notifier': 'error',
    'rxjs/no-ignored-observable': 'error',
    'rxjs/no-ignored-replay-buffer': 'error',
    'rxjs/no-ignored-takewhile-value': 'error',
    'rxjs/no-implicit-any-catch': 'error',
    'rxjs/no-index': 'error',
    'rxjs/no-internal': 'error',
    'rxjs/no-nested-subscribe': 'error',
    'rxjs/no-redundant-notify': 'error',
    'rxjs/no-sharereplay': 'error',
    'rxjs/no-subject-unsubscribe': 'error',
    'rxjs/no-unbound-methods': 'error',
    'rxjs/no-unsafe-subject-next': 'error',
    'rxjs/no-unsafe-takeuntil': 'error',
    'rxjs/throw-error': 'error'
  }
};
