const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
module.exports = (env = {}) => ({
  mode: 'development',
  cache: false,
  devtool: 'source-map',
  optimization: {
    minimize: false,
  },
  entry: path.resolve(__dirname, './src/main.js'), //need to mention entry path and by default we point to main.js and start from there APP
  output: {
    publicPath: 'auto', //default option
  },
  resolve: {
    extensions: ['.vue', '.jsx', '.js', '.json'], // Mention all the extensions used in the application
    // way of importing methodoglogy. Alias represents the browser of how to import VUE components from dist folder and convert to javascript (understandable language by browser)
   
    alias: {
      // this isn't technically needed, since the default `vue` entry for bundlers
      // is a simple `export * from '@vue/runtime-dom`. However having this
      // extra re-export somehow causes webpack to always invalidate the module
      // on the first HMR update and causes the page to reload.
      vue: '@vue/runtime-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/, // converting VUE files using Vue-loader as browser understands standard language and not VUE.
        use: 'vue-loader', //converts vue code to js code using loader plugin
      },
      {
        test: /\.png$/,
        use: {
          loader: 'url-loader',
          options: { limit: 8192 },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, //converting CSS code to browser understandable lang
            options: {},
          },
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(), // plugins to convert VUE code to JS code which browser understands
    new MiniCssExtractPlugin({
      filename: '[name].css', // plugins to convert CSS code  to browser understandable lang and mentioning .css as by default it converts to js
    }),
    new ModuleFederationPlugin({ //this can be used like consumer
      name: 'vue4App',
      filename: 'remoteEntry.js', 
      remotes: {
        vue2App: 'vue2App@http://localhost:3001/remoteEntry.js',
      },     
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname),
    },
    compress: true,
    port: 3003,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
});
