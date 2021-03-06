// webpack v4
const path = require('path');
const webpack = require ('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap({
  // devtool: (mode === 'development') ? 'inline-source-map' : false,
  mode: 'development',
  entry: { main: './src/app.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/dist/'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    // hot: true,
    compress: false,
    port: 9000
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
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: [
            'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
            'file-loader'
        ]
      },
        {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      } 
    ]
  },
  resolve: {
    alias: {
        'node_modules': path.join(__dirname, 'node_modules')
    }
},
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      THREE: 'three',
      OBJLoader: './src/assets/OBJLoader.js'
    }),
    new MiniCssExtractPlugin({
      template: "/dist/style.css",
      filename: 'style.css'
    }),
    new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "index.html",
        css: './style.css',
        title: 'THREE.playground by sidiousvic',
        // favicon: './src/assets/favicon.ico'
      }),
    new CopyWebpackPlugin([
      // {
      //   from: './src/assets/favicon.ico',
      //   to: '',
      //   toType: 'file'
      // },
      {
        from: './src/assets/guitar.obj',
        to: '',
        toType: 'file'
      },
      // {
      //   from: './src/assets/OBJLoader.js',
      //   to: '',
      //   toType: 'file'
      // }
    ])
    // new webpack.HotModuleReplacementPlugin()
  ]
});