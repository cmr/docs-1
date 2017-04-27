const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const webpack = require('webpack')
// langs used for highlighting
const languages = require('./static/scripts/langs')
const ReplaceHashWebpackPlugin = require('replace-hash-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, 'static/scripts/main.js'),
  output: {
    path: path.resolve(__dirname, 'static/dist'),
    filename: '[name]-[hash:8].js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      },
      { test: /\.(woff2?|ttf|eot|svg|png|gif|jpg|jpeg)$/, use: 'url-loader?limit=10000' },
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.ContextReplacementPlugin(
      /highlight\.js\/lib\/languages$/,
      new RegExp(`^./(${languages.join('|')})$`)
    ),
    new ExtractTextPlugin('[name]-[hash:8].css'),
    new ReplaceHashWebpackPlugin({
      cwd: 'contents',
      src: '**/*.html',
      dest: 'contents'
    }),
  ]
};
