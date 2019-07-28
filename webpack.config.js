const path = require('path')

module.exports = (_env, argv) => {
  const devString = 'development'
  const paramsMode = (argv.mode || devString)
  const isDevMode = (paramsMode === devString)
  const isPrdMode = !isDevMode

  const results = {
    mode: paramsMode,
    entry: './src/simple_image_browser.js',

    output: {
      path: path.resolve(__dirname, 'dist'),
      // publicPath: 'js',
      filename: 'simple_image_browser.js'
    },

    devtool: 'source-map',

    devServer: {
      openPage: 'simple_image_browser.html',
      contentBase: './dist',
      open: true,
      inline: true
    },

    module: {
      rules: [
        {
          // ローダーの処理対象ファイル
          test: /\.js$/,
          // ローダーの処理対象から外すディレクトリ
          exclude: /node_modules/,
          use: [
            {
              // 利用するローダー
              loader: 'babel-loader'
            }
          ]
        }
      ]
    }
  }

  if (isPrdMode) {
    const TerserPlugin = require('terser-webpack-plugin')

    results['optimization'] = {
      minimizer: [new TerserPlugin({
        parallel: true,
        cache: true,
        sourceMap: true,
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      })]
    }
  }

  return results
}
