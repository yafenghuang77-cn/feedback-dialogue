import type { UserConfigExport } from '@tarojs/cli';

const excludedPackages = new Set([
  '@babel',
  'core-js',
  'style-loader',
  'css-loader',
  'react',
  'react-dom',
]);

export default {
  mini: {},
  ...(process.env['TARO_ENV'] === 'h5' && {
    terser: {
      enable: true,
      config: {
        keep_fnames: false,
        compress: { passes: 2 },
        output: { quote_keys: false, keep_quoted_props: false },
      },
    },
  }),
  h5: {
    compile: {
      include: [
        (filename: string) => {
          // pnpm 的真实路径可能包含多层 node_modules，以最内层的包名为准。
          const segments = filename.split(/[\\/]/);
          const index = segments.lastIndexOf('node_modules');
          const packageName = segments[index + 1];
          return index >= 0 && !!packageName && !excludedPackages.has(packageName);
        },
      ],
    },
    /**
     * WebpackChain 插件配置
     * @docs https://github.com/neutrinojs/webpack-chain
     */
    // webpackChain (chain) {
    //   /**
    //    * 如果 h5 端编译后体积过大，可以使用 webpack-bundle-analyzer 插件对打包体积进行分析。
    //    * @docs https://github.com/webpack-contrib/webpack-bundle-analyzer
    //    */
    //   chain.plugin('analyzer')
    //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
    //   /**
    //    * 如果 h5 端首屏加载时间过长，可以使用 prerender-spa-plugin 插件预加载首页。
    //    * @docs https://github.com/chrisvfritz/prerender-spa-plugin
    //    */
    //   const path = require('path')
    //   const Prerender = require('prerender-spa-plugin')
    //   const staticDir = path.join(__dirname, '..', 'dist')
    //   chain
    //     .plugin('prerender')
    //     .use(new Prerender({
    //       staticDir,
    //       routes: [ '/pages/index/index' ],
    //       postProcess: (context) => ({ ...context, outputPath: path.join(staticDir, 'index.html') })
    //     }))
    // }
  },
} satisfies UserConfigExport<'webpack5'>;
