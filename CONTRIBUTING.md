# 前端开发规范

使用 `.nvmrc` 指定的 Node.js 版本和 `package.json` 中声明的 pnpm 版本。CI 使用 `pnpm install --frozen-lockfile`。

## 常用命令

| 命令               | 用途                                 |
| ------------------ | ------------------------------------ |
| `pnpm dev:h5`      | 启动 H5 开发服务                     |
| `pnpm dev:weapp`   | 监听微信小程序源码变更               |
| `pnpm check`       | 检查代码、样式、Markdown、格式和类型 |
| `pnpm test:lint`   | 用正反例验证项目的检查规则           |
| `pnpm format`      | 应用项目格式                         |
| `pnpm build:h5`    | 类型检查和 H5 生产构建               |
| `pnpm build:weapp` | 类型检查和微信小程序生产构建         |

## 代码和样式

- Prettier 负责格式，ESLint 检查代码和导入顺序。使用 `import type` 声明纯类型导入。
- TypeScript 开启严格检查。ESLint 的类型感知规则使用 TypeScript 6，`pnpm typecheck` 使用 TypeScript 7。未使用的声明和参数由 ESLint 检查。
- Promise 在调用处处理、等待或返回给调用方。来自外部的数据先收窄类型，再读取属性或调用方法。
- 项目模块使用 ESM。`babel.config.js` 使用 Taro 构建所需的 CommonJS 格式。
- 样式优先使用 Less 和类选择器。Stylelint 检查 ID 选择器、无效颜色和未知单位，允许 `page` 等小程序选择器与 `rpx`。
- Markdown 列表使用短横线，代码块注明语言，技术术语采用规范大小写。

## 提交

Husky 在提交前通过 lint-staged 检查暂存文件。提交信息使用 `type(scope): 描述`，scope 可省略，填写时使用小写。标题最多 100 个字符，支持中文描述。

```text
feat(h5): 新增反馈入口
```
