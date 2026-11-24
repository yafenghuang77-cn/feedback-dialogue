/** @type {import('stylelint').Config} */
export default {
  ignoreFiles: ['dist/**', 'lib/**', '.temp/**', '.rn_temp/**', '.swc/**', 'deploy_versions/**'],
  rules: {
    'block-no-empty': true,
    'color-no-invalid-hex': true,
    'declaration-block-no-duplicate-custom-properties': true,
    'font-family-no-missing-generic-family-keyword': true,
    'function-linear-gradient-no-nonstandard-direction': true,
    'selector-max-id': 0,
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
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
  },
  overrides: [
    {
      files: ['**/*.css'],
      extends: ['stylelint-config-standard'],
    },
    {
      files: ['**/*.less'],
      extends: ['stylelint-config-standard-less'],
    },
  ],
};
