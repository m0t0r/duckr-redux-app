var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './app/index.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test:/\.js$/, exclude: /node_modules/, loader: 'babel'},
      {test:/\.css$/, exclude: /node_modules/, loaders: ['style', 'css']}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/app/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ]
};