module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'airbnb-base', 'plugin:vue/vue3-recommended', 'plugin:vue/vue3-essential',],
  parser: 'vue-eslint-parser',
  globals: {
    Vue: 'readonly',
    axios: 'readonly',
    _: 'readonly',
  },
  plugins: ['vue'],
  rules: {
    'import/no-cycle': 'off',
    'object-curly-spacing': 'off',
    'arrow-parens': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'comma-dangle': ['warn', 'always-multiline'],
    'func-names': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
      },
    ],
    'import/prefer-default-export': 'off',
    'linebreak-style': 'off',
    'max-len': 'off',
    'no-cond-assign': ['error', 'always'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-empty': ['error', {allowEmptyCatch: true}],
    'no-mixed-operators': [
      'error',
      {
        groups: [
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof']
        ],
        allowSamePrecedence: true
      }
    ],
    'no-param-reassign': ['error', {props: false}],
    'no-plusplus': 'off',
    'no-shadow': 'off',
    'no-trailing-spaces': ['error', {skipBlankLines: true}],
    'no-underscore-dangle': 'off',
    'no-unused-expressions': 'off',
    'object-property-newline': ['error', {allowAllPropertiesOnSameLine: false}],
    'prefer-destructuring': 'off',
    radix: ['error', 'as-needed'],
    'space-in-parens': ['error', 'never'],
    indent: ['error', 2],
    'vue/html-closing-bracket-spacing': ['error'],
    'vue/html-indent': ['error', 2],
    'vue/require-default-prop': 'error',
    'vue/require-prop-types': 'error',
    'vue/script-indent': [
      'error',
      2,
      {
        baseIndent: 1,
        switchCase: 1,
        ignores: [],
      },
    ],
    'vue/no-v-html': 'off',
    'template-curly-spacing': 'off',
    'no-multiple-empty-lines': [
      1,
      {
        max: 4,
        maxEOF: 2,
      },
    ],
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off',
      },
    },
  ],
  settings: {
    'import/extensions': ['.js', '.jsx'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
      alias: {
        map: [['@', './src']],
      },
    },
  },
};
