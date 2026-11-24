import { ESLint } from 'eslint';
import stylelint from 'stylelint';
import { expect, test } from 'vitest';

const eslint = new ESLint();

test('检查源码并跳过 Taro 构建产物', async () => {
  const [source] = await eslint.lintText('export var count = 1;', {
    filePath: 'src/lint-probe.js',
  });

  expect(source.messages).toContainEqual(
    expect.objectContaining({ ruleId: 'no-var', severity: 2 }),
  );
  expect(await eslint.isPathIgnored('dist/js/lint-probe.js')).toBe(true);
});

test('Taro 页面配置识别框架提供的全局函数', async () => {
  const [result] = await eslint.lintText(
    "export default definePageConfig({ navigationBarTitleText: '首页' });",
    {
      filePath: 'src/pages/lint-probe/index.config.js',
    },
  );

  expect(result.messages).toHaveLength(0);
});

test('类型感知规则检查不安全的赋值和未处理的 Promise', { timeout: 15_000 }, async () => {
  const [result] = await eslint.lintText(
    "export const draft = JSON.parse('{}');\nPromise.resolve();",
    {
      filePath: 'config/index.ts',
    },
  );
  const rules = result.messages
    .filter(({ severity }) => severity === 2)
    .map(({ ruleId }) => ruleId);

  expect(rules).toContain('@typescript-eslint/no-unsafe-assignment');
  expect(rules).toContain('@typescript-eslint/no-floating-promises');
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

  expect(accepted.results[0].warnings).toHaveLength(0);
  const rules = rejected.results[0].warnings.map(({ rule }) => rule);
  expect(rules).toContain('selector-max-id');
  expect(rules).toContain('color-no-invalid-hex');
  expect(rules).toContain('unit-no-unknown');
});

test.each(['css', 'less'])('%s 保留相邻的回退声明并拦截非法换行', async (extension) => {
  const codeFilename = `src/lint-probe.${extension}`;
  const accepted = await stylelint.lint({
    code: ':local(.card) {\n  color: #222;\n  color: #333;\n}\n',
    codeFilename,
  });
  const rejected = await stylelint.lint({
    code: '.card::before {\n  color: #222;\n  color: #222;\n  content: "first\nsecond";\n}\n',
    codeFilename,
  });

  expect(accepted.results[0].warnings).toHaveLength(0);
  const rules = rejected.results[0].warnings.map(({ rule }) => rule);
  expect(rules).toContain('declaration-block-no-duplicate-properties');
  expect(rules).toContain('string-no-newline');
});

test.each(['css', 'less'])('%s 单行声明块最多允许一条声明', async (extension) => {
  const codeFilename = `src/lint-probe.${extension}`;
  const rulePrefix = extension === 'less' ? '@stylistic/less' : '@stylistic';
  const ruleName = `${rulePrefix}/declaration-block-single-line-max-declarations`;
  const code = '.card { color: #222; display: block; }\n';
  const accepted = await stylelint.lint({
    code: '.card { color: #222; }\n',
    codeFilename,
  });
  const rejected = await stylelint.lint({ code, codeFilename });
  const fixed = await stylelint.lint({ code, codeFilename, fix: true });

  expect(accepted.results[0].warnings).toHaveLength(0);
  expect(rejected.results[0].warnings).toContainEqual(expect.objectContaining({ rule: ruleName }));
  expect(fixed.results[0].warnings).toHaveLength(0);
  expect(fixed.code).toMatch(/\{\r?\n/);
});
