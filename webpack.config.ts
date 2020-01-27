import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import { Configuration } from 'webpack';
import nodeExternals from 'webpack-node-externals';

const config: Configuration = {
  devtool: 'inline-source-map',
  entry: {
    app: [
      path.resolve(__dirname, 'src/app/index.tsx'),
      // component library styles - link in ssr string
      path.resolve(__dirname, 'node_modules/react-grid-layout/css/styles.css'),
      path.resolve(__dirname, 'node_modules/react-resizable/css/styles.css')
    ],
    server: path.resolve(__dirname, 'src/server/index.tsx')
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        loader: [
          MiniCssExtractPlugin.loader, // instead of style-loader
          'css-loader'
        ],
        test: /\.css$/
      },
      {
        exclude: /node_modules/,
        loader: 'ts-loader',
        test: /\.tsx?$/
      }
    ]
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  output: {
    // chunkFilename: '[id].[hash:8].js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
    // sourceMapFilename: '[name].[hash:8].map',
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      // chunkFilename: '[id].css',
      filename: '[name].bundle.css'
    })
  ],
  resolve: {
    alias: {
      '@store': path.resolve(__dirname, 'src/store')
    },
    extensions: ['.js', '.ts', '.tsx']
  },
  target: 'node'
};

export default config;
