const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = {
    entry: ['./app/index.js'],
    output: {
      path: __dirname + '/build',
      filename: 'lazzzy.js'
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          },
          {
            test: /\.scss$/,
            use:  ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
          },
          {
            test   : /\.(png|jpg|jpeg|gif?)(\?[a-z0-9=&.]+)?$/,
            loader : 'url-loader',
            options: {
              limit: 100000
            }
          }
        ]
    },
    plugins: [ 
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
    ]
}
module.exports = config;