const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const createResolver = require('postcss-import-webpack-resolver')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const join = fragment => path.join(__dirname, '../', fragment)

module.exports = function(webpackEnv) {
  const isProduction = webpackEnv === 'production'
  const envConfig = require('./env.config')(webpackEnv)

  return {
    mode: webpackEnv,
    entry: {
      index: join('src/index.jsx'),
    },
    output: {
      path: isProduction ? join('web-dist') : join('dev-dist'),
      publicPath: isProduction ? envConfig.publicPath : '/',
      filename: isProduction ? 'static/js/[name].[chunkhash].js' : 'static/js/[name].js',
    },
    resolve: {
      modules: [join('node_modules')],
      extensions: ['.js', '.json', '.jsx'],
      alias: {
        '@': join('src'),
        'react-dom': '@hot-loader/react-dom',
      },
    },
    devtool: envConfig.devtool,
    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [join('build/webpack.config.js')],
      },
    },
    optimization: {
      emitOnErrors: true,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: join('public/index.html'),
        favicon: join('public/favicon.png'),
        filename: 'index.html',
      }),
      isProduction && new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
      }),
    ].filter(Boolean),
    module: {
      rules: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['react-hot-loader/babel'],
          },
        },
      }, {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                auto: /\.module\.css$/,
                localIdentName: '[local]--[hash:base64:5]',
                exportLocalsConvention: 'camelCase',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('postcss-import')({
                    resolve: createResolver({
                      alias: { '~@': join('src') },
                    }),
                  }),
                  require('postcss-mixins'),
                  require('precss'),
                  require('cssnano'),
                ],
              },
            },
          },
        ],
      }, {
        test: /\.(bmp|gif|jpe?g|png|svg)$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 30000,
            name: 'static/images/[name].[hash].[ext]',
          },
        },
      }, {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 30000,
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      }, {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 30000,
            name: 'static/fonts/[name].[hash].[ext]',
          },
        },
      }].filter(Boolean),
    },
    performance: {
      maxEntrypointSize: 3000000,
      maxAssetSize: 3000000,
    },
  }
}
