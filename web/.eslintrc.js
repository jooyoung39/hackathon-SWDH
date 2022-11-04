module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    'react-app',
    'airbnb',
    'airbnb-typescript',
    'plugin:react/jsx-runtime',
    'prettier',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: true,
    },
    createDefaultProgram: true,
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        requored: {
          some: ['id'],
        },
      },
    ],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/prop-types': [0],
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'react/jsx-filename-extension': [2, { extensions: ['.jsx', '.tsx'] }],
    'no-underscore-dangle': 'off',
    'no-nested-ternary': 'off',
    'react-hooks/exhaustive-deps': 'off',
  },
};
