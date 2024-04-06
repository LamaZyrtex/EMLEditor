
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      { 
        test: /\.less$/,
        use: [ 
            MiniCssExtractPlugin.loader,
            'css-loader', 
            'less-loader'
        ],
    },      
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9001,
  },
  plugins:[
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "./src/emoticons", to: "emoticons" },
        { from: "./src/languages", to: "languages" }
      ],
    }),] 
};
