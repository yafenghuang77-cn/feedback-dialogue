export default {
  '*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}': [
    'eslint --fix --max-warnings=0 --no-warn-ignored',
    'prettier --write',
  ],
  '*.{css,less}': ['stylelint --fix --max-warnings=0 --allow-empty-input', 'prettier --write'],
  '*.{md,markdown}': ['prettier --write', 'markdownlint-cli2 --fix'],
  '*.{json,jsonc,html,yml,yaml}': 'prettier --write',
};
