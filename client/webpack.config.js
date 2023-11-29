const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest, GenerateSW } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// Add plugins to the webpack configuration. InjectManifest, HtmlWebpackPlugin, pwaManifest
// TODO: Add CSS loaders and babel to webpack.
// Add rules to the webpack configuration. css-loader, babel-loader, style-loader 
// make sure to add the plugins and rules to the correct configuration object. 



module.exports = () => {
  return {
    mode: 'development',
    entry: {
      index: './src/js/index.js',
      install: './src/js/install.js',
      editor: './src/js/editor.js'
    },
    devServer: {
      hot: 'only',
    },
    output: {
      // filename: "manifest.js",
      path: path.resolve(__dirname, "dist"),
    },
//10 properties: 1) Name, 2) short name, 3) start_url, 4) background color, 5)theme color, 6) icons, 7) description, 8) publicPath, 9) inject, 10) fingerprints,
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Webpack Plugin",
      }),
      new MiniCssExtractPlugin(),
      new GenerateSW(),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js',
      }),
      new WebpackPwaManifest({
    name: 'JATE text Editor',
    short_name: 'JATE',
    display: "standalone",
    start_url: './', 
    publicPath: './', 
    description: 'text editor',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    fingerprints: false,
    inject: true,
   
    icons: [
      {
        src: path.resolve('src/images/logo.png'),
        sizes: [96, 128, 192, 256, 384, 512],
        destination: path.join('src', 'icons'),
      },
    ]
  })
  ],

    // Added babel for converting javascript to work with any browser
    // Bundle images files
    // Bundle css file
    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
          type: "asset/resource",
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
  };
};
