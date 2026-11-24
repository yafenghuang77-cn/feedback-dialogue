import { posix } from 'node:path';
import { fileURLToPath } from 'node:url';

import { readConfig } from '@tarojs/helper';
import type { AppConfig } from '@tarojs/taro';
import { defineConfig } from 'knip/config';

const appConfigPath = fileURLToPath(new URL('./src/app.config.ts', import.meta.url));
const entry = new Set([
  'config/index.ts',
  'src/app.ts',
  'src/app.config.ts',
  'src/app-html-styles.weapp.ts',
]);

for (const [platform, platformType] of Object.entries({ h5: 'web', weapp: 'mini' })) {
  const {
    pages = [],
    subPackages,
    subpackages,
  } = readConfig(appConfigPath, {
    defineConstants: {
      'process.env.TARO_ENV': JSON.stringify(platform),
      'process.env.TARO_PLATFORM': JSON.stringify(platformType),
    },
  }) as AppConfig;
  const routes = [
    ...pages,
    ...(subPackages ?? subpackages ?? []).flatMap(({ root, pages }) =>
      pages.map((page) => posix.join(root, page)),
    ),
  ];

  for (const route of routes) {
    const stem = posix.join('src', route);
    entry.add(`${stem}{,.${platform},.config,.${platform}.config}.{js,jsx,ts,tsx}`);
  }
}

export default defineConfig({
  entry: [...entry],
  ignoreDependencies: [
    // Babel 和 Taro 在编译时引入或按平台选择这些依赖。
    '@babel/runtime',
    '@pmmmwh/react-refresh-webpack-plugin',
    '@tarojs/plugin-framework-react',
    '@tarojs/plugin-generator',
    '@tarojs/plugin-html',
    '@tarojs/plugin-http',
    '@tarojs/plugin-platform-h5',
    '@tarojs/plugin-platform-weapp',
    '@tarojs/react',
    '@tarojs/runtime',
    '@tarojs/taro-loader',
    '@tarojs/webpack5-runner',
    'react-dom',
  ],
});
