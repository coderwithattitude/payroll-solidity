const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const { NODE_ENV, DEPLOY_BUILD, STYLE_DEBUG, ENV_LOCALE } = process.env;
const __PRO__ = NODE_ENV === 'production';
const extractLess = new ExtractTextPlugin('style.[hash].css');
const rsuiteStylePath = path.resolve(__dirname, './node_modules/rsuite/styles');
const PROD_BASE_URL = 'https://renown-fruit.github.io/dai-payroll/'

const BASE_CONFIG = {
  entry: {
    polyfills: './src/polyfills.js',
    app: './src/index.js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          //'transform-loader?brfs', // Use browserify transforms as webpack-loader.
          'babel-loader?babelrc'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(less|css)$/,
        loader: extractLess.extract({
          use: ['css-loader', 'less-loader'],
          // use style-loader in development
          fallback: 'style-loader?{attrs:{prop: "value"}}'
        })
      },
      {
        test: /\.(jpg|png|svg)$/,
        //`publicPath`  only use to assign assets path in build
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)($|\?)/,
        include: [rsuiteStylePath, path.resolve(__dirname, 'src')],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1,
              size: 16,
              hash: 'sha512',
              digest: 'hex',
              name: 'resources/[hash].[ext]',
            }
          }
        ]
      }
    ]
  },
  plugins: [
    extractLess,
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn|en-gb/),
    new webpack.NamedModulesPlugin(),
    new HtmlwebpackPlugin({
      title: 'Daipay | Pay all your employees with DAI',
      chunks: ['polyfills', 'commons', 'app'],
      template: 'src/index.html',
    }),
    // new BundleAnalyzerPlugin({ openAnalyzer: false })
  ]

}

const PROD_CONFIG = {
  output: {
    filename: '[name].bundle.js?[hash]',
    path: path.resolve(__dirname, 'dist'),
    publicPath: DEPLOY_BUILD ? PROD_BASE_URL : './'
  },
  plugins: [
    new webpack.DefinePlugin({
      "HOT_PATCH_REQUIRED": false
    }),
    new UglifyJSPlugin({
      sourceMap: true
    })
  ]

}

const DEV_CONFIG = {
  output: {
    filename: '[name].bundle.js?[hash]',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    disableHostCheck: true,
    historyApiFallback: true,
    compress: true,
    host: '0.0.0.0',
    port: 3000
  },
  plugins: [
    new webpack.DefinePlugin({
      "HOT_PATCH_REQUIRED": true
    })
  ]
}

const config = __PRO__ ?
  webpackMerge(PROD_CONFIG, BASE_CONFIG) :
  webpackMerge(DEV_CONFIG, BASE_CONFIG);

module.exports = config;
