import assert from 'node:assert/strict';
import { test } from 'node:test';

import { ESLint } from 'eslint';
import stylelint from 'stylelint';

const eslint = new ESLint();

test('检查源码并跳过 Taro 构建产物', async () => {
  const [source] = await eslint.lintText('export var count = 1;', {
    filePath: 'src/lint-probe.js',
  });

  assert.ok(source.messages.some(({ ruleId, severity }) => ruleId === 'no-var' && severity === 2));
  assert.equal(await eslint.isPathIgnored('dist/js/lint-probe.js'), true);
});

test('Taro 页面配置识别框架提供的全局函数', async () => {
  const [result] = await eslint.lintText(
    "export default definePageConfig({ navigationBarTitleText: '首页' });",
    {
      filePath: 'src/pages/lint-probe/index.config.js',
    },
  );

  assert.deepEqual(result.messages, []);
});

test('类型感知规则检查不安全的赋值和未处理的 Promise', async () => {
  const [result] = await eslint.lintText(
    "export const draft = JSON.parse('{}');\nPromise.resolve();",
    {
      filePath: 'src/pages/index/index.tsx',
    },
  );
  const rules = result.messages
    .filter(({ severity }) => severity === 2)
    .map(({ ruleId }) => ruleId);

  assert.ok(rules.includes('@typescript-eslint/no-unsafe-assignment'));
  assert.ok(rules.includes('@typescript-eslint/no-floating-promises'));
});

test('Less 接受 Taro 选择器和单位，并拦截非法样式', async () => {
  const codeFilename = 'src/lint-probe.less';
  const accepted = await stylelint.lint({
    code: '@spacing: 12rpx;\n\npage {\n  padding: @spacing;\n}\n',
    codeFilename,
  });
  const rejected = await stylelint.lint({
    code: '#card {\n  color: #12;\n  width: 12madeup;\n}\n',
    codeFilename,
  });

  assert.deepEqual(accepted.results[0].warnings, []);
  const rules = rejected.results[0].warnings.map(({ rule }) => rule);
  assert.ok(rules.includes('selector-max-id'));
  assert.ok(rules.includes('color-no-invalid-hex'));
  assert.ok(rules.includes('unit-no-unknown'));
});
