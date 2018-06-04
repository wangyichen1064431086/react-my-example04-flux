const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './js/app.js'
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      include : [
        path.join(__dirname, 'js'),
        path.join(__dirname, 'js', 'components')
      ],
      loaders: ['babel-loader']
    },{
      test:/\.css$/,
      include: [
        path.join(__dirname, 'css')
      ],
      loader:'style-loader!css-loader'
    }]
  }
}