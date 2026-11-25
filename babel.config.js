// babel-preset-taro 更多选项和默认值：
// https://docs.taro.zone/docs/next/babel-config
module.exports = {
  overrides: [
    {
      test: /[\\/]@stencil[\\/]core[\\/]internal[\\/]client[\\/]index\.js$/,
      // 保留可静态分析的字符串拼接，让 Webpack 识别 Stencil 的动态导入目录。
      assumptions: { ignoreToPrimitiveHint: true },
    },
  ],
  presets: [
    [
      'taro',
      {
        framework: 'react',
        ts: true,
        compiler: 'webpack5',
        useBuiltIns: process.env.TARO_ENV === 'h5' ? 'usage' : false,
      },
    ],
  ],
};
