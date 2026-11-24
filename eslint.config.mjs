import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-config-prettier/flat';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const codeFiles = ['**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}'];
const tsFiles = ['**/*.{ts,tsx,mts,cts}'];
const unusedVars = {
  args: 'all',
  argsIgnorePattern: '^_',
  caughtErrors: 'all',
  caughtErrorsIgnorePattern: '^_',
  ignoreRestSiblings: true,
};

export default defineConfig([
  globalIgnores(['dist/', 'lib/', '.temp/', '.rn_temp/', '.swc/', 'deploy_versions/', '.husky/_/']),
  {
    files: codeFiles,
    extends: [js.configs.recommended],
    linterOptions: { reportUnusedDisableDirectives: 'error' },
    plugins: { 'simple-import-sort': simpleImportSort },
    rules: {
      'array-callback-return': 'error',
      'block-scoped-var': 'error',
      curly: ['error', 'all'],
      'default-case-last': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'guard-for-in': 'error',
      'no-alert': 'error',
      'no-caller': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-constructor-return': 'error',
      'no-duplicate-imports': ['error', { allowSeparateTypeImports: true }],
      'no-eval': 'error',
      'no-extend-native': 'error',
      'no-implied-eval': 'error',
      'no-lone-blocks': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-param-reassign': ['error', { props: false }],
      'no-promise-executor-return': 'error',
      'no-proto': 'error',
      'no-return-assign': ['error', 'always'],
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-template-curly-in-string': 'error',
      'no-throw-literal': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unsafe-optional-chaining': ['error', { disallowArithmeticOperators: true }],
      'no-unused-vars': ['warn', unusedVars],
      'no-useless-call': 'error',
      'no-useless-concat': 'error',
      'no-var': 'error',
      'object-shorthand': ['error', 'always'],
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',
      'prefer-object-spread': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      radix: 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'],
            ['^node:'],
            ['^react(?:/|\\u0000|$)', '^react-dom(?:/|\\u0000|$)'],
            ['^@?\\w'],
            ['^@/'],
            ['^\\.\\.(?:/|$)'],
            ['^\\./'],
            ['^\\u0000.*\\.(?:css|less)(?:[?#].*)?$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
  {
    files: codeFiles,
    ignores: ['babel.config.js'],
    rules: {
      'no-restricted-globals': [
        'error',
        { name: 'require', message: 'Use ESM import or import().' },
        { name: 'module', message: 'Use ESM export.' },
        { name: 'exports', message: 'Use ESM export.' },
        { name: '__dirname', message: 'Use import.meta.dirname in Node.js.' },
        { name: '__filename', message: 'Use import.meta.filename in Node.js.' },
      ],
    },
  },
  {
    files: tsFiles,
    extends: [tseslint.configs.recommended],
    rules: {
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      '@typescript-eslint/method-signature-style': ['error', 'property'],
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-unused-vars': ['warn', unusedVars],
      '@typescript-eslint/unified-signatures': 'error',
      'no-restricted-syntax': [
        'error',
        { selector: 'TSExportAssignment', message: 'Use ESM export instead of export =.' },
      ],
    },
  },
  {
    files: ['src/**/*.{ts,tsx,mts,cts}', 'config/**/*.{ts,mts,cts}'],
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    rules: {
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-base-to-string': 'error',
      '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: false }],
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-misused-spread': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      'no-throw-literal': 'off',
      '@typescript-eslint/only-throw-error': [
        'error',
        { allowThrowingAny: false, allowThrowingUnknown: false, allowRethrowing: true },
      ],
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
    },
  },
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    extends: [
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      reactHooks.configs.flat.recommended,
      jsxA11y.flatConfigs.recommended,
    ],
    settings: { react: { version: 'detect' } },
    rules: {
      'react/prop-types': 'off',
      'react/button-has-type': 'error',
      'react/iframe-missing-sandbox': 'error',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
      'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
      'react/jsx-key': [
        'error',
        { checkFragmentShorthand: true, checkKeyMustBeforeSpread: true, warnOnDuplicates: true },
      ],
      'react/jsx-no-useless-fragment': 'error',
      'react/jsx-pascal-case': 'error',
      'react/no-array-index-key': 'error',
      'react/no-unsafe': ['error', { checkAliases: true }],
      'react/no-unstable-nested-components': 'error',
      'react/self-closing-comp': 'error',
      'react-hooks/exhaustive-deps': 'error',
    },
  },
  {
    files: ['src/**/*.h5.{js,jsx,ts,tsx}'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['src/**/*.config.{js,ts}'],
    languageOptions: { globals: { defineAppConfig: 'readonly', definePageConfig: 'readonly' } },
  },
  {
    files: ['*.config.{js,mjs,cjs}', 'config/**/*.ts'],
    languageOptions: { globals: globals.nodeBuiltin },
    rules: { 'no-console': 'off' },
  },
  {
    files: ['babel.config.js'],
    languageOptions: { sourceType: 'commonjs' },
  },
  prettier,
]);
