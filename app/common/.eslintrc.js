module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['tsconfig.json']
  },
  plugins: [
    '@typescript-eslint',
  ],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'react/jsx-filename-extension': "off",
    'no-console': "off",
    'import/prefer-default-export': "off",
  },
};
