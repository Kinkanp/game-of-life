const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';
  const isDev = !isProd;

  const config = {
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, 'dist')
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000,
    },
    module: {
      rules: [
        // {
        //   test: /\.html$/i,
        //   loader: 'html-loader',
        // },
        { test: /\.ts?$/, use: 'ts-loader', exclude: /node_modules/ },
        { test: /\.css$/i, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
        { test: /\.(png|jpg|jpeg|gif)$/i, type: 'asset/resource', },
        { test: /\.svg/, type: 'asset/inline' },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js', '.css'],
      plugins: [
        new TsconfigPathsPlugin()
      ]
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'body'
      })
    ],
  }

  if (isDev) {
    config.devtool = 'inline-source-map';
    config.mode = 'development';
  }

  return config;
};
