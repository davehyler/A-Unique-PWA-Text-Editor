const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => 
{
  return {
    mode: 'development',
    entry: 
    {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: 
    {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: // TODO: Add and configure workbox plugins for a service worker and manifest file.
    [
      new HtmlWebpackPlugin
      (
        {//See module packs for names of references.
        template: './index.html',
        title: 'Webpack Plug-In',
        }
      ),
      new InjectManifest
      (
        {
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
        }
      ),
      new WebpackPwaManifest
      (
        {
          fingerprints: false,
          inject: true,
          name: 'Module 19 Webpack Text Editor "JATE"',
          short_name: 'JATE',
          description: 'A simple text editor',
          background_color: '#ffffff', //hex color code will load black background
          icons: 
          [
            {
              src: path.resolve('src/images/logo.png'),
              size: [96, 128, 192, 256, 384, 512],
              destination: path.join('assets', 'icons'),
            },
          ]
        }
      ),
    ],
    module: 
    {
      rules: 
      [
        {// TODO: Add CSS loaders and babel to webpack.
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: 
          {
            loader: 'babel-loader',
            options: 
            {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};