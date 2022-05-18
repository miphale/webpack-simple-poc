const path = require('path');
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  // mode: 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.ProvidePlugin({
      "$":"jquery",
      "jQuery":"jquery",
      "window.jQuery":"jquery"
    })
  ]
};