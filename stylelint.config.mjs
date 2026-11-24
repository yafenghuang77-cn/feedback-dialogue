/** @type {import('stylelint').Config} */
export default {
  plugins: ['@stylistic/stylelint-plugin'],
  ignoreFiles: ['dist/**', 'lib/**', '.temp/**', '.rn_temp/**', '.swc/**', 'deploy_versions/**'],
  rules: {
    'block-no-empty': true,
    'color-no-invalid-hex': true,
    'declaration-block-no-duplicate-custom-properties': true,
    'declaration-block-no-duplicate-properties': [
      true,
      { ignore: ['consecutive-duplicates-with-different-values'] },
    ],
    'font-family-no-missing-generic-family-keyword': true,
    'function-linear-gradient-no-nonstandard-direction': true,
    'selector-max-id': 0,
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['global', 'local', 'export'] },
    ],
    'selector-type-no-unknown': [
      true,
      {
        ignore: ['custom-elements'],
        ignoreTypes: [
          'page',
          'swiper',
          'icon',
          'radio',
          'checkbox',
          'slider',
          'picker',
          'navigator',
          'lifestyle',
        ],
      },
    ],
    'string-no-newline': true,
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
  },
  overrides: [
    {
      files: ['**/*.css'],
      extends: ['stylelint-config-standard'],
      rules: { '@stylistic/declaration-block-single-line-max-declarations': 1 },
    },
    {
      files: ['**/*.less'],
      extends: ['stylelint-config-standard-less'],
      rules: { '@stylistic/less/declaration-block-single-line-max-declarations': 1 },
    },
  ],
};
