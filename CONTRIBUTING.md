# 前端开发规范

使用 `.nvmrc` 指定的 Node.js 版本和 `package.json` 中声明的 pnpm 版本。CI 使用 `pnpm install --frozen-lockfile`。

## 常用命令

| 命令               | 用途                                 |
| ------------------ | ------------------------------------ |
| `pnpm dev:h5`      | 启动 H5 开发服务                     |
| `pnpm dev:weapp`   | 监听微信小程序源码变更               |
| `pnpm check`       | 检查代码、样式、Markdown、格式和类型 |
| `pnpm test`        | 运行 Vitest 中的全部测试             |
| `pnpm test:lint`   | 用正反例验证项目的检查规则           |
| `pnpm test:watch`  | 监听文件变更并重新运行测试           |
| `pnpm lint:unused` | 独立检查未使用的文件、导出和依赖     |
| `pnpm format`      | 应用项目格式                         |
| `pnpm build:h5`    | 类型检查和 H5 生产构建               |
| `pnpm build:weapp` | 类型检查和微信小程序生产构建         |

## 代码和样式

- Prettier 负责格式，ESLint 检查代码和导入顺序。使用 `import type` 声明纯类型导入。
- TypeScript 以 ES2023 为检查目标，为应用与工具分别配置类型环境，并统一使用严格检查、显式类型导入和可擦除语法。ESLint 的类型感知规则使用 TypeScript 6，`pnpm typecheck` 使用 TypeScript 7 检查各子项目。未使用的声明和参数由 ESLint 检查。
- Promise 在调用处处理、等待或返回给调用方。来自外部的数据先收窄类型，再读取属性或调用方法。
- 项目模块使用 ESM。`babel.config.js` 使用 Taro 构建所需的 CommonJS 格式。
- 样式优先使用 Less 和类选择器。Stylelint 检查 ID 选择器、无效颜色和未知单位，允许 `page` 等小程序选择器与 `rpx`。单行声明块最多写一条声明。
- Markdown 列表使用短横线，代码块注明语言，技术术语采用规范大小写。

Knip 从应用路由配置读取 H5 和微信小程序的主包与分包入口。发现候选项时会返回非零状态。清理前先核对源码、平台入口和构建配置中的引用。

## 测试

规范回归用例位于 `tests/lint-config.test.mjs`。Node.js 单元测试放在 `tests/unit`，文件名使用 `.test` 或 `.spec` 后缀，显式从 `vitest` 导入测试 API。测试可通过 `@/` 引用 `src` 中的模块。

## 提交

Husky 在提交前通过 lint-staged 检查暂存文件。提交信息使用 `type(scope): 描述`，scope 可省略，填写时使用小写。标题最多 100 个字符，支持中文描述。

```text
feat(h5): 新增反馈入口
```
