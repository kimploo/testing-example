var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/shared/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js'
  },
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      { test: /\.(jsx)$/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
    alias: {
      '@Components': path.resolve(__dirname, 'client/components')
    }
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/shared/index.html'
    })
  ]
};
