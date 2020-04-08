const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    // Global JS
    global: './src/global.js',
    // Page-specific JS
    index: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: '[name].[hash].js',
    // Use absolute paths for assets, I uncomment this when building
    publicPath: '/A-Frame-Character-Editor/',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [
              'img:src',
              'audio:src',
            ],
          }
        }
      },
      {
        test: /\.(jpe?g|png|mp3|wav|glb)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]?[hash:7]',
              context: 'src',
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  plugins: [
    // Clean docs/ on each build
    new CleanWebpackPlugin(['docs']),
    // Add HtmlWebpackPlugin entries to build individual HTML pages
    new HtmlWebpackPlugin({
      // Input path
      template: 'src/index.html',
      // Output (within docs/)
      filename: 'index.html',
      // Inject compiled JS into <head> (as per A-Frame docs)
      inject: 'head',
      // Specify which JS files, by key in `entry`, should be injected into the page
      chunks: ['global', 'index'],
    }),
  ],
  // Settings for webpack-dev-server
  devServer: {
    clientLogLevel: 'info',
    open: true,
  },
};
