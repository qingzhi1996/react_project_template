// webpack.base.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getCSSModuleLocalIdent = require('./getCSSModuleLocalIdent');
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const webpack = require('webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const smp = new SpeedMeasurePlugin();
const isDev = process.env.NODE_ENV === 'development';
const lessModuleRegex = /\.module\.(less)$/;

module.exports = smp.wrap({
  // 入口文件
  entry: path.resolve(__dirname, 'src/index.tsx'),
  // 打包文件出口
  output: {
    filename: 'js/[name].[chunkhash:8].js', // 每个输出js的名称
    path: path.resolve(__dirname, 'dist'), // 打包的出口文件夹路径
    clean: true, // webpack4需要配置clean-webpack-plugin删除dist文件，webpack5内置了。
    publicPath: isDev ? '/' : '/', // 打包后文件的公共前缀路径
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/, //匹配所有的 less 文件
        exclude: [lessModuleRegex],
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              lessOptions: {
                sourceMap: true,
                modifyVars: {
                  'primary-color': '#0474FF',
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: lessModuleRegex,
        exclude: /node_modules/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 3,
              sourceMap: true,
              modules: {
                getLocalIdent: getCSSModuleLocalIdent
              }
            }
          },
          'postcss-loader',
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                sourceMap: true,
                modifyVars: {
                  'primary-color': '#0474FF',
                },
                javascriptEnabled: true,
              },
            },
          }
        ]
      },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            }
          }
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset',
        exclude: /node_modules/,
        parser: {
          //转base64的条件
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10kb
          },
        },
        generator: {
          filename: 'images/[name].[contenthash:6][ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf|TTF)$/, // 匹配字体图标文件
        type: 'asset', // type选择asset
        exclude: /node_modules/,
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: 'fonts/[name].[contenthash:6][ext]', // 文件输出目录和命名
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: 'asset', // type选择asset
        exclude: /node_modules/,
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: 'media/[name].[contenthash:6][ext]', // 文件输出目录和命名
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    modules: [path.resolve(__dirname, 'node_modules')],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '挂载项目',
      template: path.resolve(__dirname, 'public/index.ejs'),
      favicon: path.resolve(__dirname, 'public/favicon.ico'),
      inject: true,
    }),
    new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`
    }),
    // new BundleAnalyzerPlugin()
  ],
  externals: {
    echarts: 'echarts',
    lodash: 'lodash'
  },
  // 开启webpack持久化存储缓存
  cache: {
    type: 'filesystem', // 使用文件缓存
  },
});
